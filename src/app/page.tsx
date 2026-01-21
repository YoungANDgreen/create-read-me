'use client';

import { useState, useCallback } from 'react';
import {
  NicheSelector,
  TemplateSelector,
  PostPreview,
  ViralScoreMeter,
  SuggestionsList,
  MonetizationTracker,
  PostingTimeIndicator,
} from '@/components';
import { PostTemplate, VIRAL_TEMPLATES } from '@/lib/templates';
import { GeneratorConfig, generatePost, QUICK_PRESETS } from '@/lib/generator';
import { analyzePost, PostAnalysis } from '@/lib/algorithm';

type TabType = 'generate' | 'analyze' | 'monetize';

export default function Home() {
  // State
  const [activeTab, setActiveTab] = useState<TabType>('generate');
  const [niche, setNiche] = useState('general');
  const [topic, setTopic] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate | null>(null);
  const [style, setStyle] = useState<GeneratorConfig['style']>('mixed');
  const [tone, setTone] = useState<GeneratorConfig['tone']>('casual');
  const [includeHook, setIncludeHook] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [currentFollowers, setCurrentFollowers] = useState(1000);

  // Generated content
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [variations, setVariations] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<PostAnalysis | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Analyze mode
  const [customPost, setCustomPost] = useState('');
  const [customAnalysis, setCustomAnalysis] = useState<PostAnalysis | null>(null);

  const handleGenerate = useCallback(() => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    // Simulate generation delay for UX
    setTimeout(() => {
      const config: GeneratorConfig = {
        niche,
        topic,
        style,
        tone,
        includeHook,
        includeCTA,
        maxLength: 280,
      };

      const result = generatePost(config);

      setGeneratedContent(result.content);
      setVariations(result.variations);
      setAnalysis(result.analysis);
      setIsGenerating(false);
    }, 800);
  }, [niche, topic, style, tone, includeHook, includeCTA]);

  const handleQuickPreset = (presetKey: string) => {
    const preset = QUICK_PRESETS[presetKey];
    if (preset.style) setStyle(preset.style);
    if (preset.tone) setTone(preset.tone);
    if (preset.includeHook !== undefined) setIncludeHook(preset.includeHook);
    if (preset.includeCTA !== undefined) setIncludeCTA(preset.includeCTA);
  };

  const handleAnalyzeCustom = () => {
    if (!customPost.trim()) return;
    const result = analyzePost(customPost, niche);
    setCustomAnalysis(result);
  };

  return (
    <main className="min-h-screen bg-x-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-x-black/80 backdrop-blur-lg border-b border-x-gray/20">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-x-blue to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <div>
                <h1 className="font-bold text-white">Viral Generator</h1>
                <p className="text-xs text-x-gray">Grow & Monetize on X</p>
              </div>
            </div>
            <PostingTimeIndicator />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-[68px] z-40 bg-x-black border-b border-x-gray/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex">
            {[
              { id: 'generate', label: 'Generate', icon: '✨' },
              { id: 'analyze', label: 'Analyze', icon: '📊' },
              { id: 'monetize', label: 'Monetize', icon: '💰' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 py-4 text-center font-semibold transition-colors relative ${
                  activeTab === tab.id ? 'text-white' : 'text-x-gray hover:text-white'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-x-blue rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <div className="space-y-6">
            {/* Niche Selection */}
            <NicheSelector selected={niche} onSelect={setNiche} />

            {/* Topic Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">
                Topic / Subject
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What do you want to post about? Be specific for better results..."
                className="textarea h-24"
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(QUICK_PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => handleQuickPreset(key)}
                    className="px-3 py-1.5 rounded-full bg-x-dark border border-x-gray/40 text-sm text-x-gray hover:text-white hover:border-x-gray transition-colors"
                  >
                    {key.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Options */}
            <details className="card">
              <summary className="cursor-pointer text-white font-semibold">
                Advanced Options
              </summary>
              <div className="mt-4 space-y-4">
                {/* Template Selection */}
                <TemplateSelector
                  niche={niche}
                  selected={selectedTemplate}
                  onSelect={setSelectedTemplate}
                />

                {/* Style & Tone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Style</label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value as GeneratorConfig['style'])}
                      className="select"
                    >
                      <option value="mixed">Mixed</option>
                      <option value="educational">Educational</option>
                      <option value="story">Story</option>
                      <option value="controversial">Controversial</option>
                      <option value="value">Value-Packed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Tone</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value as GeneratorConfig['tone'])}
                      className="select"
                    >
                      <option value="casual">Casual</option>
                      <option value="professional">Professional</option>
                      <option value="bold">Bold</option>
                      <option value="inspirational">Inspirational</option>
                    </select>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeHook}
                      onChange={(e) => setIncludeHook(e.target.checked)}
                      className="w-4 h-4 rounded border-x-gray/40 bg-x-dark text-x-blue focus:ring-x-blue"
                    />
                    <span className="text-sm text-white">Include Hook</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeCTA}
                      onChange={(e) => setIncludeCTA(e.target.checked)}
                      className="w-4 h-4 rounded border-x-gray/40 bg-x-dark text-x-blue focus:ring-x-blue"
                    />
                    <span className="text-sm text-white">Include CTA</span>
                  </label>
                </div>
              </div>
            </details>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <span>Generate Viral Post</span>
                  <span className="text-xl">🚀</span>
                </>
              )}
            </button>

            {/* Generated Results */}
            {generatedContent && analysis && (
              <div className="space-y-6 pt-6 border-t border-x-gray/20">
                <h2 className="text-xl font-bold text-white">Generated Post</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <PostPreview content={generatedContent} variations={variations} />
                    <SuggestionsList suggestions={analysis.suggestions} />
                  </div>
                  <div>
                    <ViralScoreMeter analysis={analysis} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analyze Tab */}
        {activeTab === 'analyze' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-lg font-bold text-white mb-4">Analyze Your Post</h2>
              <p className="text-sm text-x-gray mb-4">
                Paste your draft post below to see how it scores against X's algorithm.
              </p>

              <textarea
                value={customPost}
                onChange={(e) => setCustomPost(e.target.value)}
                placeholder="Paste your post here..."
                className="textarea h-32 mb-4"
              />

              <div className="mb-4">
                <label className="block text-sm font-semibold text-white mb-2">
                  Your Niche (for accurate scoring)
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="select"
                >
                  <option value="general">General</option>
                  <option value="tech">Tech</option>
                  <option value="ai">AI/ML</option>
                  <option value="crypto">Crypto/Web3</option>
                  <option value="finance">Finance</option>
                  <option value="startup">Startups</option>
                  <option value="productivity">Productivity</option>
                  <option value="self-improvement">Self-Improvement</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <button
                onClick={handleAnalyzeCustom}
                disabled={!customPost.trim()}
                className="btn-primary w-full"
              >
                Analyze Post
              </button>
            </div>

            {customAnalysis && (
              <div className="grid md:grid-cols-2 gap-6">
                <ViralScoreMeter analysis={customAnalysis} />
                <SuggestionsList suggestions={customAnalysis.suggestions} />
              </div>
            )}

            {/* Algorithm Insights */}
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">How X's Algorithm Works</h3>
              <div className="space-y-4 text-sm text-x-gray">
                <p>
                  X's recommendation algorithm (codenamed Phoenix) uses a Grok-based transformer
                  to predict engagement across 15 different actions. Posts are scored based on:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-x-green">Positive Signals</h4>
                    <ul className="space-y-1">
                      <li>• Likes, replies, reposts, quotes</li>
                      <li>• Profile clicks, follows</li>
                      <li>• Dwell time (reading duration)</li>
                      <li>• Shares, saves, video views</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-red-500">Negative Signals</h4>
                    <ul className="space-y-1">
                      <li>• "Not interested" clicks</li>
                      <li>• Mutes, blocks, reports</li>
                      <li>• Low engagement from followers</li>
                    </ul>
                  </div>
                </div>

                <p>
                  <span className="text-x-blue font-semibold">Key insight:</span> Replies are weighted
                  heavily—posts that spark conversations get massive algorithmic boosts. That's why
                  questions, controversial takes, and engagement bait work so well.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Monetize Tab */}
        {activeTab === 'monetize' && (
          <div className="space-y-6">
            <MonetizationTracker
              currentFollowers={currentFollowers}
              onFollowersChange={setCurrentFollowers}
            />

            {/* Monetization Strategy */}
            <div className="card">
              <h3 className="text-lg font-bold text-white mb-4">Monetization Strategy</h3>
              <div className="space-y-4">
                <div className="p-4 bg-black rounded-xl border border-x-gray/20">
                  <h4 className="font-semibold text-x-gold mb-2">Phase 1: Build Foundation</h4>
                  <ul className="text-sm text-x-gray space-y-1">
                    <li>• Post 3-5 times daily with algorithm-optimized content</li>
                    <li>• Focus on one niche to build authority</li>
                    <li>• Engage with larger accounts in your space</li>
                    <li>• Target: 500+ followers (unlock Tips & Subscriptions)</li>
                  </ul>
                </div>

                <div className="p-4 bg-black rounded-xl border border-x-gray/20">
                  <h4 className="font-semibold text-x-blue mb-2">Phase 2: Scale Engagement</h4>
                  <ul className="text-sm text-x-gray space-y-1">
                    <li>• Create viral threads (use our templates)</li>
                    <li>• Build an email list from X traffic</li>
                    <li>• Get verified for credibility boost</li>
                    <li>• Target: 5M impressions over 3 months</li>
                  </ul>
                </div>

                <div className="p-4 bg-black rounded-xl border border-x-gray/20">
                  <h4 className="font-semibold text-x-green mb-2">Phase 3: Monetize</h4>
                  <ul className="text-sm text-x-gray space-y-1">
                    <li>• Apply for Ads Revenue Share program</li>
                    <li>• Launch paid subscriptions</li>
                    <li>• Create digital products to sell</li>
                    <li>• Potential: $500-$5,000+/month from posts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Content Calendar Tip */}
            <div className="card bg-gradient-to-br from-x-blue/10 to-purple-500/10 border-x-blue/30">
              <h3 className="text-lg font-bold text-white mb-2">Content Calendar</h3>
              <p className="text-sm text-x-gray mb-4">
                Consistency is key. Here's a proven weekly schedule:
              </p>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="font-semibold text-white py-1">{day}</div>
                ))}
                {[
                  'Value',
                  'Story',
                  'List',
                  'Hot Take',
                  'Thread',
                  'Engage',
                  'Personal',
                ].map((type, i) => (
                  <div key={i} className="bg-x-dark rounded py-2 text-x-gray">
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-x-gray/20 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-x-gray">
          <p>
            Built using insights from X's open-source algorithm.
            <br />
            Not affiliated with X Corp.
          </p>
        </div>
      </footer>
    </main>
  );
}
