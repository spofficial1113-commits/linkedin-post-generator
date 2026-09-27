import { EventConfig, PostDraft, PostPhoto } from '../types';

export const INITIAL_EVENT_CONFIG: EventConfig = {
  id: 'ep-summit-2026',
  name: 'Future of AI Summit 2026',
  organizer: 'Acme Technologies',
  location: 'Moscone Convention Center, San Francisco',
  hashtags: ['#AI', '#Innovation', '#FutureOfWork'],
  linkedinUrl: 'linkedin.com/company/acme-technologies',
  twitterHandle: '@AcmeTech',
  eventUrl: 'https://futureofai2026.io',
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB44LXsgEntiSjqWGnZotA6v78qxBgMqviAr16OvghliilC0vSih0Cqq15-ZbTX8_t1MRUXRzxjC3aBmibwS-UfRCn5fjnSegL7HKUAsIJ6hHD9-gqtyU1-mcSyft97fRJ8OD7s6YWnDuxG1ruKx93RXiisz0Uk7pG2MAY1NDdyV02UpH5uN4sSyApa2M_KXI_cWjdM0IqLxhRzTUabVjHFy6523UhYdm2oQDw7Q6A5BeEKN9Yhmq57',
  stats: {
    postsGenerated: 128,
    attendees: 74,
    successRate: 92,
    estimatedReach: '3.8K'
  },
  toneArchetype: 'Thought Leadership',
  keynoteHighlightsEnabled: true,
  isPublished: true,
  lastSavedText: 'Auto-saved 2m ago'
};

export const INITIAL_PHOTOS: PostPhoto[] = [
  {
    id: 'photo-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZeRIMyfIfKgFJrTtHBYNuXp_kRHOxNVT_ItAyfVG4YO0By8p1Wghc5dANmZBmMJz5l_KqOIVUjZC7nBM_0ujgzcvjiaaiKNrpiGJ8UPsJBUHMPX_G6aNOGIf4E0MsUCl2izSvyCDZrqWTDN4BPMGuz6XU0W-u-llVEbmlyXdOoXFMhijXWENVGjZTQGFkZ8iaadRHonpkD0qOfAs57WRbkHC1khKucqNF0hhzsMiUOcnX5i2ZSghC',
    alt: 'Keynote presentation at Future of AI Summit 2026 with executive speaker on main stage',
    caption: 'Future of AI Summit 2026',
    progress: 100
  },
  {
    id: 'photo-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwvm3L_l6Kbh_jrCm3Xz_EMH2KeBkmiz0F7NwoTD2VCz0VM77sEurQ6E_h7XIfVvxbmCqOMFD3xY7Z-qWqHVVF1Q5naPradDQud_MF5eGcHN0mA1I67C5gc340KlPgL0k-7xUoGr25HHdSIyLlENJ9iy_REjEjPmFp0rdSTG_qfQL9fTDqMVCyxeH9o-cFGpr5oHnQiOMaQrxNfyO6ZQgYSulsEkS2tmzVyT4JVqH-uSAmIWeCuAnl',
    alt: 'Attendees networking over coffee in an airy convention center lobby',
    caption: 'Networking Lounge • Hall B',
    progress: 100
  }
];

export const GALLERY_PRESETS: PostPhoto[] = [
  {
    id: 'gallery-1',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaZLWVSo--AhjO-lVtye2UGLDPvBJiGKQcGxLRrHuvP8PfjvWIsfbUjhAR2_klQr6sOIdzr98VmqVMYoE4g3MNhpotqjE4vJK8mEQ2miOUNNWTT1mbhi3GypPubanLt5gtxFe0V0fKAVghnpVLKN5JT33_KOZ3xil60BTvrXPXEe2d1HLvB_WyRBMh_IzlsI2KBQh29yYrm_roSe4CDDoKZPqsHZSmQLpQMJCLZ-sPKVew92_qf-Jf',
    alt: 'High quality wide angle view of stage with violet neon lighting',
    caption: 'Grand Auditorium Keynote Stage',
    progress: 100
  },
  {
    id: 'gallery-2',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB44LXsgEntiSjqWGnZotA6v78qxBgMqviAr16OvghliilC0vSih0Cqq15-ZbTX8_t1MRUXRzxjC3aBmibwS-UfRCn5fjnSegL7HKUAsIJ6hHD9-gqtyU1-mcSyft97fRJ8OD7s6YWnDuxG1ruKx93RXiisz0Uk7pG2MAY1NDdyV02UpH5uN4sSyApa2M_KXI_cWjdM0IqLxhRzTUabVjHFy6523UhYdm2oQDw7Q6A5BeEKN9Yhmq57',
    alt: 'Main Stage Hall A keynote podium',
    caption: 'Main Stage • Hall A',
    progress: 100
  }
];

