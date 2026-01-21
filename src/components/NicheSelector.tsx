'use client';

import { NICHES } from '@/lib/templates';

interface NicheSelectorProps {
  selected: string;
  onSelect: (niche: string) => void;
}

export default function NicheSelector({ selected, onSelect }: NicheSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-white">
        Select Your Niche
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {NICHES.map((niche) => (
          <button
            key={niche.id}
            onClick={() => onSelect(niche.id)}
            className={`
              flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-200
              ${selected === niche.id
                ? 'bg-x-blue/20 border-x-blue text-white'
                : 'bg-x-dark border-x-gray/20 text-x-gray hover:border-x-gray/40 hover:text-white'
              }
            `}
          >
            <span className="text-xl">{niche.icon}</span>
            <span className="text-xs font-medium">{niche.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
