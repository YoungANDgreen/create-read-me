/**
 * Post Generator
 * Combines templates, hooks, and AI to generate viral posts
 */

import { PostTemplate, VIRAL_TEMPLATES, HOOKS, CALL_TO_ACTIONS, getTemplatesForNiche } from './templates';
import { analyzePost, PostAnalysis } from './algorithm';

export interface GeneratorConfig {
  niche: string;
  topic: string;
  style: 'educational' | 'story' | 'controversial' | 'value' | 'mixed';
  includeHook: boolean;
  includeCTA: boolean;
  maxLength: number;
  tone: 'professional' | 'casual' | 'bold' | 'inspirational';
}

export interface GeneratedPost {
  content: string;
  template: PostTemplate | null;
  analysis: PostAnalysis;
  variations: string[];
}

/**
 * System prompts for different generation styles
 */
const STYLE_PROMPTS: Record<GeneratorConfig['style'], string> = {
  educational: `Create an educational post that teaches something valuable. Focus on actionable insights, clear explanations, and practical takeaways. Make it easy to understand and implement.`,
  story: `Create a story-driven post with a personal or narrative element. Include a hook, build tension or curiosity, and end with a clear lesson or insight. Make it relatable and emotionally engaging.`,
  controversial: `Create a thought-provoking post that challenges conventional wisdom. Take a clear stance, support it with reasoning, and invite discussion. Be bold but substantive.`,
  value: `Create a high-value post packed with actionable information. Use lists, frameworks, or step-by-step breakdowns. Make it saveable and shareable.`,
  mixed: `Create an engaging post that balances value with personality. Include a hook, deliver insights, and encourage engagement. Make it both useful and interesting.`,
};

const TONE_MODIFIERS: Record<GeneratorConfig['tone'], string> = {
  professional: 'Use a professional, authoritative tone. Be clear and credible.',
  casual: 'Use a conversational, friendly tone. Be approachable and relatable.',
  bold: 'Use a confident, assertive tone. Be direct and unapologetic.',
  inspirational: 'Use an uplifting, motivational tone. Be encouraging and positive.',
};

/**
 * Build the prompt for AI generation
 */
export function buildGenerationPrompt(config: GeneratorConfig, template?: PostTemplate): string {
  const stylePrompt = STYLE_PROMPTS[config.style];
  const toneModifier = TONE_MODIFIERS[config.tone];

  let prompt = `You are an expert X (Twitter) content creator focused on growing followers and engagement.

TASK: Generate a viral X post about "${config.topic}" in the "${config.niche}" niche.

STYLE: ${stylePrompt}

TONE: ${toneModifier}

CONSTRAINTS:
- Maximum ${config.maxLength} characters
- Write for X/Twitter format
- Focus on engagement (replies, reposts, follows)
- Make it feel authentic, not like AI wrote it
- ${config.includeHook ? 'Start with a strong hook that stops the scroll' : ''}
- ${config.includeCTA ? 'End with a call-to-action that drives engagement' : ''}

X ALGORITHM OPTIMIZATION:
The X algorithm prioritizes:
1. Reply rate (ask questions, be controversial, invite discussion)
2. Repost rate (be valuable, shareable, save-worthy)
3. Dwell time (make them read the whole thing)
4. Follow rate (show expertise, personality, value)

VIRAL FACTORS TO INCLUDE:
- Strong opening hook (first line is critical)
- Clear value proposition
- Emotional resonance (curiosity, inspiration, controversy)
- Conversation starter (question or debate point)
`;

  if (template) {
    prompt += `
TEMPLATE TO FOLLOW:
Name: ${template.name}
Structure:
${template.structure}

Example for reference:
${template.example}

Adapt this template to the topic while maintaining the viral structure.
`;
  }

  prompt += `
OUTPUT: Write only the post content. No explanations or meta-commentary. Just the post itself.
`;

  return prompt;
}

/**
 * Generate post using template (non-AI)
 */
export function generateFromTemplate(
  config: GeneratorConfig,
  template: PostTemplate
): string {
  const { topic, niche } = config;

  // Replace placeholders in template structure
  let content = template.structure
    .replace(/\[topic\]/gi, topic)
    .replace(/\[niche\]/gi, niche);

  // Add hook if requested
  if (config.includeHook) {
    const hookType = config.style === 'controversial' ? 'controversy' :
                     config.style === 'story' ? 'story' :
                     config.style === 'value' ? 'value' : 'curiosity';
    const hook = HOOKS[hookType][Math.floor(Math.random() * HOOKS[hookType].length)];
    content = hook.replace('[topic]', topic) + '\n\n' + content;
  }

  // Add CTA if requested
  if (config.includeCTA) {
    const ctaType = Math.random() > 0.5 ? 'engagement' : 'share';
    const cta = CALL_TO_ACTIONS[ctaType][Math.floor(Math.random() * CALL_TO_ACTIONS[ctaType].length)];
    content = content + '\n\n' + cta.replace('[topic]', topic);
  }

  return content;
}

