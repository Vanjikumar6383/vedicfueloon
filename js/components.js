/* ============================================
   VEDICFUELOON — REUSABLE UI COMPONENTS
   Navbar, Footer, Product Card, Toast, etc.
   ============================================ */

import { Cart } from './store.js';
import { getProductColor } from './data.js';

// ── SVG Icon Library (replaces all emojis) ──
export const ICONS = {
  leaf: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 1 8-1 3.5-3.5 5-7 7"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
  pot: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18"></path><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8"></path><path d="M12 5v6"></path><path d="M9 3h6"></path></svg>`,
  mortar: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"></path><path d="M5 22c-1 0-2-1-2-3v-3c0-2 3-3 9-3s9 1 9 3v3c0 2-1 3-2 3"></path><path d="M12 3v10"></path><circle cx="12" cy="3" r="2"></circle></svg>`,
  star: `<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  starEmpty: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  cart: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
  plus: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  heart: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  search: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  check: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  x: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  alert: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  fire: `<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 23c-3.87 0-7-3.13-7-7 0-2.38 1.19-4.47 3-5.74V9c0-3.87 3.13-7 7-7a1 1 0 0 1 .71.29c.18.19.29.45.29.71v2.28c1.48 1.45 2.39 3.21 2.68 5.22A5 5 0 0 1 22 15a5 5 0 0 1-5 5h-.06A7 7 0 0 1 12 23zm0-18.93A5 5 0 0 0 8 9v2a1 1 0 0 1-.45.84A5 5 0 0 0 7 16a5 5 0 0 0 5 5 5 5 0 0 0 4.06-2.07A3 3 0 0 0 20 15a3 3 0 0 0-2-2.83 1 1 0 0 1-.68-.93c-.14-1.86-.86-3.44-2.14-4.7A1 1 0 0 1 15 5.8V4.14A5 5 0 0 0 12 4.07z"></path></svg>`,
  sparkle: `<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 1l2.09 6.26L20 9.27l-4.91 3.82L16.82 20 12 16.77 7.18 20l1.73-6.91L4 9.27l5.91-2.01L12 1z"></path></svg>`,
  handshake: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17l-5-5-4 4-3-3-5 5"></path><path d="M4 15v4h4"></path><path d="M20 15v4h-4"></path></svg>`,
  mapPin: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  phone: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 2.01.72 2.97a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.96.35 1.97.59 2.97.72A2 2 0 0 1 22 16.92z"></path></svg>`,
  mail: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  clock: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  settings: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  realWhatsapp: `<svg class="real-brand-logo real-wa-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="23" fill="#25D366"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 8.5C15.44 8.5 8.5 15.44 8.5 24c0 3.01.86 5.82 2.35 8.21L9 39l7.02-1.78A15.42 15.42 0 0 0 24 39.5c8.56 0 15.5-6.94 15.5-15.5S32.56 8.5 24 8.5zm7.88 21.25c-.33.93-1.64 1.72-2.7 1.95-.73.16-1.69.29-4.91-1.05-4.1-1.71-6.76-5.88-6.96-6.15-.2-.27-1.65-2.2-1.65-4.19 0-1.99 1.05-2.97 1.42-3.37.37-.4.82-.5 1.09-.5.27 0 .54.01.79.02.26.01.6-.1.95.73.36.86 1.22 2.97 1.32 3.19.1.21.17.47.03.76-.14.29-.22.46-.43.7-.21.24-.44.55-.63.73-.21.22-.44.45-.19.89.26.44 1.15 1.89 2.47 3.07 1.69 1.5 3.13 1.98 3.57 2.19.45.22.7.19.96-.11.26-.3.11-1.29 1.41-1.74.3-.44.6-.37 1.02-.21.42.16 2.64 1.25 3.1 1.48.46.23.76.35.87.55.12.2.12 1.16-.21 2.09z" fill="#FFFFFF"/></svg>`,
  realInstagram: `<svg class="real-brand-logo real-ig-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="realIgRadial" cx="20%" cy="110%" r="95%"><stop offset="0%" stop-color="#FFD521"/><stop offset="25%" stop-color="#FF543E"/><stop offset="65%" stop-color="#C837AB"/><stop offset="100%" stop-color="#3771C8"/></radialGradient></defs><rect width="48" height="48" rx="12" fill="url(#realIgRadial)"/><rect x="9.5" y="9.5" width="29" height="29" rx="8" fill="none" stroke="#FFFFFF" stroke-width="3.2"/><circle cx="24" cy="24" r="7" fill="none" stroke="#FFFFFF" stroke-width="3.2"/><circle cx="31.8" cy="16.2" r="2.2" fill="#FFFFFF"/></svg>`,
  whatsapp: `<svg class="real-brand-logo real-wa-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="23" fill="#25D366"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 8.5C15.44 8.5 8.5 15.44 8.5 24c0 3.01.86 5.82 2.35 8.21L9 39l7.02-1.78A15.42 15.42 0 0 0 24 39.5c8.56 0 15.5-6.94 15.5-15.5S32.56 8.5 24 8.5zm7.88 21.25c-.33.93-1.64 1.72-2.7 1.95-.73.16-1.69.29-4.91-1.05-4.1-1.71-6.76-5.88-6.96-6.15-.2-.27-1.65-2.2-1.65-4.19 0-1.99 1.05-2.97 1.42-3.37.37-.4.82-.5 1.09-.5.27 0 .54.01.79.02.26.01.6-.1.95.73.36.86 1.22 2.97 1.32 3.19.1.21.17.47.03.76-.14.29-.22.46-.43.7-.21.24-.44.55-.63.73-.21.22-.44.45-.19.89.26.44 1.15 1.89 2.47 3.07 1.69 1.5 3.13 1.98 3.57 2.19.45.22.7.19.96-.11.26-.3.11-1.29 1.41-1.74.3-.44.6-.37 1.02-.21.42.16 2.64 1.25 3.1 1.48.46.23.76.35.87.55.12.2.12 1.16-.21 2.09z" fill="#FFFFFF"/></svg>`,
  instagram: `<svg class="real-brand-logo real-ig-logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="realIgRadial2" cx="20%" cy="110%" r="95%"><stop offset="0%" stop-color="#FFD521"/><stop offset="25%" stop-color="#FF543E"/><stop offset="65%" stop-color="#C837AB"/><stop offset="100%" stop-color="#3771C8"/></radialGradient></defs><rect width="48" height="48" rx="12" fill="url(#realIgRadial2)"/><rect x="9.5" y="9.5" width="29" height="29" rx="8" fill="none" stroke="#FFFFFF" stroke-width="3.2"/><circle cx="24" cy="24" r="7" fill="none" stroke="#FFFFFF" stroke-width="3.2"/><circle cx="31.8" cy="16.2" r="2.2" fill="#FFFFFF"/></svg>`,
  facebook: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
  messageCircle: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
  youtube: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
  arrowRight: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  arrowLeft: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  chevronRight: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  chevronLeft: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
  trash: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  truck: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`,
  users: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  home: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  logOut: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
  barChart: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,
  package: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
  bowl: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18c0 5.523-4.477 10-10 10H7C4.477 21 2 17.523 3 11z"></path><path d="M7 11c0-4 2-6 5-6s5 2 5 6"></path><line x1="12" y1="3" x2="12" y2="5"></line></svg>`,
  vegCircle: `<svg class="icon-svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="#27AE60" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="#27AE60"/></svg>`,
  clipboard: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
  shoppingBag: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  wheat: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22 16 8"></path><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"></path><path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"></path><path d="M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path><path d="M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path><path d="M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"></path></svg>`,
  flask: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"></path><path d="M10 9V3"></path><path d="M14 9V3"></path><path d="M10 9l-4 11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2L14 9"></path></svg>`,
  heartFill: `<svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  nutrition: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`,
  edit: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  diamond: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 12l10 10 10-10L12 2z"></path></svg>`,
  hourglass: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>`,
  salad: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10"></path><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path><path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 1.44 2.4 2.4 0 0 1-1.02 3.73"></path><path d="M12.62 12a2.4 2.4 0 0 0 .4-4.77 2.4 2.4 0 0 0-3.2-2.77"></path></svg>`,
  list: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  eco: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22c1.25-1.25 2.5-2.5 4-3.5C8.5 17 11 16.5 14 17c-1 1-2 2.5-2 4.5"></path><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 1 8-1 3.5-3.5 5-7 7"></path></svg>`,
  lock: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  eye: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  currency: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  lightning: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  flower: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M12 2a4 4 0 0 0-4 4c0 3 4 6 4 6s4-3 4-6a4 4 0 0 0-4-4z"></path><path d="M12 22a4 4 0 0 0 4-4c0-3-4-6-4-6s-4 3-4 6a4 4 0 0 0 4 4z"></path><path d="M2 12a4 4 0 0 0 4 4c3 0 6-4 6-4s-3-4-6-4a4 4 0 0 0-4 4z"></path><path d="M22 12a4 4 0 0 0-4-4c-3 0-6 4-6 4s3 4 6 4a4 4 0 0 0 4-4z"></path></svg>`,
  checkCircle: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  shieldCheck: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`,
  receipt: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"></path><line x1="8" y1="7" x2="16" y2="7"></line><line x1="8" y1="11" x2="16" y2="11"></line><line x1="8" y1="15" x2="13" y2="15"></line></svg>`,
};

