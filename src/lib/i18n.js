import { writable, derived } from 'svelte/store';
import en from './translations/en.js';
import fr from './translations/fr.js';

const translations = { en, fr };

export const lang = writable('en');

export function initLang() {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null;
  if (saved === 'en' || saved === 'fr') {
    lang.set(saved);
    return;
  }
  if (typeof navigator !== 'undefined' && (navigator.language || '').startsWith('fr')) {
    lang.set('fr');
    return;
  }
  lang.set('en');
}

export function setLang(l) {
  lang.set(l);
  if (typeof localStorage !== 'undefined') localStorage.setItem('lang', l);
}

export const t = derived(lang, ($l) => translations[$l] || translations.en);

// Localize a data object: returns a copy with titleFr/excerptFr/subtitleFr/blurbFr
// promoted to title/excerpt/subtitle/blurb when language is French.
export const loc = derived(lang, ($l) => (obj) => {
  if ($l !== 'fr') return obj;
  const out = { ...obj };
  if (obj.titleFr) out.title = obj.titleFr;
  if (obj.excerptFr) out.excerpt = obj.excerptFr;
  if (obj.subtitleFr) out.subtitle = obj.subtitleFr;
  if (obj.blurbFr) out.blurb = obj.blurbFr;
  return out;
});
