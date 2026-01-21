'use client';

import { getBestPostingTime } from '@/lib/generator';
import { OPTIMAL_POSTING_TIMES } from '@/lib/algorithm';

export default function PostingTimeIndicator() {
  const { isGoodTime, nextBestTime, reason } = getBestPostingTime();

  return (
    <div className={`card ${isGoodTime ? 'border-x-green/40 pulse-green' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isGoodTime ? 'bg-x-green' : 'bg-x-gray'}`} />
          <div>
            <p className={`font-semibold ${isGoodTime ? 'text-x-green' : 'text-white'}`}>
              {isGoodTime ? 'Great Time to Post!' : 'Not Peak Hours'}
            </p>
            <p className="text-sm text-x-gray">{reason}</p>
          </div>
        </div>
        {isGoodTime && (
          <span className="text-2xl">🚀</span>
        )}
      </div>

      {/* Weekly Schedule */}
      <details className="mt-4">
        <summary className="text-sm text-x-blue cursor-pointer hover:underline">
          View best posting times
        </summary>
        <div className="mt-3 space-y-2">
          {OPTIMAL_POSTING_TIMES.map((day) => (
            <div key={day.day} className="flex items-center justify-between text-sm">
              <span className="text-x-gray">{day.day}</span>
              <div className="flex items-center gap-2">
                <span className="text-white">{day.times.join(', ')}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  day.quality === 'excellent' ? 'bg-x-green/20 text-x-green' :
                  day.quality === 'good' ? 'bg-x-blue/20 text-x-blue' :
                  'bg-x-gray/20 text-x-gray'
                }`}>
                  {day.quality}
                </span>
              </div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