// ── Navbar ──
export function renderNavbar() {
  const cartCount = Cart.getCount();
  return `
    <header class="site-header-fixed" id="siteHeader">
      <div class="announcement-bar">
        <div class="announce-track">
          <span class="announce-item"><span class="announce-icon">${ICONS.leaf}</span> 100% Natural Ingredients | 100% இயற்கை பொருட்கள்</span>
          <span class="announce-divider">${ICONS.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${ICONS.mortar}</span> Stone Ground Traditional Recipes | கல் உரல் அரைப்பு</span>
          <span class="announce-divider">${ICONS.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${ICONS.pot}</span> Traditional Tamil Health Foods | பாரம்பரிய தமிழ் உணவு</span>
          <span class="announce-divider">${ICONS.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${ICONS.leaf}</span> 100% Natural Ingredients | 100% இயற்கை பொருட்கள்</span>
          <span class="announce-divider">${ICONS.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${ICONS.mortar}</span> Stone Ground Traditional Recipes | கல் உரல் அரைப்பு</span>
          <span class="announce-divider">${ICONS.diamond}</span>
          <span class="announce-item"><span class="announce-icon">${ICONS.pot}</span> Traditional Tamil Health Foods | பாரம்பரிய தமிழ் உணவு</span>
        </div>
      </div>
      <nav class="navbar" id="navbar">
        <div class="container">
          <a href="#/" class="navbar-brand" id="mainNavBrand" title="VedicFueloon — Home (Double-click to open Admin Panel)">
            <div class="brand-logo-wrap" title="VedicFueloon">
              <img 
                id="navbarLogoImg"
                class="brand-logo-animated" 
                src="./vedicfueloon_logo_animated.webp" 
                alt="VedicFueloon Animated Logo" 
                loading="eager"
                onerror="this.onerror=null;this.src='./vedicfueloon-emblem.png';"
              />
            </div>
            <div class="brand-info">
              <div class="brand-name">Vedic<span>Fueloon</span></div>
              <div class="brand-tagline d-none d-sm-block">Power in Every Bite</div>
            </div>
          </a>
          
          <div class="nav-links" id="navLinks">
            <a href="#/" class="nav-link" data-page="home">Home</a>
            <a href="#/shop" class="nav-link" data-page="shop">Kanji & Menu</a>
            <a href="#/about" class="nav-link" data-page="about">Our Story</a>
            <a href="#/contact" class="nav-link" data-page="contact">Contact</a>
            <a href="#/admin" class="nav-link d-md-none nav-link-mobile-admin" data-page="admin">${ICONS.settings} Admin Portal</a>
          </div>
          
          <div class="nav-actions">
            <a href="#/admin" class="nav-admin-link d-none d-md-inline-flex" title="Admin Portal">${ICONS.settings} Admin</a>
            <button class="nav-cart-btn btn-ripple" id="navCartBtn" onclick="location.hash='#/cart'" title="View Shopping Cart">
              <span class="cart-icon">${ICONS.cart}</span>
              <span class="cart-text d-none d-sm-inline">Cart</span>
              <span class="cart-count" id="cartCount">${cartCount}</span>
            </button>
            <button class="mobile-toggle d-flex d-md-none" id="mobileToggle" aria-label="Toggle navigation menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <!-- Continuous Flower Petals Garland along the bottom edge -->
        <div class="navbar-petal-border" aria-hidden="true"></div>
      </nav>
    </header>
  `;
}

