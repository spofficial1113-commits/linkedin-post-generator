import React, { useState } from 'react';
import { PostDraft, EventConfig } from '../types';
import { X, Copy, Check, ExternalLink, Download, Share2, Smartphone } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  draft: PostDraft;
  eventConfig: EventConfig;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  draft,
  eventConfig,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(draft.postContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenLinkedIn = () => {
    // Open LinkedIn feed share intent
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(draft.postContent)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#e3e2e7] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#777587] hover:text-[#1a1b1f] hover:bg-[#efedf3] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#0077b5] text-white flex items-center justify-center font-bold text-lg">
            in
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-[#1a1b1f]">Publish to LinkedIn</h3>
            <p className="text-xs text-[#464555]">Your event post is formatted and verified for high reach.</p>
          </div>
        </div>

        {/* Post Preview Summary */}
        <div className="bg-[#f4f3f8] rounded-2xl p-4 max-h-48 overflow-y-auto mb-4 border border-[#e3e2e7]/70 text-xs text-[#1a1b1f] whitespace-pre-line leading-relaxed">
          {draft.postContent}
        </div>

        {/* Action Grid */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleOpenLinkedIn}
            className="w-full bg-[#0077b5] hover:bg-[#006097] text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open LinkedIn Feed to Post</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full bg-white hover:bg-[#f4f3f8] border border-[#c7c4d8] text-[#1a1b1f] font-semibold text-sm py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#006b2d]" />
                <span className="text-[#006b2d]">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#464555]" />
                <span>Copy Post Text</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-3 border-t border-[#efedf3] flex items-center justify-between text-[11px] text-[#777587]">
          <span>Tagged: @{eventConfig.organizer}</span>
          <span className="text-[#006b2d] font-medium flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> High Engagement Score
          </span>
        </div>
      </div>
    </div>
  );
};
