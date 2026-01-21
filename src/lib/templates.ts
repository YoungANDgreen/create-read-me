/**
 * Viral Post Templates
 * High-performing post structures based on X algorithm optimization
 */

export interface PostTemplate {
  id: string;
  name: string;
  description: string;
  structure: string;
  example: string;
  viralFactors: string[];
  bestFor: string[];
}

export const VIRAL_TEMPLATES: PostTemplate[] = [
  {
    id: 'contrarian-insight',
    name: 'Contrarian Insight',
    description: 'Challenge conventional wisdom with a fresh perspective',
    structure: `Unpopular opinion: [contrarian take]

Here's why:

[3 supporting points]

[Call to action or question]`,
    example: `Unpopular opinion: Working 80-hour weeks doesn't make you successful.

Here's why:

1. Burnout kills creativity
2. Rest is where breakthrough ideas happen
3. The most successful people I know protect their energy

What's the hardest lesson you've learned about work-life balance?`,
    viralFactors: ['controversy', 'reply-bait', 'relatability'],
    bestFor: ['self-improvement', 'startup', 'productivity', 'career'],
  },
  {
    id: 'story-lesson',
    name: 'Story + Lesson',
    description: 'Personal story that leads to a valuable insight',
    structure: `[Time marker] I [situation].

[What happened]

[The turning point]

The lesson: [Key takeaway]

[Follow CTA]`,
    example: `3 years ago I was broke, burned out, and ready to quit.

My startup had failed. My savings were gone. I felt like a fraud.

Then I got a DM that changed everything.

The lesson: Your lowest point is often the setup for your greatest comeback.

Follow for more founder stories.`,
    viralFactors: ['emotional-hook', 'story', 'follow-bait', 'relatability'],
    bestFor: ['startup', 'self-improvement', 'finance', 'general'],
  },
  {
    id: 'listicle-value',
    name: 'Value Listicle',
    description: 'Numbered list of actionable tips or insights',
    structure: `[Number] [topic] that [benefit]:

1. [Point 1]
2. [Point 2]
3. [Point 3]
...

Repost to help others. Follow for more.`,
    example: `7 free tools that replaced my $500/month subscriptions:

1. Notion → replaced Asana
2. Canva → replaced Adobe
3. Loom → replaced Zoom recordings
4. Calendly free → replaced scheduling tools
5. ChatGPT → replaced Jasper
6. Figma → replaced Sketch
7. Webflow → replaced custom dev

Repost to help others save money. Follow for more free alternatives.`,
    viralFactors: ['value', 'list-format', 'shareability', 'save-worthy'],
    bestFor: ['tech', 'productivity', 'marketing', 'startup'],
  },
  {
    id: 'thread-hook',
    name: 'Thread Hook',
    description: 'Compelling opening for a thread',
    structure: `I [impressive result] in [timeframe].

Here's exactly how (thread):

[Hint at value]

[Promise specific takeaways]`,
    example: `I grew from 0 to 100K followers in 6 months.

Here's exactly how (thread):

No paid ads. No follow-for-follow schemes. Just strategy.

I'm breaking down my entire playbook, including the posts that went viral.`,
    viralFactors: ['curiosity-gap', 'social-proof', 'value-promise'],
    bestFor: ['marketing', 'startup', 'self-improvement', 'general'],
  },
  {
    id: 'prediction',
    name: 'Bold Prediction',
    description: 'Make a forward-looking statement that sparks debate',
    structure: `Prediction: [Bold statement about future]

Why I believe this:

• [Reason 1]
• [Reason 2]
• [Reason 3]

Agree or disagree?`,
    example: `Prediction: 50% of current SaaS companies will be replaced by AI agents within 3 years.

Why I believe this:

• AI can now handle entire workflows
• Usage-based pricing beats subscription
• Agents don't need onboarding

Agree or disagree?`,
    viralFactors: ['controversy', 'reply-bait', 'thought-leadership'],
    bestFor: ['tech', 'ai', 'startup', 'finance', 'crypto'],
  },
  {
    id: 'mistake-learnings',
    name: 'Mistakes I Made',
    description: 'Vulnerable sharing of failures and lessons',
    structure: `[Number] mistakes I made [context]:

1. [Mistake + why it was wrong]
2. [Mistake + why it was wrong]
3. [Mistake + why it was wrong]

Don't repeat my errors.`,
    example: `5 mistakes I made building my first startup:

1. Building for 6 months without talking to customers
2. Raising money before finding product-market fit
3. Hiring friends instead of A-players
4. Ignoring unit economics
5. Not taking care of my health

Don't repeat my errors. Learn from mine instead.`,
    viralFactors: ['vulnerability', 'value', 'relatability', 'save-worthy'],
    bestFor: ['startup', 'career', 'self-improvement', 'finance'],
  },
  {
    id: 'framework',
    name: 'Framework Share',
    description: 'Share a mental model or framework',
    structure: `The [Name] Framework:

Most people [common approach].

Top performers [different approach].

Here's the difference:

[Visual or steps explanation]`,
    example: `The 5-3-1 Content Framework:

Most creators post randomly and hope for the best.

Top creators follow a system:

5 = Give value (tips, insights, resources)
3 = Build connection (stories, opinions)
1 = Ask (CTA, promotion)

This ratio builds trust AND grows followers.`,
    viralFactors: ['value', 'save-worthy', 'shareability', 'thought-leadership'],
    bestFor: ['marketing', 'productivity', 'startup', 'self-improvement'],
  },
  {
    id: 'observation',
    name: 'Sharp Observation',
    description: 'Point out something others haven\'t noticed',
    structure: `I've noticed something about [topic]:

[Observation]

[Evidence or examples]

[Conclusion or question]`,
    example: `I've noticed something about viral tweets:

They don't teach you anything new.

They remind you of something you already knew but forgot.

The best content isn't novel. It's resonant.

What "obvious" truths do you keep forgetting?`,
    viralFactors: ['insight', 'reply-bait', 'relatability', 'thought-leadership'],
    bestFor: ['marketing', 'self-improvement', 'general', 'startup'],
  },
  {
    id: 'before-after',
    name: 'Before/After Transformation',
    description: 'Show contrast between two states',
    structure: `[Time] ago: [Before state]
Today: [After state]

What changed:

[Key changes in bullet points]

[Lesson or CTA]`,
    example: `2 years ago: Making $4K/month at my 9-5
Today: Making $40K/month from my laptop

What changed:

• Started posting on X daily
• Built an email list
• Launched a digital product
• Quit my job

The internet is the best equalizer. Start today.`,
    viralFactors: ['transformation', 'aspiration', 'social-proof', 'curiosity'],
    bestFor: ['finance', 'self-improvement', 'startup', 'marketing'],
  },
  {
    id: 'curated-list',
    name: 'Curated Resources',
    description: 'Collection of valuable resources',
    structure: `[Number] [resources] every [audience] should [action]:

1. [Resource] - [why]
2. [Resource] - [why]
...

Bookmark this. Repost to share.`,
    example: `10 newsletters every founder should subscribe to:

1. @lennysan - product insights
2. @sloaneking - startup operations
3. @pacaborman - fintech trends
4. @turnernovak - VC perspective
5. @profgalloway - market analysis

Bookmark this. Repost to share with founder friends.`,
    viralFactors: ['value', 'save-worthy', 'shareability', 'list-format'],
    bestFor: ['tech', 'startup', 'marketing', 'finance', 'productivity'],
  },
];