export const SARAH_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuArIJDqiIycYAvKaodkpcXb84zI3EigDhihgVvWL7xzCzSGA8lR1J_TfMoa0nj2KTwCghm0Gi_I5zNirf_7pB_Cifu6UJCamSi-P89tn7bhtcd5jNJIhXxjI1vVqT8FYKTfeiCQSjScbQHzIcLiJpDsIZM-BdVGr71y0g2ASe1qJlke_J8rxyRDnGAIfIL4QVYr423-WKQLnMomUfvZJy8vKk04f-MQ2-FZgvbl9gaiy1ocahSctcxP';

export const INITIAL_POST_DRAFT: PostDraft = {
  authorName: 'Sarah Johnson',
  authorTitle: 'Product Designer • Attendee',
  authorAvatar: SARAH_AVATAR,
  photos: INITIAL_PHOTOS,
  selectedPhotoId: 'photo-1',
  highlights: 'Amazing panel on agentic AI workflows and enterprise reliability. Loved the discussions around human-in-the-loop system design and how teams are scaling AI responsibly. Great catching up with so many founders and product leaders!',
  tone: 'grateful',
  audienceTuning: {
    includeHashtags: true,
    hashtagCount: 3,
    tagHost: true,
    mentionSpeakers: true,
    includeTakeawaysArrow: true
  },
  postContent: `Just wrapped up an incredible day at the Future of AI Summit 2026.

From practical AI workflows to thoughtful conversations around the future of work, there were so many insights worth taking back to the team.

A few takeaways that stood out to me:
→ AI is becoming a collaboration layer, not just a productivity tool.
→ The best implementations start with real user problems.
→ Responsible innovation needs to stay at the center of the conversation.

Grateful to the team at @Acme Technologies for bringing together such an inspiring community.

#AI #Innovation #FutureOfWork`,
  reactions: {
    likes: 84,
    hasLiked: false,
    comments: 18,
    reposts: 6
  }
};

export const TONE_TEMPLATES = {
  grateful: (eventName: string, host: string, takeaways: string, hashtags: string[]) => 
`Just wrapped up an incredible day at the ${eventName}.

From practical AI workflows to thoughtful conversations around the future of work, there were so many insights worth taking back to the team.

A few takeaways that stood out to me:
→ AI is becoming a collaboration layer, not just a productivity tool.
→ The best implementations start with real user problems.
→ Responsible innovation needs to stay at the center of the conversation.

Grateful to the team at @${host} for bringing together such an inspiring community.

${hashtags.join(' ')}`,

  professional: (eventName: string, host: string, takeaways: string, hashtags: string[]) => 
`Key executive observations from today's sessions at the ${eventName}:

As enterprise teams move from experimentation to scaled multi-agent production, architectural reliability and human-in-the-loop validation are emerging as decisive differentiators.

Key operational highlights:
→ Architectural resilience is prioritized over raw inference speed.
→ Real value creation occurs where domain datasets meet agentic orchestration.
→ Cross-functional alignment between engineering and product is critical.

Commendable execution by @${host} on curating high-signal dialogues.

${hashtags.join(' ')}`,

  takeaways: (eventName: string, host: string, takeaways: string, hashtags: string[]) => 
`3 practical lessons from attending the ${eventName}:

1. Context windows are commoditized — intelligent grounding is where true moat lives.
2. The teams succeeding fastest aren't waiting for perfection; they are instrumenting fast feedback loops with end-users.
3. System observability is non-negotiable for enterprise deployment.

Notes from: ${takeaways.slice(0, 120)}...

Kudos to @${host} for orchestrating an impactful agenda.

${hashtags.join(' ')}`,

  visionary: (eventName: string, host: string, takeaways: string, hashtags: string[]) => 
`Standing in the hall at ${eventName}, one thing is unmistakable:

We are witnessing the foundational transition from reactive software to proactive, autonomous partner systems. The next decade of productivity will look fundamentally different from the last.

What excites me most:
→ Bridging the gap between frontier models and intuitive everyday workflows.
→ Empowering every specialist with bespoke intelligence amplifications.

Thank you @${host} for shaping this frontier.

${hashtags.join(' ')}`
};
