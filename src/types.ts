export type ViewMode = 'organizer' | 'attendee';

export type ToneType = 'professional' | 'grateful' | 'takeaways' | 'visionary';

export interface EventConfig {
  id: string;
  name: string;
  organizer: string;
  location: string;
  hashtags: string[];
  linkedinUrl: string;
  twitterHandle: string;
  eventUrl: string;
  heroImage: string;
  stats: {
    postsGenerated: number;
    attendees: number;
    successRate: number;
    estimatedReach: string;
  };
  toneArchetype: string;
  keynoteHighlightsEnabled: boolean;
  isPublished: boolean;
  lastSavedText: string;
}

export interface PostPhoto {
  id: string;
  url: string;
  alt: string;
  caption: string;
  progress: number;
}

export interface AudienceTuning {
  includeHashtags: boolean;
  hashtagCount: number;
  tagHost: boolean;
  mentionSpeakers: boolean;
  includeTakeawaysArrow: boolean;
}

export interface PostDraft {
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  photos: PostPhoto[];
  selectedPhotoId: string;
  highlights: string;
  tone: ToneType;
  audienceTuning: AudienceTuning;
  postContent: string;
  reactions: {
    likes: number;
    hasLiked: boolean;
    comments: number;
    reposts: number;
  };
}