// ── Footer ──
export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-top">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="footer-logo">
                <img src="./vedicfueloon-logo-clean.png" alt="VedicFueloon" class="footer-clean-logo" />
              </div>
              <p>Authentic Tamil traditional health foods, crafted with love and heritage. Every spoon carries the wisdom of ancient Siddha nutrition and grandmother's stone-ground recipes.</p>
              <div class="footer-social">
                <a href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20order%20from%20VedicFueloon" target="_blank" rel="noopener" aria-label="WhatsApp Official" class="social-brand-btn social-wa-btn" title="Chat on WhatsApp (+91 98765 43210)">
                  ${ICONS.realWhatsapp}
                </a>
                <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener" aria-label="Instagram Official" class="social-brand-btn social-ig-btn" title="Follow on Instagram (@vedicfueloon)">
                  ${ICONS.realInstagram}
                </a>
              </div>
            </div>
            
            <div class="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#/">${ICONS.chevronRight} Home</a></li>
                <li><a href="#/shop">${ICONS.chevronRight} Menu</a></li>
                <li><a href="#/about">${ICONS.chevronRight} Our Story</a></li>
                <li><a href="#/contact">${ICONS.chevronRight} Contact</a></li>
                <li><a href="#/cart">${ICONS.chevronRight} Cart</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h4>Popular Items</h4>
              <ul>
                <li><a href="#/product/1">${ICONS.chevronRight} Karupu Kauvni Kanji</a></li>
                <li><a href="#/product/3">${ICONS.chevronRight} Sprouted Ragi Kanji</a></li>
                <li><a href="#/product/8">${ICONS.chevronRight} Millet Kanji</a></li>
                <li><a href="#/product/12">${ICONS.chevronRight} Bamboo Kanji</a></li>
                <li><a href="#/product/15">${ICONS.chevronRight} Navar Nava Pire</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h4>Direct Connect</h4>
              <ul class="footer-exclusive-channels">
                <li>
                  <a href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20inquiry%20regarding%20VedicFueloon" target="_blank" rel="noopener" class="footer-channel-link">
                    <span class="channel-link-logo">${ICONS.realWhatsapp}</span>
                    <div class="channel-link-meta">
                      <span class="channel-link-title">WhatsApp Support</span>
                      <span class="channel-link-sub">+91 98765 43210</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/vedicfueloon" target="_blank" rel="noopener" class="footer-channel-link">
                    <span class="channel-link-logo">${ICONS.realInstagram}</span>
                    <div class="channel-link-meta">
                      <span class="channel-link-title">Instagram DM</span>
                      <span class="channel-link-sub">@vedicfueloon</span>
                    </div>
                  </a>
                </li>
                <li class="footer-channels-note">
                  <span class="pulse-dot"></span> WhatsApp & Instagram Inquiries
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} VedicFueloon. All rights reserved.</p>
          <span class="footer-tamil-quote">${ICONS.flower} உங்கள் உணவே உங்கள் மருந்து — Let food be thy medicine ${ICONS.flower}</span>
        </div>
      </div>
      <div class="footer-petal-garland" aria-hidden="true"></div>
    </footer>
  `;
}

// ── Product Card ──
export function renderProductCard(product) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const bgColor = getProductColor(product.id);
  const badgeHtml = product.badge
    ? `<span class="badge badge-${product.badge}">${
        product.badge === 'bestseller' ? 'Best Seller' :
        product.badge === 'new' ? 'New Harvest' :
        product.badge === 'daily' ? 'Daily Special' : ''
      }</span>`
    : '';
  
  const starsHtml = renderStars(product.rating);
  const nutrientTag = product.nutrition?.protein ? `${product.nutrition.protein} Protein` : 'Heritage Recipe';

  return `
    <div class="product-card hover-lift tilt-hover" data-product-id="${product.id}">
      <div class="card-image" style="background: ${bgColor};">
        ${product.image 
          ? `<img src="${product.image}" alt="${product.name}" loading="lazy" />`
          : `
            <div class="card-art-placeholder">
              <div class="art-glow"></div>
              <div class="art-icon">${ICONS.bowl}</div>
              <div class="art-leaf">${ICONS.leaf}</div>
              <span class="art-tamil-tag tamil-text">${product.tamilName.split(' ')[0] || 'கஞ்சி'}</span>
            </div>
          `
        }
        <div class="card-badges">
          ${discount > 0 ? `<span class="badge badge-sale">${discount}% OFF</span>` : ''}
          ${badgeHtml}
        </div>
        <div class="card-nutrient-chip">${ICONS.sparkle} ${nutrientTag}</div>
        <button class="card-wishlist" aria-label="Add to wishlist" onclick="event.stopPropagation(); this.classList.toggle('active');">${ICONS.heart}</button>
      </div>
      <div class="card-body">
        <div class="card-tamil-name tamil-text">${product.tamilName}</div>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-desc">${product.description}</p>
        <div class="card-rating">
          <span class="stars">${starsHtml}</span>
          <strong>${product.rating}</strong>
          <span>(${product.reviews} reviews)</span>
        </div>
        <div class="card-footer">
          <div class="card-price">
            ₹${product.price}
            ${product.originalPrice > product.price ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
          </div>
          <button class="card-add-btn btn-ripple" onclick="event.stopPropagation(); window.addToCart(${product.id})" aria-label="Add to cart" title="Add to Cart">
            ${ICONS.plus}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Star Rating ──
export function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += ICONS.star;
    } else if (i - 0.5 <= rating) {
      stars += ICONS.star;
    } else {
      stars += `<span class="star-empty">${ICONS.starEmpty}</span>`;
    }
  }
  return stars;
}

