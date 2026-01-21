# X Viral Post Generator

An AI-powered tool to generate viral posts optimized for X's (Twitter's) recommendation algorithm. Built to help content creators grow their following and monetize through X's creator programs.

## Features

### Generate Tab
- **Niche Selection**: Choose your content niche for optimized suggestions
- **Topic Input**: Describe what you want to post about
- **Template System**: 10+ viral post templates based on proven formats
- **Quick Presets**: One-click settings for different post types
- **AI Generation**: Optional integration with OpenAI/Claude for enhanced content
- **Variations**: Get multiple versions of each generated post

### Analyze Tab
- **Algorithm Scoring**: See how your post scores against X's 15 engagement signals
- **Viral Score**: 0-100 score with tier ratings (Low/Medium/High/Viral)
- **Engagement Predictions**: Estimated like, reply, repost, and follow rates
- **Optimization Tips**: Actionable suggestions to improve your post
- **Algorithm Education**: Learn how X's recommendation system works

### Monetize Tab
- **Progress Tracker**: Track your journey to monetization
- **Requirements Checklist**: See what you need for each program
- **Strategy Guide**: Phase-by-phase plan to start earning
- **Content Calendar**: Weekly posting schedule template

## How It Works

Based on X's open-sourced recommendation algorithm (Phoenix), the tool analyzes posts across 15 engagement signals:

**Positive Signals:**
- Favorites (likes)
- Replies
- Reposts
- Quote tweets
- Profile clicks
- Follows
- Dwell time
- Video views
- Shares

**Negative Signals:**
- "Not interested" clicks
- Mutes
- Blocks
- Reports

Posts are scored using the formula: `Final Score = Σ (weight_i × P(action_i))`

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YoungANDgreen/create-read-me.git

# Navigate to directory
cd create-read-me

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Optional: AI Generation

For enhanced AI-powered generation, add your API key:

```bash
# Copy the example env file
cp .env.example .env.local

# Add your OpenAI or Anthropic API key
OPENAI_API_KEY=your_key_here
# or
ANTHROPIC_API_KEY=your_key_here
```

The app works fully without API keys using the template-based generation system.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **AI Integration**: OpenAI / Anthropic APIs (optional)

## X Monetization Requirements

To earn from posting on X:

| Program | Followers | Other Requirements |
|---------|-----------|-------------------|
| Tips | 0 | Stripe connected |
| Subscriptions | 500 | X Premium subscription |
| Ads Revenue Share | 500 | 5M impressions in 3 months, X Premium |

## Project Structure

```
src/
├── app/
│   ├── api/generate/    # AI generation endpoint
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main application
├── components/
│   ├── MonetizationTracker.tsx
│   ├── NicheSelector.tsx
│   ├── PostingTimeIndicator.tsx
│   ├── PostPreview.tsx
│   ├── SuggestionsList.tsx
│   ├── TemplateSelector.tsx
│   └── ViralScoreMeter.tsx
├── lib/
│   ├── algorithm.ts     # X algorithm scoring engine
│   ├── generator.ts     # Post generation logic
│   └── templates.ts     # Viral post templates
└── types/
    └── index.ts         # TypeScript types
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This tool is for educational purposes. It is not affiliated with X Corp. The algorithm insights are based on publicly available information from X's open-source releases. Actual post performance depends on many factors beyond algorithmic optimization.

## License

MIT
