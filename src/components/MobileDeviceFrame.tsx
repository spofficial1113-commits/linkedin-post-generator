import React from 'react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[380px] mx-auto bg-[#1a1b1f] rounded-[44px] p-3 shadow-2xl border-4 border-[#2f3034] relative">
      {/* Dynamic Island / Notch */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1a1b24] mr-4" />
        <div className="w-2 h-2 rounded-full bg-[#0a2540]" />
      </div>

      {/* Screen container */}
      <div className="w-full bg-[#f3f2ef] rounded-[34px] overflow-hidden flex flex-col pt-7 pb-4">
        {/* Mobile Status Bar */}
        <div className="px-6 py-1 flex items-center justify-between text-[11px] font-semibold text-[#1a1b1f] select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">5G</span>
            <div className="w-5 h-2.5 border border-[#1a1b1f] rounded-[3px] p-[1px] flex items-center">
              <div className="h-full w-full bg-[#1a1b1f] rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Mobile LinkedIn Bar */}
        <div className="bg-white px-4 py-2 flex items-center justify-between border-b border-[#e0e0e0] shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#0077b5] text-white flex items-center justify-center font-bold text-xs">
              in
            </div>
            <div className="bg-[#eef3f8] rounded-full px-3 py-1 text-[11px] text-[#666666] flex items-center gap-1 w-44">
              <span>Search posts...</span>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center text-xs font-bold">
            💬
          </div>
        </div>

        {/* Scrollable Feed Container */}
        <div className="max-h-[580px] overflow-y-auto p-2">
          {children}
        </div>

        {/* Mobile Home Bar */}
        <div className="pt-2 flex justify-center">
          <div className="w-32 h-1 bg-[#1a1b1f]/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};
