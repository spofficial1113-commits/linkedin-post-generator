import React from 'react';
import { X, Sparkles, Sliders, Share2, HelpCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#e3e2e7] relative animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#efedf3]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#e3dfff] text-[#4d41df] rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#1a1b1f]">EventPulse Quick Guide</h3>
              <p className="text-xs text-[#777587]">How to create viral summit LinkedIn content in seconds</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#777587] hover:text-[#1a1b1f] hover:bg-[#efedf3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mt-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e3dfff] text-[#4d41df] flex items-center justify-center shrink-0 font-bold text-xs">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a1b1f]">Drop Summit Photos</h4>
              <p className="text-xs text-[#464555] mt-0.5">
                Upload your stage keynotes, selfies, or select from official summit camera roll pictures.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e3dfff] text-[#4d41df] flex items-center justify-center shrink-0 font-bold text-xs">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a1b1f]">Speak or Jot Down Takeaways</h4>
              <p className="text-xs text-[#464555] mt-0.5">
                Use the Voice Note feature or type raw bullet points. EventPulse formats them into executive LinkedIn prose.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e3dfff] text-[#4d41df] flex items-center justify-center shrink-0 font-bold text-xs">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a1b1f]">Pick Tone & Polish</h4>
              <p className="text-xs text-[#464555] mt-0.5">
                Switch between Grateful, Professional, Takeaways, or Visionary. Use quick AI chips like "Make punchier" or "Add Founder POV".
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#e3dfff] text-[#4d41df] flex items-center justify-center shrink-0 font-bold text-xs">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1a1b1f]">Publish & Reach Attendees</h4>
              <p className="text-xs text-[#464555] mt-0.5">
                Preview live in Desktop or Mobile view, copy directly or launch the LinkedIn post composer with one click.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#efedf3] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#4d41df] text-white text-xs font-semibold hover:bg-[#3f34cf] transition-colors"
          >
            Got it, let's create
          </button>
        </div>
      </div>
    </div>
  );
};
