import { TAGS } from '$lib/data.js';

export const fmtDate = (iso, locale = 'en-US') => {
  const d = new Date(iso);
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
};

export const tagById = (id) => TAGS.find((t) => t.id === id) || { id, label: id, color: '#888' };