export const HOOKS = {
  curiosity: [
    "Here's something nobody talks about:",
    "I spent 100 hours researching this so you don't have to:",
    "The truth about [topic] that experts won't tell you:",
    "I was wrong about [topic]. Here's what changed my mind:",
    "After [impressive number], here's what I learned:",
  ],
  controversy: [
    "Unpopular opinion:",
    "Hot take:",
    "This will be controversial but:",
    "I'll probably get hate for this:",
    "Most people get this completely wrong:",
  ],
  story: [
    "[Time] ago, I [dramatic situation].",
    "I still remember the day [pivotal moment].",
    "Nobody believed me when I said [prediction].",
    "I failed at [thing] for [time]. Then [change].",
    "The worst advice I ever got was [advice].",
  ],
  value: [
    "[Number] things I wish I knew about [topic]:",
    "The [topic] cheat sheet:",
    "How to [achieve result] (step by step):",
    "The [framework name] framework changed my [area]:",
    "I've [done impressive thing]. Here's my playbook:",
  ],
  social_proof: [
    "I've helped [number] people [result]. Here's how:",
    "[Impressive metric] in [timeframe]. Here's the breakdown:",
    "After [experience], I finally understand [topic]:",
    "My [thing] did [number]. The strategy was simple:",
    "[Number] [experts] told me the same thing:",
  ],
};

export const CALL_TO_ACTIONS = {
  follow: [
    "Follow for more [topic] insights.",
    "Follow me for daily [topic] content.",
    "If this helped, follow for more.",
    "Follow @[handle] for more threads like this.",
  ],
  engagement: [
    "What would you add to this list?",
    "Agree or disagree? Let me know below.",
    "What's the hardest lesson you've learned about [topic]?",
    "Drop a [emoji] if this resonated.",
    "Reply with your [topic] and I'll share my thoughts.",
  ],
  share: [
    "Repost to help others.",
    "Bookmark this for later. Repost to share.",
    "Save this thread. Share it with someone who needs it.",
    "Tag someone who needs to see this.",
  ],
};

export const NICHES = [
  { id: 'tech', name: 'Tech', icon: '💻', description: 'Software, apps, and technology trends' },
  { id: 'ai', name: 'AI/ML', icon: '🤖', description: 'Artificial intelligence and machine learning' },
  { id: 'crypto', name: 'Crypto/Web3', icon: '⛓️', description: 'Cryptocurrency and blockchain' },
  { id: 'finance', name: 'Finance', icon: '💰', description: 'Money, investing, and financial advice' },
  { id: 'startup', name: 'Startups', icon: '🚀', description: 'Entrepreneurship and building companies' },
  { id: 'productivity', name: 'Productivity', icon: '⚡', description: 'Efficiency, tools, and workflows' },
  { id: 'self-improvement', name: 'Self-Improvement', icon: '📈', description: 'Personal growth and mindset' },
  { id: 'marketing', name: 'Marketing', icon: '📣', description: 'Growth, content, and marketing strategy' },
  { id: 'fitness', name: 'Fitness', icon: '💪', description: 'Health, fitness, and wellness' },
  { id: 'politics', name: 'Politics', icon: '🏛️', description: 'Political commentary and news' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬', description: 'Movies, TV, music, and pop culture' },
  { id: 'sports', name: 'Sports', icon: '⚽', description: 'Sports news and commentary' },
  { id: 'general', name: 'General', icon: '✨', description: 'Broad appeal content' },
];

export function getTemplatesForNiche(niche: string): PostTemplate[] {
  return VIRAL_TEMPLATES.filter(
    template => template.bestFor.includes(niche) || template.bestFor.includes('general')
  );
}

export function getRandomHook(type: keyof typeof HOOKS): string {
  const hooks = HOOKS[type];
  return hooks[Math.floor(Math.random() * hooks.length)];
}

export function getRandomCTA(type: keyof typeof CALL_TO_ACTIONS): string {
  const ctas = CALL_TO_ACTIONS[type];
  return ctas[Math.floor(Math.random() * ctas.length)];
}
