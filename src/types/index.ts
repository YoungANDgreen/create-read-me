export type {
  EngagementSignals,
  PostAnalysis,
  ContentFeatures
} from '../lib/algorithm';

export type {
  PostTemplate,
} from '../lib/templates';

export type {
  GeneratorConfig,
  GeneratedPost
} from '../lib/generator';

export interface UserProfile {
  followers: number;
  verifiedFollowers: number;
  impressions30Days: number;
  engagementRate: number;
  niche: string;
  isMonetized: boolean;
  monetizationTier: 'none' | 'tips' | 'subscriptions' | 'ads';
}

export interface MonetizationProgress {
  followerProgress: number;
  impressionProgress: number;
  nextMilestone: string;
  estimatedEarnings: string;
  requirements: {
    name: string;
    current: number;
    required: number;
    met: boolean;
  }[];
}

export interface PostHistory {
  id: string;
  content: string;
  createdAt: Date;
  viralScore: number;
  posted: boolean;
  metrics?: {
    likes: number;
    replies: number;
    reposts: number;
    views: number;
  };
}
