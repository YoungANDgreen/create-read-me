'use client';

import { PostAnalysis } from '@/lib/algorithm';

interface ViralScoreMeterProps {
  analysis: PostAnalysis;
  showDetails?: boolean;
}

export default function ViralScoreMeter({ analysis, showDetails = true }: ViralScoreMeterProps) {
  const { viralScore, tier, signals, monetizationImpact } = analysis;

  const tierColors = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-x-green',
    viral: 'bg-x-gold',
  };

  const tierLabels = {
    low: 'Needs Work',
    medium: 'Good',
    high: 'High Potential',
    viral: 'Viral Ready',
  };

  const tierTextColors = {
    low: 'text-red-500',
    medium: 'text-yellow-500',
    high: 'text-x-green',
    viral: 'text-x-gold',
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Viral Score</h3>
        <span className={`text-2xl font-bold ${tierTextColors[tier]}`}>
          {viralScore}
        </span>
      </div>

      {/* Score Bar */}
      <div className="relative h-3 bg-x-gray/20 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full ${tierColors[tier]} rounded-full transition-all duration-1000`}
          style={{ width: `${viralScore}%` }}
        />
        {/* Tier markers */}
        <div className="absolute left-[35%] top-0 w-px h-full bg-x-gray/40" />
        <div className="absolute left-[55%] top-0 w-px h-full bg-x-gray/40" />
        <div className="absolute left-[75%] top-0 w-px h-full bg-x-gray/40" />
      </div>

      <div className="flex justify-between text-xs text-x-gray">
        <span>0</span>
        <span>35</span>
        <span>55</span>
        <span>75</span>
        <span>100</span>
      </div>

      {/* Tier Badge */}
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${tierColors[tier]} text-black`}>
          {tierLabels[tier]}
        </span>
        {tier === 'viral' && (
          <span className="text-x-gold text-sm">Maximum algorithm boost!</span>
        )}
      </div>

      {showDetails && (
        <>
          {/* Key Signals */}
          <div className="pt-4 border-t border-x-gray/20">
            <h4 className="text-sm font-semibold text-x-gray mb-3">Engagement Prediction</h4>
            <div className="grid grid-cols-2 gap-3">
              <SignalBar
                label="Like Rate"
                value={(signals.favorite || 0) * 100}
                color="text-red-400"
              />
              <SignalBar
                label="Reply Rate"
                value={(signals.reply || 0) * 100}
                color="text-x-blue"
              />
              <SignalBar
                label="Repost Rate"
                value={(signals.repost || 0) * 100}
                color="text-x-green"
              />
              <SignalBar
                label="Follow Rate"
                value={(signals.followAuthor || 0) * 100}
                color="text-purple-400"
              />
            </div>
          </div>

          {/* Monetization Impact */}
          <div className="pt-4 border-t border-x-gray/20">
            <h4 className="text-sm font-semibold text-x-gray mb-3">Monetization Impact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-x-gray">Est. New Followers</span>
                <span className="text-x-green font-semibold">
                  +{monetizationImpact.followerGrowthPotential}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-x-gray">Engagement Boost</span>
                <span className="text-x-blue font-semibold">
                  {monetizationImpact.engagementBoost}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-x-gray">Reach Multiplier</span>
                <span className="text-x-gold font-semibold">
                  {monetizationImpact.verifiedReachMultiplier.toFixed(1)}x
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SignalBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-x-gray">{label}</span>
        <span className={color}>{value.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 bg-x-gray/20 rounded-full overflow-hidden">
        <div
          className={`h-full ${color.replace('text-', 'bg-')} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(value * 5, 100)}%` }}
        />
      </div>
    </div>
  );
}
