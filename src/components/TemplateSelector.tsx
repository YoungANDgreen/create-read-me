'use client';

import { PostTemplate, getTemplatesForNiche } from '@/lib/templates';

interface TemplateSelectorProps {
  niche: string;
  selected: PostTemplate | null;
  onSelect: (template: PostTemplate | null) => void;
}

export default function TemplateSelector({ niche, selected, onSelect }: TemplateSelectorProps) {
  const templates = getTemplatesForNiche(niche);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-white">
          Post Template
        </label>
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="text-xs text-x-blue hover:underline"
          >
            Clear selection
          </button>
        )}
      </div>

      <div className="grid gap-2 max-h-64 overflow-y-auto pr-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`
              text-left p-3 rounded-xl border transition-all duration-200
              ${selected?.id === template.id
                ? 'bg-x-blue/20 border-x-blue'
                : 'bg-x-dark border-x-gray/20 hover:border-x-gray/40'
              }
            `}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className={`font-semibold ${selected?.id === template.id ? 'text-x-blue' : 'text-white'}`}>
                  {template.name}
                </h4>
                <p className="text-xs text-x-gray mt-0.5">{template.description}</p>
              </div>
              {selected?.id === template.id && (
                <svg className="w-5 h-5 text-x-blue shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {template.viralFactors.slice(0, 3).map((factor) => (
                <span
                  key={factor}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-x-gray/20 text-x-gray"
                >
                  {factor}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
