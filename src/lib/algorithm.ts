/**
 * X Algorithm Scoring Engine
 * Based on xai-org/x-algorithm Phoenix transformer model
 *
 * The algorithm predicts probabilities across 15 engagement types
 * and combines them through weighted summation:
 * Final Score = Σ (weight_i × P(action_i))
 */

export interface EngagementSignals {
  // Positive actions
  favorite: number;      // P(favorite) - likelihood of likes
  reply: number;         // P(reply) - likelihood of replies
  repost: number;        // P(repost) - likelihood of reposts
  quote: number;         // P(quote) - likelihood of quote tweets
  click: number;         // P(click) - likelihood of clicking through
  profileClick: number;  // P(profile_click) - likelihood of profile visits
  videoView: number;     // P(video_view) - for video content
  photoExpand: number;   // P(photo_expand) - for image content
  share: number;         // P(share) - likelihood of sharing externally
  dwell: number;         // P(dwell) - time spent reading
  followAuthor: number;  // P(follow_author) - likelihood of gaining follower

  // Negative actions (penalize)
  notInterested: number; // P(not_interested)
  blockAuthor: number;   // P(block_author)
  muteAuthor: number;    // P(mute_author)
  report: number;        // P(report)
}

// Estimated weights based on algorithm analysis
// Positive weights for engagement, negative for suppression
const SIGNAL_WEIGHTS: Record<keyof EngagementSignals, number> = {
  favorite: 1.0,
  reply: 2.5,          // Replies are heavily weighted - conversations matter
  repost: 3.0,         // Reposts extend reach significantly
  quote: 2.8,          // Quotes generate secondary engagement
  click: 0.8,
  profileClick: 1.5,   // Profile clicks indicate author interest
  videoView: 1.2,
  photoExpand: 0.6,
  share: 2.0,          // External shares indicate high value
  dwell: 1.8,          // Time spent = quality signal
  followAuthor: 4.0,   // Follows are the ultimate engagement
  notInterested: -3.0,
  blockAuthor: -8.0,
  muteAuthor: -5.0,
  report: -10.0,
};

export interface PostAnalysis {
  text: string;
  signals: Partial<EngagementSignals>;
  viralScore: number;
  tier: 'low' | 'medium' | 'high' | 'viral';
  suggestions: string[];
  monetizationImpact: {
    followerGrowthPotential: number;
    engagementBoost: number;
    verifiedReachMultiplier: number;
  };
}

export interface ContentFeatures {
  hasQuestion: boolean;
  hasHook: boolean;
  hasCallToAction: boolean;
  hasList: boolean;
  hasControversy: boolean;
  hasStory: boolean;
  hasValue: boolean;
  hasEmoji: boolean;
  hasMedia: boolean;
  charCount: number;
  wordCount: number;
  readingTime: number;
  sentenceCount: number;
}

/**
 * Analyze content features that impact algorithm scoring
 */
export function analyzeContentFeatures(text: string): ContentFeatures {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);

  return {
    hasQuestion: /\?/.test(text),
    hasHook: /^(Here's|This is|The truth|I |Thread|Breaking|Unpopular opinion|Hot take|Controversial)/i.test(text),
    hasCallToAction: /(follow|repost|like|share|comment|reply|bookmark|check out|click|subscribe)/i.test(text),
    hasList: /(\d+\.|•|-|\*)\s/.test(text) || /\n/.test(text),
    hasControversy: /(unpopular|controversial|hot take|most people|nobody talks|secret|truth is)/i.test(text),
    hasStory: /(I was|I had|I used to|years ago|last week|yesterday|story|happened)/i.test(text),
    hasValue: /(how to|tips|guide|learn|hack|secret|mistake|lesson|strategy|framework)/i.test(text),
    hasEmoji: /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u.test(text),
    hasMedia: false, // Would need separate indicator
    charCount: text.length,
    wordCount: words.length,
    readingTime: Math.ceil(words.length / 200), // minutes
    sentenceCount: sentences.length,
  };
}

/**
 * Predict engagement signals based on content features
 */