// ── Toast Notification ──
let toastTimeout = null;
export function showToast(title, message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { 
    success: ICONS.check, 
    error: ICONS.x, 
    warning: ICONS.alert 
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || ICONS.check}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <span class="toast-close" onclick="this.parentElement.remove()">${ICONS.x}</span>
  `;
  container.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Update Cart Count Badge ──
export function updateCartBadge() {
  const count = Cart.getCount();
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = count;
    if (count > 0) {
      badge.parentElement.classList.add('cart-bounce');
      setTimeout(() => badge.parentElement.classList.remove('cart-bounce'), 500);
    }
  }
}

// ── Split Text Headings for Letter-by-Letter Scroll Reveal ──
export function setupSplitTextHeadings() {
  const headings = document.querySelectorAll(
    'h1, h2, h3, .display-heading, .special-title, .cat-title, .comm-banner-title, .comm-channel-title, .product-title, .section-header h2, .section-header h3'
  );

  function getGraphemes(str) {
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        return Array.from(segmenter.segment(str), s => s.segment);
      } catch (e) {
        // Fallback
      }
    }
    return Array.from(str);
  }

  headings.forEach(heading => {
    // Avoid elements that should stay raw (e.g. within modals, badges, admin, navbar, product cards)
    if (heading.closest('.modal, .announcement-bar, .admin-sidebar, .admin-layout, .toast, .navbar, .product-card')) return;

    // Ensure all headings receive the rise classes
    heading.classList.add('split-heading', 'heading-rise');

    if (heading.dataset.split === 'done') return;
    heading.dataset.split = 'done';

    let charCount = 0;

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text) return null;
        
        const frag = document.createDocumentFragment();
        const tokens = text.split(/(\s+)/);
        tokens.forEach(token => {
          if (!token) return;
          if (/^\s+$/.test(token)) {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'split-space';
            spaceSpan.innerHTML = '&nbsp;';
            frag.appendChild(spaceSpan);
          } else {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'split-word';
            const chars = getGraphemes(token);
            chars.forEach(char => {
              const charSpan = document.createElement('span');
              charSpan.className = 'split-char';
              charSpan.style.setProperty('--char-idx', charCount++);
              charSpan.textContent = char;
              wordSpan.appendChild(charSpan);
            });
            frag.appendChild(wordSpan);
          }
        });
        return frag;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();
        if (tag === 'br' || tag === 'svg' || tag === 'path' || tag === 'circle' || tag === 'polygon' || tag === 'rect' || tag === 'line' || tag === 'polyline' || node.classList?.contains('icon-svg')) {
          return node.cloneNode(true);
        }
        const clone = node.cloneNode(false);
        node.childNodes.forEach(child => {
          const res = processNode(child);
          if (res) clone.appendChild(res);
        });
        return clone;
      }
      return node.cloneNode(true);
    }

    const fragment = document.createDocumentFragment();
    Array.from(heading.childNodes).forEach(child => {
      const res = processNode(child);
      if (res) fragment.appendChild(res);
    });

    if (fragment.childNodes.length > 0) {
      heading.innerHTML = '';
      heading.appendChild(fragment);
    }
  });
}

// ── Scroll Reveal Observer with Faded Blur & Letter-by-Letter (Triggers Every Time Page Is Scrolled) ──
export function initScrollReveal() {
  if (window._vfScrollObserver) {
    window._vfScrollObserver.disconnect();
  }

  // Setup split-text on all headings for smooth letter-by-letter entrance
  setupSplitTextHeadings();

  // Ensure all sections across the page participate in the faded blur scroll effect
  document.querySelectorAll('section:not(.hero)').forEach(sec => {
    if (!sec.classList.contains('section-scroll-blur')) {
      sec.classList.add('section-scroll-blur');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        // Reset when element leaves view so faded blur and letter animations trigger EVERY TIME it is scrolled!
        entry.target.classList.remove('visible');
      }
    });
  }, { 
    threshold: 0.08, 
    rootMargin: '0px 0px -30px 0px' 
  });

  window._vfScrollObserver = observer;

  const elementsToObserve = document.querySelectorAll(
    '.split-heading, .heading-rise, .section-header, .reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-scale, .section-animate, .section-scroll-blur'
  );

  elementsToObserve.forEach(el => {
    if (!el.closest('.modal, .announcement-bar, .admin-sidebar, .admin-layout, .toast, .navbar, .product-card')) {
      observer.observe(el);
    }
  });
}

// ── Active Nav Link ──
export function setActiveNav(page) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
}

// ── Price Formatter ──
export function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

// ── Date Formatter ──
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
