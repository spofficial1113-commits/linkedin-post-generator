import React, { useState } from 'react';
import { ViewMode } from '../types';
import { EventPulseLogo } from './EventPulseLogo';
import { SARAH_AVATAR } from '../data/mockData';
import { HelpCircle, Bell, ChevronDown, Check, Sparkles, User, ExternalLink, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onOpenHelp: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenHelp,
  onOpenNotifications,
  unreadCount = 2
}) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-[#e9e7ed] shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-16 w-full max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div 
          onClick={() => onViewChange('attendee')} 
          className="cursor-pointer transition-transform active:scale-[0.98]"
        >
          <EventPulseLogo />
        </div>

        {/* View Switcher Navigation */}
        <nav 
          aria-label="Workspace views"
          className="bg-[#efedf3] p-1 rounded-xl flex items-center border border-[#e3e2e7]/80 shadow-xs"
        >
          <button
            type="button"
            onClick={() => onViewChange('organizer')}
            className={`font-body text-[13px] px-4 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1.5 ${
              currentView === 'organizer'
                ? 'bg-[#4d41df] text-white shadow-sm font-semibold'
                : 'text-[#464555] hover:text-[#1a1b1f] hover:bg-white/50'
            }`}
          >
            <span>Organizer</span>
            {currentView === 'organizer' && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            )}
          </button>
          <button
            type="button"
            onClick={() => onViewChange('attendee')}
            className={`font-body text-[13px] px-4 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1.5 ${
              currentView === 'attendee'
                ? 'bg-[#4d41df] text-white shadow-sm font-semibold'
                : 'text-[#464555] hover:text-[#1a1b1f] hover:bg-white/50'
            }`}
          >
            <span>Attendee View</span>
            {currentView === 'attendee' && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            )}
          </button>
        </nav>

        {/* Right utility items */}
        <div className="flex items-center gap-2">
          {/* Documentation / Help Button */}
          <button
            type="button"
            onClick={onOpenHelp}
            aria-label="Help and Documentation"
            className="p-2 rounded-xl text-[#464555] hover:bg-[#efedf3] hover:text-[#1a1b1f] transition-colors flex items-center justify-center"
            title="Guide & Tips"
          >
            <HelpCircle className="w-[19px] h-[19px]" />
          </button>

          {/* Notifications Button with unread indicator */}
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-[#464555] hover:bg-[#efedf3] hover:text-[#1a1b1f] transition-colors flex items-center justify-center"
            title="Recent Activity"
          >
            <Bell className="w-[19px] h-[19px]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#4d41df] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Profile Dropdown Container */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-1.5 pl-1 py-1 pr-1.5 rounded-full hover:bg-[#efedf3] transition-colors select-none focus:outline-none focus:ring-2 focus:ring-[#4d41df]/20"
            >
              <img
                src={SARAH_AVATAR}
                alt="Sarah Johnson"
                className="w-8 h-8 rounded-full object-cover border border-[#c7c4d8]/60 shadow-xs"
              />
              <ChevronDown className="w-3.5 h-3.5 text-[#464555]" />
            </button>

            {/* Profile Popover Menu */}
            {profileOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#e3e2e7] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setProfileOpen(false)}
              >
                <div className="px-3 py-2.5 border-b border-[#efedf3] flex items-center gap-2.5">
                  <img
                    src={SARAH_AVATAR}
                    alt="Sarah Johnson"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-[#1a1b1f] truncate">Sarah Johnson</span>
                    <span className="text-xs text-[#777587] truncate">Product Designer • Attendee</span>
                  </div>
                </div>

                <div className="py-1">
                  <button 
                    type="button"
                    onClick={() => onViewChange('attendee')}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#f4f3f8] text-[#1a1b1f] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#4d41df]" />
                      Attendee Content Studio
                    </span>
                    {currentView === 'attendee' && <Check className="w-3.5 h-3.5 text-[#4d41df]" />}
                  </button>

                  <button 
                    type="button"
                    onClick={() => onViewChange('organizer')}
                    className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#f4f3f8] text-[#1a1b1f] flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#6b38d4]" />
                      Organizer Campaign Hub
                    </span>
                    {currentView === 'organizer' && <Check className="w-3.5 h-3.5 text-[#4d41df]" />}
                  </button>
                </div>

                <div className="pt-1 border-t border-[#efedf3]">
                  <div className="px-3 py-1.5 text-[11px] text-[#777587] flex items-center justify-between">
                    <span>Connected LinkedIn:</span>
                    <span className="text-[#0077b5] font-medium flex items-center gap-1">
                      Verified <Check className="w-3 h-3 text-[#006b2d]" />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