export function predictEngagementSignals(
  text: string,
  niche: string,
  features: ContentFeatures
): Partial<EngagementSignals> {
  const signals: Partial<EngagementSignals> = {};

  // Base probabilities (0-1 scale)
  let baseFavorite = 0.15;
  let baseReply = 0.05;
  let baseRepost = 0.03;
  let baseQuote = 0.02;
  let baseDwell = 0.3;
  let baseFollow = 0.01;
  let baseProfileClick = 0.08;

  // Content feature multipliers
  if (features.hasQuestion) {
    baseReply *= 2.5;  // Questions drive replies
    baseDwell *= 1.3;
  }

  if (features.hasHook) {
    baseDwell *= 1.5;  // Hooks increase reading time
    baseFavorite *= 1.3;
  }

  if (features.hasCallToAction) {
    baseRepost *= 1.8;
    baseFollow *= 1.5;
  }

  if (features.hasList) {
    baseRepost *= 1.6;  // Lists are highly shareable
    baseDwell *= 1.4;
    baseFavorite *= 1.4;
  }

  if (features.hasControversy) {
    baseReply *= 3.0;   // Controversy drives engagement
    baseQuote *= 2.5;
    baseDwell *= 1.5;
  }

  if (features.hasStory) {
    baseDwell *= 2.0;   // Stories keep attention
    baseFavorite *= 1.5;
    baseFollow *= 1.8;  // Stories build connection
  }

  if (features.hasValue) {
    baseRepost *= 2.5;  // Value content gets shared
    baseFollow *= 2.0;
    baseFavorite *= 1.6;
  }

  // Optimal length scoring (280 char sweet spot for engagement)
  const lengthScore = features.charCount <= 280
    ? Math.min(features.charCount / 200, 1)
    : Math.max(0.5, 1 - (features.charCount - 280) / 1000);

  baseFavorite *= lengthScore;
  baseRepost *= lengthScore;

  // Niche-specific adjustments
  const nicheMultipliers = getNicheMultipliers(niche);

  signals.favorite = Math.min(baseFavorite * nicheMultipliers.engagement, 1);
  signals.reply = Math.min(baseReply * nicheMultipliers.conversation, 1);
  signals.repost = Math.min(baseRepost * nicheMultipliers.shareability, 1);
  signals.quote = Math.min(baseQuote * nicheMultipliers.conversation, 1);
  signals.dwell = Math.min(baseDwell, 1);
  signals.followAuthor = Math.min(baseFollow * nicheMultipliers.followPotential, 1);
  signals.profileClick = Math.min(baseProfileClick * nicheMultipliers.followPotential, 1);
  signals.click = 0.1;
  signals.share = signals.repost * 0.3;

  // Negative signals (keep low for good content)
  signals.notInterested = features.hasValue ? 0.02 : 0.05;
  signals.blockAuthor = 0.001;
  signals.muteAuthor = 0.002;
  signals.report = 0.0005;

  return signals;
}

interface NicheMultipliers {
  engagement: number;
  conversation: number;
  shareability: number;
  followPotential: number;
}

function getNicheMultipliers(niche: string): NicheMultipliers {
  const nicheMap: Record<string, NicheMultipliers> = {
    'tech': { engagement: 1.2, conversation: 1.3, shareability: 1.4, followPotential: 1.3 },
    'ai': { engagement: 1.4, conversation: 1.5, shareability: 1.6, followPotential: 1.5 },
    'crypto': { engagement: 1.3, conversation: 1.6, shareability: 1.3, followPotential: 1.2 },
    'finance': { engagement: 1.2, conversation: 1.2, shareability: 1.3, followPotential: 1.4 },
    'startup': { engagement: 1.3, conversation: 1.4, shareability: 1.5, followPotential: 1.4 },
    'productivity': { engagement: 1.4, conversation: 1.1, shareability: 1.7, followPotential: 1.5 },
    'self-improvement': { engagement: 1.5, conversation: 1.2, shareability: 1.8, followPotential: 1.6 },
    'marketing': { engagement: 1.3, conversation: 1.3, shareability: 1.5, followPotential: 1.4 },
    'fitness': { engagement: 1.4, conversation: 1.1, shareability: 1.4, followPotential: 1.3 },
    'politics': { engagement: 1.6, conversation: 2.0, shareability: 1.2, followPotential: 1.1 },
    'entertainment': { engagement: 1.5, conversation: 1.3, shareability: 1.4, followPotential: 1.2 },
    'sports': { engagement: 1.4, conversation: 1.5, shareability: 1.3, followPotential: 1.2 },
    'general': { engagement: 1.0, conversation: 1.0, shareability: 1.0, followPotential: 1.0 },
  };

  return nicheMap[niche.toLowerCase()] || nicheMap['general'];
}

/**
 * Calculate viral score from engagement signals
 */
export function calculateViralScore(signals: Partial<EngagementSignals>): number {
  let score = 0;

  for (const [key, weight] of Object.entries(SIGNAL_WEIGHTS)) {
    const signalValue = signals[key as keyof EngagementSignals] || 0;
    score += weight * signalValue;
  }

  // Normalize to 0-100 scale
  // Max theoretical score is around 20, normalize accordingly
  const normalizedScore = Math.min(Math.max((score / 15) * 100, 0), 100);

  return Math.round(normalizedScore * 10) / 10;
}

/**
 * Determine viral tier based on score
 */