/**
 * Generate variations of a post
 */
export function generateVariations(baseContent: string, count: number = 3): string[] {
  const variations: string[] = [];

  // Variation 1: Different hook
  const hooks = [...HOOKS.curiosity, ...HOOKS.controversy];
  const randomHook = hooks[Math.floor(Math.random() * hooks.length)];
  const lines = baseContent.split('\n').filter(l => l.trim());
  if (lines.length > 1) {
    variations.push([randomHook, ...lines.slice(1)].join('\n\n'));
  }

  // Variation 2: Different CTA
  const ctas = [...CALL_TO_ACTIONS.engagement, ...CALL_TO_ACTIONS.share, ...CALL_TO_ACTIONS.follow];
  const randomCTA = ctas[Math.floor(Math.random() * ctas.length)];
  if (lines.length > 1) {
    variations.push([...lines.slice(0, -1), randomCTA].join('\n\n'));
  }

  // Variation 3: Condensed version
  const condensed = lines.slice(0, Math.ceil(lines.length * 0.6)).join('\n\n');
  if (condensed.length > 50) {
    variations.push(condensed);
  }

  return variations.slice(0, count);
}

/**
 * Main generation function (template-based, for when no AI API is available)
 */
export function generatePost(config: GeneratorConfig): GeneratedPost {
  // Get templates for niche
  const templates = getTemplatesForNiche(config.niche);

  // Filter by style
  const styleTemplates = templates.filter(t => {
    if (config.style === 'controversial') return t.viralFactors.includes('controversy');
    if (config.style === 'story') return t.viralFactors.includes('story');
    if (config.style === 'value') return t.viralFactors.includes('value');
    if (config.style === 'educational') return t.viralFactors.includes('value') || t.viralFactors.includes('save-worthy');
    return true;
  });

  // Select template
  const template = styleTemplates.length > 0
    ? styleTemplates[Math.floor(Math.random() * styleTemplates.length)]
    : templates[Math.floor(Math.random() * templates.length)];

  // Generate content
  const content = generateFromTemplate(config, template);

  // Analyze with algorithm
  const analysis = analyzePost(content, config.niche);

  // Generate variations
  const variations = generateVariations(content);

  return {
    content,
    template,
    analysis,
    variations,
  };
}

/**
 * Quick generation presets
 */
export const QUICK_PRESETS: Record<string, Partial<GeneratorConfig>> = {
  'viral-thread-hook': {
    style: 'mixed',
    includeHook: true,
    includeCTA: true,
    maxLength: 280,
    tone: 'bold',
  },
  'value-bomb': {
    style: 'value',
    includeHook: true,
    includeCTA: true,
    maxLength: 500,
    tone: 'professional',
  },
  'hot-take': {
    style: 'controversial',
    includeHook: true,
    includeCTA: true,
    maxLength: 280,
    tone: 'bold',
  },
  'story-post': {
    style: 'story',
    includeHook: true,
    includeCTA: true,
    maxLength: 500,
    tone: 'casual',
  },
  'engagement-bait': {
    style: 'mixed',
    includeHook: true,
    includeCTA: true,
    maxLength: 200,
    tone: 'casual',
  },
};

/**
 * Get best posting time for current moment
 */
export function getBestPostingTime(): { isGoodTime: boolean; nextBestTime: string; reason: string } {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  // Weekday peak hours: 8-9 AM, 12-1 PM, 5-6 PM
  const isPeakHour = (hour >= 8 && hour <= 9) ||
                     (hour >= 12 && hour <= 13) ||
                     (hour >= 17 && hour <= 18);

  // Weekend slightly different: 10-11 AM, 2-4 PM
  const isWeekend = day === 0 || day === 6;
  const isWeekendPeak = isWeekend && ((hour >= 10 && hour <= 11) || (hour >= 14 && hour <= 16));

  const isGoodTime = isWeekend ? isWeekendPeak : isPeakHour;

  let nextBestTime = '';
  if (!isGoodTime) {
    if (hour < 8) nextBestTime = '8:00 AM';
    else if (hour < 12) nextBestTime = '12:00 PM';
    else if (hour < 17) nextBestTime = '5:00 PM';
    else nextBestTime = 'Tomorrow 8:00 AM';
  }

  return {
    isGoodTime,
    nextBestTime,
    reason: isGoodTime
      ? 'Peak engagement hour - post now!'
      : `Wait for ${nextBestTime} for better reach`,
  };
}
