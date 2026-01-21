'use client';

import { useState } from 'react';

interface PostPreviewProps {
  content: string;
  variations?: string[];
  onEdit?: (content: string) => void;
  onCopy?: () => void;
}

export default function PostPreview({ content, variations = [], onEdit, onCopy }: PostPreviewProps) {
  const [activeVariation, setActiveVariation] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const displayContent = activeVariation === -1 ? content : variations[activeVariation];
  const charCount = displayContent.length;
  const isOverLimit = charCount > 280;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayContent);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Post Preview Card */}
      <div className="post-preview">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-x-blue to-purple-500" />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">Your Name</span>
              <svg className="w-4 h-4 text-x-blue" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            </div>
            <span className="text-x-gray text-sm">@yourhandle</span>
          </div>
        </div>

        {/* Content */}
        <div className="content text-[15px] leading-relaxed whitespace-pre-wrap mb-3">
          {displayContent}
        </div>

        {/* Character Count */}
        <div className="flex justify-between items-center pt-3 border-t border-x-gray/20">
          <span className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-x-gray'}`}>
            {charCount}/280 {isOverLimit && '(will need thread)'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-x-dark border border-x-gray/40 text-sm text-white hover:bg-x-gray/20 transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-x-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Variations */}
      {variations.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-x-gray">Variations</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveVariation(-1)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                activeVariation === -1
                  ? 'bg-x-blue text-white'
                  : 'bg-x-dark border border-x-gray/40 text-x-gray hover:text-white'
              }`}
            >
              Original
            </button>
            {variations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveVariation(index)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  activeVariation === index
                    ? 'bg-x-blue text-white'
                    : 'bg-x-dark border border-x-gray/40 text-x-gray hover:text-white'
                }`}
              >
                Variation {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
