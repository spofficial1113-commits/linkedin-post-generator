import React, { useState } from 'react';
import { EventConfig, ViewMode } from '../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  Globe, 
  ExternalLink, 
  Brain, 
  Layers, 
  Upload, 
  ArrowRight,
  TrendingUp,
  X,
  Plus
} from 'lucide-react';

interface OrganizerViewProps {
  eventConfig: EventConfig;
  onUpdateConfig: (updated: Partial<EventConfig>) => void;
  onNavigateToAttendee: () => void;
}

export const OrganizerView: React.FC<OrganizerViewProps> = ({
  eventConfig,
  onUpdateConfig,
  onNavigateToAttendee,
}) => {
  const [newTagInput, setNewTagInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showPublishSuccess, setShowPublishSuccess] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const tag = newTagInput.trim();
    if (!tag) return;
    const formatted = tag.startsWith('#') ? tag : `#${tag}`;
    if (!eventConfig.hashtags.includes(formatted)) {
      onUpdateConfig({ hashtags: [...eventConfig.hashtags, formatted] });
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateConfig({
      hashtags: eventConfig.hashtags.filter(t => t !== tagToRemove)
    });
  };

  const handleCopyAttendeeLink = () => {
    const link = `${window.location.origin}/#attendee`;
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handlePublishEngine = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setShowPublishSuccess(true);
      onUpdateConfig({ isPublished: true, lastSavedText: 'Published & Synced just now' });
      setTimeout(() => setShowPublishSuccess(false), 3500);
    }, 700);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-200">
      {/* Editorial Header & Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#777587] font-medium text-xs shadow-xs border border-[#e3e2e7]/60">
            <span className="w-2 h-2 rounded-full bg-[#00873b] animate-pulse" />
            <span className="font-semibold text-[#1a1b1f]">Draft State</span>
            <span className="text-[#c7c4d8]">•</span>
            <span className="font-mono text-[11px] text-[#464555]">EP-2026-v4</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1a1b1f] tracking-tight">
            Create your event
          </h1>
          <p className="font-body text-base text-[#464555] max-w-2xl leading-relaxed">
            Set up your event once and let EventPulse create engaging attendee content automatically.
          </p>
        </div>

        {/* Quick Action / Status Marker */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs text-[#464555] bg-white px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xs border border-[#e3e2e7]/60">
            <CheckCircle2 className="w-4 h-4 text-[#006b2d]" />
            {eventConfig.lastSavedText}
          </span>

          <button
            type="button"
            onClick={handlePublishEngine}
            disabled={publishing}
            className="bg-[#4d41df] hover:bg-[#3f34cf] active:scale-[0.98] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {publishing ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{eventConfig.isPublished ? 'Update Engine' : 'Publish Engine'}</span>
          </button>
        </div>
      </div>

      {/* Publish Toast Alert */}
      {showPublishSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-[#f7fff3] border border-[#00873b]/30 shadow-sm flex items-center justify-between animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00873b]/10 text-[#00873b] flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-[#002109]">Event AI Engine Published Successfully!</p>
              <p className="text-xs text-[#005321]">Attendee prompt templates and brand anchors are live and ready for delegates.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onNavigateToAttendee}
            className="text-xs font-semibold text-[#006b2d] bg-white px-3 py-1.5 rounded-lg border border-[#00873b]/20 hover:bg-[#00873b]/10 transition-colors flex items-center gap-1"
          >
            Preview Attendee View <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Workspace Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Event Setup Form (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e3e2e7]/80">
          {/* Form Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#efedf3]">
            <div>
              <h2 className="font-display text-xl font-bold text-[#1a1b1f] tracking-tight">Event Details</h2>
              <p className="text-xs text-[#464555] mt-0.5">Tell us about your event to fine-tune AI narrative models.</p>
            </div>
            <div className="p-2 bg-[#e3dfff]/60 text-[#4d41df] rounded-xl flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5 mt-6">
            {/* Event Name */}
            <div className="space-y-1.5">
              <label htmlFor="event-name" className="block text-xs font-semibold text-[#1a1b1f]">
                Event Name
              </label>
              <div className="relative rounded-xl bg-white focus-within:ring-2 focus-within:ring-[#4d41df]/25 transition-all">
                <input
                  id="event-name"
                  type="text"
                  value={eventConfig.name}
                  onChange={(e) => onUpdateConfig({ name: e.target.value })}
                  placeholder="e.g. NextGen Engineering Expo"
                  className="w-full bg-[#f4f3f8] text-[#1a1b1f] font-medium text-sm rounded-xl px-4 py-3 outline-none transition-colors focus:bg-white border border-transparent focus:border-[#4d41df]/30"
                />
              </div>
            </div>

            {/* Organizer Name */}
            <div className="space-y-1.5">
              <label htmlFor="org-name" className="block text-xs font-semibold text-[#1a1b1f]">
                Organizer / Company Name
              </label>
              <div className="relative rounded-xl bg-white focus-within:ring-2 focus-within:ring-[#4d41df]/25 transition-all">
                <input
                  id="org-name"
                  type="text"
                  value={eventConfig.organizer}
                  onChange={(e) => onUpdateConfig({ organizer: e.target.value })}
                  placeholder="e.g. Acme Technologies"
                  className="w-full bg-[#f4f3f8] text-[#1a1b1f] font-medium text-sm rounded-xl px-4 py-3 outline-none transition-colors focus:bg-white border border-transparent focus:border-[#4d41df]/30"
                />
              </div>
            </div>

            {/* Hashtags Input & Chips */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="hashtags-input" className="block text-xs font-semibold text-[#1a1b1f]">
                  Hashtags
                </label>
                <span className="text-[11px] text-[#777587]">Recommended for high impressions</span>
              </div>
              <div className="bg-[#f4f3f8] rounded-xl p-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#4d41df]/25 border border-transparent focus-within:border-[#4d41df]/30 transition-all">
                <div className="flex flex-wrap items-center gap-2">
                  {eventConfig.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 bg-[#e3dfff] text-[#3622ca] px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:bg-[#d0bcff]"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-[#ba1a1a] transition-colors leading-none cursor-pointer"
                        title="Remove tag"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center gap-1 flex-1 min-w-[120px]">
                    <input
                      id="hashtags-input"
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Add tag and press Enter..."
                      className="bg-transparent text-[#1a1b1f] text-xs outline-none px-2 py-1 w-full placeholder:text-[#777587]"
                    />
                    {newTagInput && (
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="p-1 rounded bg-[#4d41df] text-white hover:bg-[#3f34cf] cursor-pointer"
                        title="Add Tag"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Presence Subsection */}
          <div className="mt-8 pt-6 bg-[#f4f3f8]/50 -mx-6 md:-mx-8 px-6 md:px-8 rounded-b-2xl border-t border-[#efedf3]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
              <div>
                <h3 className="font-display text-base font-bold text-[#1a1b1f]">Social Presence</h3>
                <p className="text-xs text-[#464555]">Connect your event's verified profiles to inject credibility tags.</p>
              </div>
              <span className="text-[11px] text-[#006b2d] bg-white px-2.5 py-1 rounded-full self-start sm:self-auto font-semibold shadow-xs border border-[#e3e2e7]/80">
                3 Channels Verified
              </span>
            </div>

            <div className="space-y-3">
              {/* LinkedIn */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-xl shadow-xs border border-[#e3e2e7]/60">
                <div className="flex items-center gap-2.5 min-w-[140px] px-2 py-1">
                  <span className="w-8 h-8 rounded-lg bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center font-bold text-sm">
                    in
                  </span>
                  <span className="text-xs font-semibold text-[#1a1b1f]">LinkedIn</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={eventConfig.linkedinUrl}
                    onChange={(e) => onUpdateConfig({ linkedinUrl: e.target.value })}
                    className="w-full bg-[#f4f3f8]/60 text-[#1a1b1f] font-mono text-xs px-3.5 py-2 rounded-lg outline-none focus:bg-white border border-transparent focus:border-[#4d41df]/25"
                  />
                </div>
                <div className="flex items-center justify-end px-2">
                  <span className="inline-flex items-center gap-1 text-[#006b2d] text-xs font-semibold bg-[#6bff8f]/20 px-2.5 py-1 rounded-md">
                    <Check className="w-3.5 h-3.5" />
                    Connected
                  </span>
                </div>
              </div>

              {/* X / Twitter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-xl shadow-xs border border-[#e3e2e7]/60">
                <div className="flex items-center gap-2.5 min-w-[140px] px-2 py-1">
                  <span className="w-8 h-8 rounded-lg bg-[#efedf3] text-[#1a1b1f] flex items-center justify-center font-bold text-xs">
                    𝕏
                  </span>
                  <span className="text-xs font-semibold text-[#1a1b1f]">X / Twitter</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={eventConfig.twitterHandle}
                    onChange={(e) => onUpdateConfig({ twitterHandle: e.target.value })}
                    className="w-full bg-[#f4f3f8]/60 text-[#1a1b1f] font-mono text-xs px-3.5 py-2 rounded-lg outline-none focus:bg-white border border-transparent focus:border-[#4d41df]/25"
                  />
                </div>
                <div className="flex items-center justify-end px-2">
                  <span className="inline-flex items-center gap-1 text-[#006b2d] text-xs font-semibold bg-[#6bff8f]/20 px-2.5 py-1 rounded-md">
                    <Check className="w-3.5 h-3.5" />
                    Connected
                  </span>
                </div>
              </div>

              {/* Website / Event URL */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-xl shadow-xs border border-[#e3e2e7]/60">
                <div className="flex items-center gap-2.5 min-w-[140px] px-2 py-1">
                  <span className="w-8 h-8 rounded-lg bg-[#e9ddff] text-[#6b38d4] flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-semibold text-[#1a1b1f]">Event URL</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={eventConfig.eventUrl}
                    onChange={(e) => onUpdateConfig({ eventUrl: e.target.value })}
                    className="w-full bg-[#f4f3f8]/60 text-[#1a1b1f] font-mono text-xs px-3.5 py-2 rounded-lg outline-none focus:bg-white border border-transparent focus:border-[#4d41df]/25"
                  />
                </div>
                <div className="flex items-center justify-end px-2">
                  <span className="inline-flex items-center gap-1 text-[#006b2d] text-xs font-semibold bg-[#6bff8f]/20 px-2.5 py-1 rounded-md">
                    <Check className="w-3.5 h-3.5" />
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Prompt Synthesis Engine Preview (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Interactive Model Tuning Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e3e2e7]/80 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[#4d41df] uppercase tracking-wider font-bold">
                  AI PRESET ACTIVE
                </span>
                <Sparkles className="w-4 h-4 text-[#8455ef]" />
              </div>

              <h3 className="font-display text-lg font-bold text-[#1a1b1f]">Tone & Archetype</h3>
              <p className="text-xs text-[#464555]">Default generation voice applied to all attendee drafts.</p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#e3dfff]/30 border border-[#e3dfff] text-[#1a1b1f]">
                  <div className="flex items-center gap-2.5">
                    <Brain className="w-4 h-4 text-[#4d41df]" />
                    <span className="text-xs font-semibold">Thought Leadership</span>
                  </div>
                  <span className="text-[11px] text-[#4d41df] font-bold bg-white px-2 py-0.5 rounded-full border border-[#4d41df]/20">
                    Locked
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onUpdateConfig({ keynoteHighlightsEnabled: !eventConfig.keynoteHighlightsEnabled })}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#f4f3f8] hover:bg-[#efedf3] text-[#464555] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#6b38d4]" />
                    <span className="text-xs font-medium text-[#1a1b1f]">Keynote Highlights</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    eventConfig.keynoteHighlightsEnabled 
                      ? 'bg-[#6bff8f]/30 text-[#006b2d]' 
                      : 'bg-white text-[#777587]'
                  }`}>
                    {eventConfig.keynoteHighlightsEnabled ? 'Enabled' : 'Optional'}
                  </span>
                </button>
              </div>
            </div>

            {/* Subtle SVG Sparkline of Generation Trajectory */}
            <div className="mt-6 pt-4 bg-[#f4f3f8]/70 -mx-6 -mb-6 p-5 rounded-b-2xl border-t border-[#efedf3]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-xs text-[#464555] font-medium flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#4d41df]" />
                  Viral Cohesion Score
                </span>
                <span className="text-xs text-[#006b2d] font-bold">98.4%</span>
              </div>
              <svg className="w-full h-12 text-[#4d41df]" fill="none" viewBox="0 0 280 48">
                <path
                  d="M0 38C30 38 45 16 70 20C95 24 110 40 140 28C170 16 195 6 220 12C245 18 260 2 280 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
                <path
                  d="M0 38C30 38 45 16 70 20C95 24 110 40 140 28C170 16 195 6 220 12C245 18 260 2 280 4V48H0V38Z"
                  fill="currentColor"
                  fillOpacity="0.08"
                />
              </svg>
            </div>
          </div>

          {/* Host Visual Identity Preview Image Placeholder */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#e3e2e7]/80 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#464555] font-semibold">Hero Stage Backdrop</span>
              <span className="text-[11px] text-[#4d41df] font-semibold bg-[#e3dfff]/50 px-2 py-0.5 rounded-full">
                Synced
              </span>
            </div>
            <div className="relative h-44 rounded-xl overflow-hidden shadow-inner group">
              <img
                src={eventConfig.heroImage}
                alt="Conference auditorium stage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-between p-3.5">
                <span className="text-xs text-white font-medium">Main Stage • Hall A</span>
                <span className="text-[11px] text-white/90 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                  1080p Stage Asset
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Overview Section */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl font-bold text-[#1a1b1f]">Event Overview & Analytics</h2>
            <p className="text-xs text-[#464555]">Live metrics of LinkedIn posts generated by summit attendees.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#464555] bg-white px-3 py-1.5 rounded-xl border border-[#e3e2e7]/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006b2d] animate-pulse" />
            <span className="font-medium">Real-time telemetry</span>
          </div>
        </div>

        {/* Large Master Horizontal Event Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#e3e2e7]/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 hover:shadow-md transition-shadow">
          {/* Left: Event identity & pills */}
          <div className="flex items-start gap-4 min-w-[280px]">
            <div className="w-14 h-14 rounded-2xl bg-[#e3dfff] flex items-center justify-center text-[#4d41df] shrink-0 shadow-inner">
              <Brain className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-display text-lg font-bold text-[#1a1b1f] leading-tight">
                {eventConfig.name}
              </h3>
              <p className="text-xs text-[#464555] font-medium">{eventConfig.organizer}</p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {eventConfig.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#e3dfff]/60 text-[#3622ca] text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Middle: 4 Elegant Metric Stat Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 px-5 bg-[#f4f3f8]/80 rounded-xl flex-1 border border-[#efedf3]">
            <div className="space-y-0.5 text-center lg:text-left">
              <div className="font-display text-2xl font-bold text-[#1a1b1f] tracking-tight tabular-nums">
                {eventConfig.stats.postsGenerated}
              </div>
              <div className="text-[11px] text-[#777587] font-semibold uppercase tracking-wider">
                Posts Generated
              </div>
            </div>

            <div className="space-y-0.5 text-center lg:text-left">
              <div className="font-display text-2xl font-bold text-[#1a1b1f] tracking-tight tabular-nums">
                {eventConfig.stats.attendees}
              </div>
              <div className="text-[11px] text-[#777587] font-semibold uppercase tracking-wider">
                Attendees
              </div>
            </div>

            <div className="space-y-0.5 text-center lg:text-left">
              <div className="font-display text-2xl font-bold text-[#006b2d] tracking-tight tabular-nums">
                {eventConfig.stats.successRate}%
              </div>
              <div className="text-[11px] text-[#777587] font-semibold uppercase tracking-wider">
                Success Rate
              </div>
            </div>

            <div className="space-y-0.5 text-center lg:text-left">
              <div className="font-display text-2xl font-bold text-[#1a1b1f] tracking-tight tabular-nums">
                {eventConfig.stats.estimatedReach}
              </div>
              <div className="text-[11px] text-[#777587] font-semibold uppercase tracking-wider">
                Estimated Reach
              </div>
            </div>
          </div>

          {/* Right: Action Area & Share Link CTA */}
          <div className="flex flex-col items-stretch lg:items-end justify-center shrink-0 min-w-[240px]">
            <button
              type="button"
              onClick={handleCopyAttendeeLink}
              className="bg-white hover:bg-[#e3dfff]/30 border border-[#e3e2e7] text-[#4d41df] text-xs font-semibold px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-[#006b2d]" />
                  <span className="text-[#006b2d]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Attendee Link</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-[#777587] max-w-xs text-center lg:text-right mt-2">
              Share this link with attendees to let them generate their own LinkedIn post.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