export function getViralTier(score: number): 'low' | 'medium' | 'high' | 'viral' {
  if (score >= 75) return 'viral';
  if (score >= 55) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

/**
 * Generate optimization suggestions
 */
export function generateSuggestions(
  features: ContentFeatures,
  signals: Partial<EngagementSignals>
): string[] {
  const suggestions: string[] = [];

  if (!features.hasHook) {
    suggestions.push('Add a strong hook in the first line to capture attention');
  }

  if (!features.hasQuestion && (signals.reply || 0) < 0.1) {
    suggestions.push('Include a question to drive replies - replies boost algorithmic ranking');
  }

  if (!features.hasValue) {
    suggestions.push('Add actionable value (tips, insights, lessons) to increase shares');
  }

  if (!features.hasCallToAction) {
    suggestions.push('Add a subtle call-to-action (e.g., "Follow for more" or "Repost if useful")');
  }

  if (features.charCount < 100) {
    suggestions.push('Expand your post - slightly longer posts (150-280 chars) perform better');
  }

  if (features.charCount > 500 && !features.hasList) {
    suggestions.push('Break up long text with line breaks or bullet points for better dwell time');
  }

  if (!features.hasStory && (signals.followAuthor || 0) < 0.02) {
    suggestions.push('Add a personal story element to build connection and drive follows');
  }

  if ((signals.repost || 0) < 0.05) {
    suggestions.push('Make the post more shareable - lists, frameworks, and contrarian takes get reposted');
  }

  return suggestions.slice(0, 4); // Limit to 4 most relevant
}

/**
 * Calculate monetization impact metrics
 */
export function calculateMonetizationImpact(
  signals: Partial<EngagementSignals>,
  currentFollowers: number = 1000
): PostAnalysis['monetizationImpact'] {
  const followProbability = signals.followAuthor || 0.01;
  const engagementRate = (
    (signals.favorite || 0) +
    (signals.reply || 0) * 2 +
    (signals.repost || 0) * 3
  ) / 6;

  // Estimate impressions based on viral potential
  const baseImpressions = currentFollowers * 2;
  const viralMultiplier = 1 + ((signals.repost || 0) * 10);
  const estimatedImpressions = baseImpressions * viralMultiplier;

  return {
    followerGrowthPotential: Math.round(estimatedImpressions * followProbability),
    engagementBoost: Math.round(engagementRate * 100),
    verifiedReachMultiplier: 1 + (signals.repost || 0) * 5,
  };
}

/**
 * Full post analysis
 */
export function analyzePost(text: string, niche: string): PostAnalysis {
  const features = analyzeContentFeatures(text);
  const signals = predictEngagementSignals(text, niche, features);
  const viralScore = calculateViralScore(signals);
  const tier = getViralTier(viralScore);
  const suggestions = generateSuggestions(features, signals);
  const monetizationImpact = calculateMonetizationImpact(signals);

  return {
    text,
    signals,
    viralScore,
    tier,
    suggestions,
    monetizationImpact,
  };
}

/**
 * Optimal posting times based on engagement patterns
 */
export const OPTIMAL_POSTING_TIMES = [
  { day: 'Monday', times: ['8:00 AM', '12:00 PM', '5:00 PM'], quality: 'good' },
  { day: 'Tuesday', times: ['9:00 AM', '1:00 PM', '6:00 PM'], quality: 'excellent' },
  { day: 'Wednesday', times: ['9:00 AM', '12:00 PM', '5:00 PM'], quality: 'excellent' },
  { day: 'Thursday', times: ['8:00 AM', '1:00 PM', '5:00 PM'], quality: 'good' },
  { day: 'Friday', times: ['9:00 AM', '12:00 PM'], quality: 'moderate' },
  { day: 'Saturday', times: ['10:00 AM', '2:00 PM'], quality: 'moderate' },
  { day: 'Sunday', times: ['11:00 AM', '4:00 PM', '7:00 PM'], quality: 'good' },
];

/**
 * X Monetization Requirements
 */
export const MONETIZATION_REQUIREMENTS = {
  adsRevenueShare: {
    name: 'Ads Revenue Share',
    requirements: {
      followers: 500,
      verifiedFollowers: true,
      premiumSubscription: true,
      impressions3Months: 5_000_000,
    },
    potentialEarnings: '$500-$5,000/month',
  },
  subscriptions: {
    name: 'Subscriptions',
    requirements: {
      followers: 500,
      premiumSubscription: true,
      activePosting: true,
    },
    potentialEarnings: 'Variable based on subscriber count',
  },
  tips: {
    name: 'Tips',
    requirements: {
      followers: 0,
      premiumSubscription: false,
      stripeConnected: true,
    },
    potentialEarnings: 'Variable',
  },
};
