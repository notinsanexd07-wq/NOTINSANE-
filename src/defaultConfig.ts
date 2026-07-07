import { SiteConfig } from './types';
// @ts-ignore
import artistAvatar from './assets/images/artist_avatar_1783362443457.jpg';

export const DEFAULT_CONFIG: SiteConfig = {
  theme: {
    primaryColor: '#a855f7', // Purple-500
    secondaryColor: '#6366f1', // Indigo-500
    bgGradientStart: '#0a0a0c',
    bgGradientEnd: '#020204',
    glowColor: '#a855f7',
    fontFamily: 'Inter',
    darkTheme: true,
    particlesEnabled: true,
    movingLinesEnabled: true,
    gridEnabled: false,
    glowingOrbsEnabled: true,
    starsEnabled: false,
    shootingStarsEnabled: true
  },
  hero: {
    avatarUrl: artistAvatar,
    title: 'NOT INSANE',
    subtitle: 'CREATIVE ARTIST',
    statusText: 'FIRENOX TERRITORY LEADER • 300+ MEMBERS',
    showScrollHint: true
  },
  thumbnails: [
    { id: 't1', title: 'VALORANT MONTAGES', category: 'FPS GAMING', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=640&auto=format&fit=crop' },
    { id: 't2', title: '3D TRANSFORMATION', category: 'CREATIVE BRAND', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640&auto=format&fit=crop' },
    { id: 't3', title: 'MINECRAFT HARDCORE', category: 'CHALLENGE', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=640&auto=format&fit=crop' },
    { id: 't4', title: 'FUTURE DESKSETUP', category: 'TECH REVIEWS', img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=640&auto=format&fit=crop' }
  ],
  logos: [
    { id: 'l1', title: 'FIRENOX ESPORTS', category: 'GUILD BRAND', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=640&auto=format&fit=crop' },
    { id: 'l2', title: 'OMEGA SYNDICATE', category: 'CREATOR CLAN', img: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=640&auto=format&fit=crop' },
    { id: 'l3', title: 'NEXUS CYBERNETICS', category: 'TECH BRAND', img: 'https://images.unsplash.com/photo-1618005198143-d3667784347c?q=80&w=640&auto=format&fit=crop' },
    { id: 'l4', title: 'VORTEX FUTURES', category: 'CYBERPUNK', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=640&auto=format&fit=crop' }
  ],
  skins: [
    { id: 's1', title: 'FRACTURE SPECIALIST', category: 'VALORANT CONCEPT', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=640&auto=format&fit=crop' },
    { id: 's2', title: 'NEON SAMURAI V2', category: 'FORTNITE CONCEPT', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=640&auto=format&fit=crop' },
    { id: 's3', title: 'ECLIPSE WRAPPER', category: 'GTA V / FIVEM', img: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=640&auto=format&fit=crop' },
    { id: 's4', title: 'MECHA KNIGHT', category: '3D SCULPT', img: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=640&auto=format&fit=crop' }
  ],
  animations: [
    { id: 'a1', title: 'NOT INSANE REEL 2026', category: 'CREATIVE DEMO', img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=640&auto=format&fit=crop' },
    { id: 'a2', title: 'LOGO SHATTER REVEAL', category: '3D PHYSICS', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=640&auto=format&fit=crop' },
    { id: 'a3', title: 'NEON MATRIX LOOP', category: 'STREAM BACKDROP', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=640&auto=format&fit=crop' },
    { id: 'a4', title: 'FLUID SIMULATION', category: 'KINETIC RENDER', img: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=640&auto=format&fit=crop' }
  ],
  about: {
    text: 'A professional multi-disciplinary designer with 5+ years of active experience crafting visually outstanding brand identities, social graphics, and custom-tailored virtual items. Leading design standards inside Firenox Territory, specializing in visual cohesion and immersive layout structures.',
    profileImgUrl: artistAvatar,
    skills: [
      'Graphic Designer',
      'Thumbnail Designer',
      'Banner Designer',
      'Logo Designer',
      'Custom Skins',
      'Discord Server Developer'
    ]
  },
  contact: {
    email: 'notinsanexd07@gmail.com',
    discordUrl: 'https://discord.gg/XHzQT5fas',
    discordUsername: 'not_insane_xd',
    webstoreUrl: '#webstore',
    webstoreProducts: [
      { title: 'PREMIUM THUMBNAIL', desc: 'Maximizes CTR with cinematic lighting & custom focal graphics.', price: '$15', emailSubject: 'Order: Premium Thumbnail' },
      { title: 'CUSTOM MASCOT LOGO', desc: 'Fully layered vector logo designed for pro creators & guilds.', price: '$40', emailSubject: 'Order: Custom Mascot Logo' },
      { title: 'SOCIAL BANNER SET', desc: 'Cohesive, fully responsive headers for YouTube, Twitch & Twitter.', price: '$25', emailSubject: 'Order: Social Banner Set' },
      { title: 'DISCORD SETUP PRO', desc: 'Full custom build with security bots, roles, aesthetic channel design & emojis.', price: '$50', emailSubject: 'Order: Discord Setup Pro' }
    ],
    instagramUrl: 'https://www.instagram.com/senpai.faw?igsh=MWFlY2lzZ2UyOHhyZw=='
  },
  settings: {
    siteTitle: 'Not Insane | Creative Artist Portfolio',
    faviconUrl: '',
    seoDesc: 'A fully responsive, highly optimized, and modern portfolio website for NOT INSANE.',
    copyrightText: '© 2026 NOT INSANE. ALL RIGHTS RESERVED.'
  }
};
