import React, { useState, useRef, useEffect } from 'react';
import { EventConfig, PostDraft, PostPhoto, ToneType } from '../types';
import { GALLERY_PRESETS, TONE_TEMPLATES } from '../data/mockData';
import { MobileDeviceFrame } from './MobileDeviceFrame';
import { ShareModal } from './ShareModal';
import { 
  Sparkles, 
  Upload, 
  Mic, 
  MicOff, 
  Check, 
  X, 
  Smile, 
  Quote, 
  ChevronDown, 
  ChevronRight, 
  RotateCw, 
  Copy, 
  ExternalLink, 
  ThumbsUp, 
  Heart, 
  MessageSquare, 
  Repeat, 
  Send, 
  Monitor, 
  Smartphone, 
  MoreHorizontal, 
  Globe, 
  Camera, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  MessageCircle, 
  Tag, 
  Plus
} from 'lucide-react';

interface AttendeeViewProps {
  eventConfig: EventConfig;
  draft: PostDraft;
  onUpdateDraft: (updated: Partial<PostDraft>) => void;
}

export const AttendeeView: React.FC<AttendeeViewProps> = ({
  eventConfig,
  draft,
  onUpdateDraft,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [audienceTuningOpen, setAudienceTuningOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCommentsPreview, setShowCommentsPreview] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      author: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      title: 'VP of Engineering @ Nexa',
      text: 'Completely agree on responsible innovation being the core design constraint. Great summary Sarah!',
      time: '45m ago'
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice recording simulation timer
  useEffect(() => {
    let interval: any;
    if (isVoiceRecording) {
      interval = setInterval(() => {
        setVoiceSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isVoiceRecording]);

  // Voice note toggle
  const handleToggleVoiceNote = () => {
    if (!isVoiceRecording) {
      setIsVoiceRecording(true);
      // Simulate live speech recognition by injecting sample speech after 3 seconds
      setTimeout(() => {
        setIsVoiceRecording(false);
        const speechSnippet = ' Dr. Elias Vance stressed that the next leap is reliable reasoning engines and seamless agent coordination.';
        onUpdateDraft({
          highlights: draft.highlights + speechSnippet
        });
      }, 3500);
    } else {
      setIsVoiceRecording(false);
    }
  };

  // Tone changer
  const handleSelectTone = (tone: ToneType) => {
    onUpdateDraft({ tone });
    regenerateContent(tone, draft.highlights);
  };

  // Content generator
  const regenerateContent = (tone: ToneType = draft.tone, highlights: string = draft.highlights) => {
    setIsGenerating(true);
    setTimeout(() => {
      let content = '';
      if (tone === 'grateful') {
        content = TONE_TEMPLATES.grateful(eventConfig.name, eventConfig.organizer, highlights, eventConfig.hashtags);
      } else if (tone === 'professional') {
        content = TONE_TEMPLATES.professional(eventConfig.name, eventConfig.organizer, highlights, eventConfig.hashtags);
      } else if (tone === 'takeaways') {
        content = TONE_TEMPLATES.takeaways(eventConfig.name, eventConfig.organizer, highlights, eventConfig.hashtags);
      } else {
        content = TONE_TEMPLATES.visionary(eventConfig.name, eventConfig.organizer, highlights, eventConfig.hashtags);
      }
      onUpdateDraft({ postContent: content });
      setIsGenerating(false);
    }, 450);
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newPhoto: PostPhoto = {
        id: `photo-${Date.now()}`,
        url: dataUrl,
        alt: file.name,
        caption: 'User Uploaded Event Photo',
        progress: 100
      };
      onUpdateDraft({
        photos: [newPhoto, ...draft.photos],
        selectedPhotoId: newPhoto.id
      });
    };
    reader.readAsDataURL(file);
  };

  // Remove photo
  const handleRemovePhoto = (photoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = draft.photos.filter((p) => p.id !== photoId);
    onUpdateDraft({
      photos: remaining,
      selectedPhotoId: remaining.length > 0 ? remaining[0].id : ''
    });
  };

  // Quick Emoji Insert
  const handleInsertEmoji = (emoji: string) => {
    onUpdateDraft({
      highlights: draft.highlights + ' ' + emoji
    });
    setShowEmojiPicker(false);
  };

  // Quick Quote Insert
  const handleInsertQuote = () => {
    onUpdateDraft({
      highlights: draft.highlights + ' "The future belongs to proactive intelligence." '
    });
  };

  // Copy to clipboard
  const handleCopyPost = () => {
    navigator.clipboard?.writeText(draft.postContent);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  // Like reaction toggle
  const handleToggleLike = () => {
    const isLiked = draft.reactions.hasLiked;
    onUpdateDraft({
      reactions: {
        ...draft.reactions,
        likes: isLiked ? draft.reactions.likes - 1 : draft.reactions.likes + 1,
        hasLiked: !isLiked
      }
    });
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setCommentsList([
      ...commentsList,
      {
        id: Date.now(),
        author: 'You',
        avatar: draft.authorAvatar,
        title: draft.authorTitle,
        text: commentInput,
        time: 'Just now'
      }
    ]);
    setCommentInput('');
    onUpdateDraft({
      reactions: {
        ...draft.reactions,
        comments: draft.reactions.comments + 1
      }
    });
  };

  // AI Polish: Make punchier
  const handleMakePunchier = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const punchy = `Future of AI Summit 2026: 3 High-Signal Takeaways ⚡

1. Workflows > Models: Raw intelligence is commoditized; orchestration is the real moat.
2. Humans-in-the-Loop: Not a safety brake, but a core architectural multiplier.
3. Speed to Deployment: Ship fast, observe telemetry, iterate continuously.

Massive credit to @${eventConfig.organizer} for cutting through the hype.

${eventConfig.hashtags.join(' ')}`;
      onUpdateDraft({ postContent: punchy });
      setIsGenerating(false);
    }, 400);
  };

  // AI Polish: Add Founder POV
  const handleAddFounderPOV = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const founder = `Building in public at the ${eventConfig.name}:

Every platform shift presents a brief window where convention breaks and new category leaders emerge. Today at Moscone, that inflection point felt undeniable.

Strategic convictions from our conversations:
→ Don't just automate tasks; redesign the fundamental customer outcome.
→ Build deep integration moats where AI context compounds over time.
→ Culture matters: teams that embrace agentic tooling move 5x faster.

Inspiring to see @${eventConfig.organizer} convening founders who build with substance.

${eventConfig.hashtags.join(' ')}`;
      onUpdateDraft({ postContent: founder });
      setIsGenerating(false);
    }, 400);
  };

  // AI Polish: Trending tags
  const handleAddTrendingTags = () => {
    const extraTags = ['#AgenticAI', '#GenAI', '#Summit26'];
    const currentText = draft.postContent;
    const combined = currentText.includes('#AgenticAI') 
      ? currentText 
      : `${currentText}\n\n${extraTags.join(' ')}`;
    onUpdateDraft({ postContent: combined });
  };

  const selectedPhoto = draft.photos.find((p) => p.id === draft.selectedPhotoId) || draft.photos[0];

  // Helper to format post with clickable-looking tags and mentions
  const renderFormattedPostContent = (text: string) => {
    return text.split('\n\n').map((paragraph, pIdx) => {
      if (paragraph.startsWith('→') || paragraph.includes('\n→') || paragraph.includes('\n1.')) {
        const lines = paragraph.split('\n');
        return (
          <div key={pIdx} className="space-y-1.5 my-2">
            {lines.map((line, lIdx) => {
              if (line.startsWith('→')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2">
                    <span className="text-[#4d41df] font-bold">→</span>
                    <span>{line.replace(/^→\s*/, '')}</span>
                  </div>
                );
              }
              return <p key={lIdx} className="font-semibold text-[#1a1b1f]">{line}</p>;
            })}
          </div>
        );
      }

      // Check if it's the hashtag row
      if (paragraph.includes('#')) {
        const words = paragraph.split(' ');
        return (
          <p key={pIdx} className="text-[#4d41df] font-semibold flex flex-wrap gap-1.5 pt-1">
            {words.map((word, wIdx) => {
              if (word.startsWith('#')) {
                return (
                  <span key={wIdx} className="hover:underline cursor-pointer">
                    {word}
                  </span>
                );
              }
              return <span key={wIdx}>{word}</span>;
            })}
          </p>
        );
      }

      // Standard paragraph with possible @mentions
      const parts = paragraph.split(/(@[\w\s]+)/g);
      return (
        <p key={pIdx} className="leading-relaxed">
          {parts.map((part, partIdx) => {
            if (part.startsWith('@')) {
              return (
                <span key={partIdx} className="text-[#4d41df] font-medium hover:underline cursor-pointer">
                  {part}
                </span>
              );
            }
            if (part.includes(eventConfig.name)) {
              return (
                <span key={partIdx}>
                  <strong className="text-[#1a1b1f] font-semibold">{part}</strong>
                </span>
              );
            }
            return <span key={partIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  // Render Post Card content
  const renderLinkedInCard = (isMobileView = false) => (
    <div className={`bg-white rounded-2xl ${isMobileView ? 'p-4' : 'p-6'} shadow-md border border-[#e3e2e7]/80 transition-shadow`}>
      {/* Author Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={draft.authorAvatar}
              alt={draft.authorName}
              className={`${isMobileView ? 'w-10 h-10' : 'w-12 h-12'} rounded-full object-cover shadow-xs border border-[#e3e2e7]`}
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-xs">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00873b]" />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-[#1a1b1f] truncate">
                {draft.authorName}
              </span>
              <span className="text-xs text-[#777587] font-normal">• 1st</span>
            </div>
            <span className="text-xs text-[#777587] truncate">{draft.authorTitle}</span>
            <span className="text-[11px] text-[#777587] flex items-center gap-1 mt-0.5">
              2h • <Globe className="w-3 h-3 text-[#777587]" />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#777587]">
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-[#efedf3] hover:text-[#1a1b1f] transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Body Content */}
      <div 
        className={`mt-4 text-xs md:text-sm text-[#1a1b1f] space-y-3 leading-relaxed transition-all duration-300 ${
          isGenerating ? 'opacity-40 blur-[1px]' : 'opacity-100'
        }`}
      >
        {renderFormattedPostContent(draft.postContent)}
      </div>

      {/* Attached Media Photo Showcase */}
      {selectedPhoto && (
        <div className="mt-4 rounded-xl overflow-hidden bg-[#efedf3] shadow-inner relative border border-[#e3e2e7]/80">
          <div className={`relative w-full ${isMobileView ? 'h-52' : 'h-64 md:h-72'}`}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="w-full h-full object-cover"
            />
            {/* Watermark badge on photo */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-[#1a1b1f] text-xs font-semibold shadow-sm">
              <Camera className="w-3.5 h-3.5 text-[#4d41df]" />
              <span>{eventConfig.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Engagement Counts Row */}
      <div className="mt-4 pt-3 pb-2 flex items-center justify-between text-[#777587] text-xs border-b border-[#efedf3]">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#4d41df] text-white">
            <ThumbsUp className="w-3 h-3" />
          </span>
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ba1a1a] text-white -ml-2">
            <Heart className="w-3 h-3" />
          </span>
          <span className="ml-1 text-[#1a1b1f] font-semibold tabular-nums">
            {draft.reactions.likes}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>{draft.reactions.comments} comments</span>
          <span>•</span>
          <span>{draft.reactions.reposts} reposts</span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="mt-1 pt-1 grid grid-cols-4 gap-1 bg-[#f4f3f8]/50 rounded-xl p-1">
        <button
          type="button"
          onClick={handleToggleLike}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            draft.reactions.hasLiked 
              ? 'text-[#4d41df] bg-[#e3dfff]/40' 
              : 'text-[#464555] hover:bg-[#efedf3] hover:text-[#1a1b1f]'
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${draft.reactions.hasLiked ? 'fill-current' : ''}`} />
          <span className="hidden sm:inline">Like</span>
        </button>

        <button
          type="button"
          onClick={() => setShowCommentsPreview(!showCommentsPreview)}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#464555] hover:bg-[#efedf3] hover:text-[#1a1b1f] transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Comment</span>
        </button>

        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#464555] hover:bg-[#efedf3] hover:text-[#1a1b1f] transition-colors cursor-pointer"
        >
          <Repeat className="w-4 h-4" />
          <span className="hidden sm:inline">Repost</span>
        </button>

        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#464555] hover:bg-[#efedf3] hover:text-[#1a1b1f] transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </div>

      {/* Optional In-Card Comments Panel */}
      {showCommentsPreview && (
        <div className="mt-4 pt-3 border-t border-[#efedf3] space-y-3">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add an attendee thought..."
              className="flex-1 bg-[#f4f3f8] text-xs px-3 py-2 rounded-xl outline-none border border-transparent focus:border-[#4d41df]/30 text-[#1a1b1f]"
            />
            <button
              type="submit"
              className="bg-[#4d41df] text-white text-xs px-3 py-1.5 rounded-xl font-medium hover:bg-[#3f34cf]"
            >
              Post
            </button>
          </form>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {commentsList.map((c) => (
              <div key={c.id} className="bg-[#f4f3f8] p-2.5 rounded-xl text-xs">
                <div className="flex items-center justify-between font-semibold text-[#1a1b1f]">
                  <span>{c.author}</span>
                  <span className="text-[10px] text-[#777587]">{c.time}</span>
                </div>
                <p className="text-[#464555] mt-1">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Secondary Toolbar: Bottom Controls */}
      <div className="mt-6 pt-4 flex flex-wrap items-center gap-3 bg-[#f4f3f8] p-3.5 rounded-xl border border-[#efedf3]">
        {/* Regenerate Button */}
        <button
          type="button"
          onClick={() => regenerateContent()}
          disabled={isGenerating}
          className="bg-white text-[#1a1b1f] hover:bg-[#efedf3] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs border border-[#e3e2e7] cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 text-[#464555] ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Regenerate</span>
        </button>

        {/* Copy Post Button */}
        <button
          type="button"
          onClick={handleCopyPost}
          className="bg-[#e3dfff] text-[#3622ca] hover:bg-[#d0bcff] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          {copiedSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#006b2d]" />
              <span className="text-[#006b2d]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Post</span>
            </>
          )}
        </button>

        {/* Export / Open LinkedIn Button */}
        <button
          type="button"
          onClick={() => setShowShareModal(true)}
          className="ml-auto bg-[#4d41df] hover:bg-[#3f34cf] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
        >
          <span>Open in LinkedIn</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 animate-in fade-in duration-200">
      {/* Top Section: Event Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#15161a] p-6 md:p-8 text-white mb-8 shadow-xl border border-white/10">
        {/* Ambient Radial Accent Light */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#4d41df]/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-[#8455ef]/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#675df9]/20 text-[#c4c0ff] border border-[#675df9]/30 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#c4c0ff]" />
              <span>EventPulse AI Content Studio</span>
            </div>

            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              {eventConfig.name}
            </h1>

            <p className="text-xs md:text-sm text-[#dad9df] mt-1.5 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#c4c0ff] shrink-0" />
              <span>Hosted by {eventConfig.organizer} • {eventConfig.location}</span>
            </p>

            {/* Social Tags Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {eventConfig.hashtags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (!draft.highlights.includes(tag)) {
                      onUpdateDraft({ highlights: `${draft.highlights} ${tag}` });
                    }
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md transition-colors cursor-pointer"
                  title="Click to insert into takeaways"
                >
                  {tag}
                </button>
              ))}
              <span className="text-xs text-[#dad9df] ml-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#4ae176]" />
                Official Event Campaign
              </span>
            </div>
          </div>

          {/* Banner Live Stats Badge */}
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 shrink-0">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#675df9] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#15161a]">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-[#6b38d4] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#15161a]">
                AL
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00873b] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#15161a]">
                SR
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white font-bold">1,420+ Posts Generated</span>
              <span className="font-mono text-[11px] text-[#dad9df]">Attendee Reach: 890k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form (approx 42% -> col-span-5) */}
        <section className="lg:col-span-5 flex flex-col bg-white p-6 md:p-7 rounded-2xl shadow-sm border border-[#e3e2e7]/80">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-[#1a1b1f] tracking-tight">
                Create your post
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#f4f3f8] text-[#464555] border border-[#e3e2e7]/60">
                Step 1 of 2
              </span>
            </div>
            <p className="text-xs text-[#464555] mt-1">
              Add your experience and we'll turn it into a polished LinkedIn post.
            </p>
          </div>

          {/* Photo Upload Area */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-[#1a1b1f]">Event Photos</label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#777587]">
                  {draft.photos.length} added
                </span>
                <button
                  type="button"
                  onClick={() => {
                    // Quick add gallery presets
                    const remainingPresets = GALLERY_PRESETS.filter(
                      gp => !draft.photos.some(p => p.id === gp.id)
                    );
                    if (remainingPresets.length > 0) {
                      onUpdateDraft({
                        photos: [...draft.photos, remainingPresets[0]],
                        selectedPhotoId: remainingPresets[0].id
                      });
                    }
                  }}
                  className="text-[11px] text-[#4d41df] font-semibold hover:underline flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Add Preset
                </button>
              </div>
            </div>

            {/* Drop Zone Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative rounded-2xl p-6 text-center bg-[#f4f3f8] hover:bg-[#efedf3] border-2 border-dashed border-[#c7c4d8]/60 hover:border-[#4d41df]/60 transition-all cursor-pointer shadow-xs"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-[#e3dfff] flex items-center justify-center text-[#4d41df] group-hover:scale-105 transition-transform mb-2.5">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-[#1a1b1f]">Drop event photos here</p>
                <p className="text-xs text-[#4d41df] font-semibold mt-0.5">or click to browse</p>
                <span className="text-[11px] text-[#777587] mt-1">PNG, JPG up to 10MB</span>
              </div>
            </div>

            {/* Uploaded Thumbnails Preview Grid */}
            {draft.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                {draft.photos.map((photo) => {
                  const isSelected = photo.id === draft.selectedPhotoId;
                  return (
                    <div
                      key={photo.id}
                      onClick={() => onUpdateDraft({ selectedPhotoId: photo.id })}
                      className={`relative rounded-xl overflow-hidden bg-[#efedf3] group shadow-xs cursor-pointer border-2 transition-all ${
                        isSelected ? 'border-[#4d41df] ring-2 ring-[#4d41df]/25' : 'border-transparent hover:border-[#c7c4d8]'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.alt}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-2">
                        <button
                          type="button"
                          onClick={(e) => handleRemovePhoto(photo.id, e)}
                          aria-label="Remove photo"
                          className="self-end w-6 h-6 rounded-full bg-white/80 text-[#1a1b1f] hover:bg-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full w-fit">
                          <CheckCircle2 className="w-3 h-3 text-[#006b2d]" />
                          <span className="text-[10px] text-[#006b2d] font-bold">Uploaded 100%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Key Highlights / Takeaways Textarea */}
          <div className="mt-6 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="takeaways-input" className="text-xs font-semibold text-[#1a1b1f]">
                Key Highlights / Takeaways
              </label>

              {/* Voice note button */}
              <button
                type="button"
                onClick={handleToggleVoiceNote}
                className={`text-xs flex items-center gap-1 font-semibold transition-all cursor-pointer px-2 py-0.5 rounded-lg ${
                  isVoiceRecording 
                    ? 'text-white bg-[#ba1a1a] animate-pulse' 
                    : 'text-[#4d41df] hover:bg-[#e3dfff]/40'
                }`}
              >
                {isVoiceRecording ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Listening... ({voiceSeconds}s)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Voice note</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative bg-[#f4f3f8] rounded-xl p-3 shadow-inner border border-transparent focus-within:border-[#4d41df]/30 focus-within:bg-white transition-all">
              <textarea
                id="takeaways-input"
                value={draft.highlights}
                onChange={(e) => {
                  onUpdateDraft({ highlights: e.target.value });
                }}
                rows={5}
                placeholder="What stood out to you? Keynote announcements, breakout insights, or personal reflections..."
                className="w-full bg-transparent text-xs md:text-sm text-[#1a1b1f] placeholder:text-[#777587] focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e3e2e7]/60 text-[#777587]">
                <div className="flex items-center gap-2 relative">
                  {/* Emoji Button */}
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="p-1 rounded hover:bg-[#e3e2e7] text-[#464555] transition-colors cursor-pointer"
                    title="Add emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>

                  {/* Emoji Quick Tray Popover */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-8 left-0 bg-white p-2 rounded-xl shadow-lg border border-[#e3e2e7] flex items-center gap-1 z-20">
                      {['✨', '🚀', '💡', '👏', '🎯', '🔥', '🤝', '🧠'].map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleInsertEmoji(emoji)}
                          className="hover:scale-125 transition-transform p-1 text-sm"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Quote Inserter */}
                  <button
                    type="button"
                    onClick={handleInsertQuote}
                    className="p-1 rounded hover:bg-[#e3e2e7] text-[#464555] transition-colors cursor-pointer"
                    title="Insert quote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                </div>

                {/* Character Count */}
                <span className="font-mono text-[11px] text-[#777587] tabular-nums">
                  {draft.highlights.length} / 1,000 characters
                </span>
              </div>
            </div>
          </div>

          {/* Tone Selection */}
          <div className="mt-6">
            <label className="text-xs font-semibold text-[#1a1b1f] mb-2.5 block">
              Choose your tone
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Professional */}
              <button
                type="button"
                onClick={() => handleSelectTone('professional')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  draft.tone === 'professional'
                    ? 'bg-[#4d41df] text-white shadow-sm ring-2 ring-[#4d41df]/25'
                    : 'bg-[#f4f3f8] text-[#1a1b1f] hover:bg-[#efedf3]'
                }`}
              >
                {draft.tone === 'professional' && <Check className="w-3.5 h-3.5" />}
                <span>Professional</span>
              </button>

              {/* Grateful (Default active in reference) */}
              <button
                type="button"
                onClick={() => handleSelectTone('grateful')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  draft.tone === 'grateful'
                    ? 'bg-[#4d41df] text-white shadow-sm ring-2 ring-[#4d41df]/25'
                    : 'bg-[#f4f3f8] text-[#1a1b1f] hover:bg-[#efedf3]'
                }`}
              >
                {draft.tone === 'grateful' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Heart className="w-3 h-3 text-[#ba1a1a]" />
                )}
                <span>Grateful</span>
              </button>

              {/* Takeaways */}
              <button
                type="button"
                onClick={() => handleSelectTone('takeaways')}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  draft.tone === 'takeaways'
                    ? 'bg-[#4d41df] text-white shadow-sm ring-2 ring-[#4d41df]/25'
                    : 'bg-[#f4f3f8] text-[#1a1b1f] hover:bg-[#efedf3]'
                }`}
              >
                {draft.tone === 'takeaways' && <Check className="w-3.5 h-3.5" />}
                <span>Takeaways</span>
              </button>
            </div>
          </div>

          {/* Audience Tuning Accordion */}
          <div className="mt-5 rounded-xl bg-[#f4f3f8] overflow-hidden border border-[#e3e2e7]/50">
            <button
              type="button"
              onClick={() => setAudienceTuningOpen(!audienceTuningOpen)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#efedf3] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#4d41df]" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1a1b1f]">Audience Tuning</span>
                  <span className="text-[11px] text-[#777587]">
                    Include {eventConfig.hashtags.length} hashtags • Tag host automatically
                  </span>
                </div>
              </div>
              {audienceTuningOpen ? (
                <ChevronDown className="w-4 h-4 text-[#777587]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#777587]" />
              )}
            </button>

            {audienceTuningOpen && (
              <div className="p-3.5 pt-0 space-y-2.5 border-t border-[#e3e2e7]/60 text-xs">
                <label className="flex items-center justify-between py-1 cursor-pointer">
                  <span className="text-[#464555]">Include official summit hashtags</span>
                  <input
                    type="checkbox"
                    checked={draft.audienceTuning.includeHashtags}
                    onChange={(e) => {
                      onUpdateDraft({
                        audienceTuning: {
                          ...draft.audienceTuning,
                          includeHashtags: e.target.checked
                        }
                      });
                    }}
                    className="w-4 h-4 rounded text-[#4d41df] focus:ring-[#4d41df]"
                  />
                </label>

                <label className="flex items-center justify-between py-1 cursor-pointer">
                  <span className="text-[#464555]">Tag @{eventConfig.organizer} in acknowledgment</span>
                  <input
                    type="checkbox"
                    checked={draft.audienceTuning.tagHost}
                    onChange={(e) => {
                      onUpdateDraft({
                        audienceTuning: {
                          ...draft.audienceTuning,
                          tagHost: e.target.checked
                        }
                      });
                    }}
                    className="w-4 h-4 rounded text-[#4d41df] focus:ring-[#4d41df]"
                  />
                </label>

                <label className="flex items-center justify-between py-1 cursor-pointer">
                  <span className="text-[#464555]">Format bullets with executive arrows (→)</span>
                  <input
                    type="checkbox"
                    checked={draft.audienceTuning.includeTakeawaysArrow}
                    onChange={(e) => {
                      onUpdateDraft({
                        audienceTuning: {
                          ...draft.audienceTuning,
                          includeTakeawaysArrow: e.target.checked
                        }
                      });
                    }}
                    className="w-4 h-4 rounded text-[#4d41df] focus:ring-[#4d41df]"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => regenerateContent()}
            disabled={isGenerating}
            className="mt-6 w-full bg-gradient-to-r from-[#4d41df] to-[#8455ef] hover:opacity-95 text-white text-sm font-semibold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99] disabled:opacity-70"
          >
            <Sparkles className={`w-4 h-4 transition-transform group-hover:rotate-12 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing LinkedIn Post...' : 'Generate LinkedIn Post'}</span>
          </button>
        </section>

        {/* Right Column: Live Preview (approx 58% -> col-span-7) */}
        <section className="lg:col-span-7 flex flex-col">
          {/* Live Preview Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <h2 className="font-display text-lg font-bold text-[#1a1b1f]">
                Live Preview
              </h2>
              <span className="text-[11px] text-[#006b2d] bg-[#006b2d]/10 px-2.5 py-0.5 rounded-full font-semibold inline-flex items-center gap-1.5 border border-[#006b2d]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006b2d] animate-pulse" />
                AI generated preview
              </span>
            </div>

            {/* View toggles: Mobile / Desktop mock */}
            <div className="flex items-center bg-[#efedf3] p-1 rounded-xl border border-[#e3e2e7]/80">
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                aria-label="Desktop preview"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  deviceMode === 'desktop'
                    ? 'bg-white text-[#4d41df] shadow-xs'
                    : 'text-[#464555] hover:text-[#1a1b1f]'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                aria-label="Mobile preview"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  deviceMode === 'mobile'
                    ? 'bg-white text-[#4d41df] shadow-xs'
                    : 'text-[#464555] hover:text-[#1a1b1f]'
                }`}
                title="Mobile Smartphone View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card or Mobile Frame Wrapper */}
          {deviceMode === 'desktop' ? (
            renderLinkedInCard(false)
          ) : (
            <MobileDeviceFrame>
              {renderLinkedInCard(true)}
            </MobileDeviceFrame>
          )}

          {/* Quick AI Polish Cards / Suggestions */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={handleMakePunchier}
              className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e3e2e7]/80 flex flex-col justify-between hover:shadow-md hover:border-[#4d41df]/40 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[#4d41df]" />
                <span className="text-xs font-bold text-[#1a1b1f]">Make punchier</span>
              </div>
              <p className="text-[11px] text-[#464555]">Compress into concise bullet highlights.</p>
            </div>

            <div
              onClick={handleAddFounderPOV}
              className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e3e2e7]/80 flex flex-col justify-between hover:shadow-md hover:border-[#6b38d4]/40 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-[#6b38d4]" />
                <span className="text-xs font-bold text-[#1a1b1f]">Add Founder POV</span>
              </div>
              <p className="text-[11px] text-[#464555]">Emphasize leadership and strategy angles.</p>
            </div>

            <div
              onClick={handleAddTrendingTags}
              className="bg-white p-3.5 rounded-xl shadow-xs border border-[#e3e2e7]/80 flex flex-col justify-between hover:shadow-md hover:border-[#006b2d]/40 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 mb-1">
                <Tag className="w-4 h-4 text-[#006b2d]" />
                <span className="text-xs font-bold text-[#1a1b1f]">Trending tags</span>
              </div>
              <p className="text-[11px] text-[#464555]">Append #AgenticAI, #GenAI, #Summit26.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Share / Publish Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        draft={draft}
        eventConfig={eventConfig}
      />
    </div>
  );
};
