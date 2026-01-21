'use client';

interface SuggestionsListProps {
  suggestions: string[];
}

export default function SuggestionsList({ suggestions }: SuggestionsListProps) {
  if (suggestions.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 text-x-green">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-semibold">Post is optimized!</span>
        </div>
        <p className="text-sm text-x-gray mt-2">
          Your post hits all the key engagement signals. Ready to go viral!
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <svg className="w-5 h-5 text-x-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Optimization Tips
      </h3>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="shrink-0 w-5 h-5 rounded-full bg-x-blue/20 text-x-blue flex items-center justify-center text-xs font-bold mt-0.5">
              {index + 1}
            </span>
            <span className="text-x-gray">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
