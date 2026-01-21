'use client';

import { useState } from 'react';
import { MONETIZATION_REQUIREMENTS } from '@/lib/algorithm';

interface MonetizationTrackerProps {
  currentFollowers: number;
  onFollowersChange: (followers: number) => void;
}

export default function MonetizationTracker({ currentFollowers, onFollowersChange }: MonetizationTrackerProps) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(currentFollowers.toString());

  // Calculate progress towards ads revenue share
  const adsRequirements = MONETIZATION_REQUIREMENTS.adsRevenueShare.requirements;
  const followerProgress = Math.min((currentFollowers / adsRequirements.followers) * 100, 100);

  // Simulated impressions (in real app, would come from X API)
  const estimatedImpressions = currentFollowers * 1500; // Rough estimate
  const impressionProgress = Math.min((estimatedImpressions / adsRequirements.impressions3Months) * 100, 100);

  const handleSave = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value) && value >= 0) {
      onFollowersChange(value);
    }
    setShowInput(false);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Monetization Progress</h3>
        <span className="text-x-gold text-sm font-semibold">Get Paid to Post</span>
      </div>

      {/* Current Followers */}
      <div className="bg-black rounded-xl p-4 border border-x-gray/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-x-gray">Your Followers</span>
          {!showInput && (
            <button
              onClick={() => setShowInput(true)}
              className="text-x-blue text-sm hover:underline"
            >
              Edit
            </button>
          )}
        </div>
        {showInput ? (
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input flex-1"
              placeholder="Enter follower count"
            />
            <button onClick={handleSave} className="btn-primary py-2 px-4">
              Save
            </button>
          </div>
        ) : (
          <span className="text-3xl font-bold text-white">{formatNumber(currentFollowers)}</span>
        )}
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {/* Followers Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-x-gray">Followers (500 required)</span>
            <span className={followerProgress >= 100 ? 'text-x-green' : 'text-white'}>
              {formatNumber(currentFollowers)} / 500
            </span>
          </div>
          <div className="h-2 bg-x-gray/20 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                followerProgress >= 100 ? 'bg-x-green' : 'bg-x-blue'
              }`}
              style={{ width: `${followerProgress}%` }}
            />
          </div>
          {followerProgress >= 100 && (
            <span className="text-xs text-x-green flex items-center gap-1 mt-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Requirement met!
            </span>
          )}
        </div>

        {/* Impressions Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-x-gray">Est. 3-Month Impressions (5M required)</span>
            <span className={impressionProgress >= 100 ? 'text-x-green' : 'text-white'}>
              {formatNumber(estimatedImpressions)} / 5M
            </span>
          </div>
          <div className="h-2 bg-x-gray/20 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                impressionProgress >= 100 ? 'bg-x-green' : 'bg-purple-500'
              }`}
              style={{ width: `${impressionProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Monetization Tiers */}
      <div className="pt-4 border-t border-x-gray/20">
        <h4 className="text-sm font-semibold text-white mb-3">Monetization Programs</h4>
        <div className="space-y-2">
          {Object.entries(MONETIZATION_REQUIREMENTS).map(([key, program]) => {
            const meetsFollowers = currentFollowers >= program.requirements.followers;
            const isAvailable = meetsFollowers;

            return (
              <div
                key={key}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isAvailable ? 'bg-x-green/10 border border-x-green/30' : 'bg-x-dark'
                }`}
              >
                <div>
                  <span className={`font-medium ${isAvailable ? 'text-x-green' : 'text-white'}`}>
                    {program.name}
                  </span>
                  <p className="text-xs text-x-gray">{program.potentialEarnings}</p>
                </div>
                {isAvailable ? (
                  <span className="text-xs text-x-green font-semibold">Available</span>
                ) : (
                  <span className="text-xs text-x-gray">
                    Need {program.requirements.followers - currentFollowers} more followers
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-x-blue/10 border border-x-blue/30 rounded-lg p-3">
        <p className="text-sm text-x-blue">
          <span className="font-semibold">Pro tip:</span> Focus on growing verified followers.
          They count more towards monetization eligibility and boost your content reach.
        </p>
      </div>
    </div>
  );
}
