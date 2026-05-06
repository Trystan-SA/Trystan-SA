<script>
  let { lang, text } = $props();
  let copied = $state(false);

  function copy() {
    navigator.clipboard?.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 1500);
  }

  // Tiny syntax highlighter — keywords + strings + comments. Returns array of token spans.
  const KW = {
    typescript: /\b(type|const|let|async|await|function|return|kind|string|number|boolean|interface|import|export)\b/g,
    bash: /\b(if|then|fi|for|do|done|echo|cd|export)\b/g,
    yaml: /^(\s*)([a-zA-Z_-]+)(:)/gm
  };

  function tokenize(text, lang) {
    const matches = [];
    for (const m of text.matchAll(/(['"`])(?:\\.|(?!\1).)*\1/g)) {
      matches.push({ start: m.index, end: m.index + m[0].length, cls: 'tk-str', text: m[0] });
    }
    for (const m of text.matchAll(/\/\/.*$|#.*$/gm)) {
      matches.push({ start: m.index, end: m.index + m[0].length, cls: 'tk-cmt', text: m[0] });
    }
    const kw = KW[lang];
    if (kw) {
      for (const m of text.matchAll(kw)) {
        matches.push({ start: m.index, end: m.index + m[0].length, cls: 'tk-kw', text: m[0] });
      }
    }
    matches.sort((a, b) => a.start - b.start);
    const clean = [];
    let cursor = 0;
    for (const m of matches) {
      if (m.start < cursor) continue;
      clean.push(m);
      cursor = m.end;
    }
    const parts = [];
    cursor = 0;
    clean.forEach((m) => {
      if (m.start > cursor) parts.push({ text: text.slice(cursor, m.start) });
      parts.push({ text: m.text, cls: m.cls });
      cursor = m.end;
    });
    if (cursor < text.length) parts.push({ text: text.slice(cursor) });
    return parts;
  }

  const tokens = $derived(tokenize(text, lang));
</script>

<div class="code-block">
  <div class="code-head">
    <span class="code-lang">{lang}</span>
    <button onclick={copy} class="code-copy">
      {copied ? 'Copied!' : 'Copy'}
    </button>
  </div>
  <pre><code class="lang-{lang}">{#each tokens as tok, i (i)}{#if tok.cls}<span class={tok.cls}>{tok.text}</span>{:else}{tok.text}{/if}{/each}</code></pre>
</div>
