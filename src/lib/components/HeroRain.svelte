<script>
  import { onMount } from 'svelte';

  let canvas = $state();

  const GLYPHS =
    '01010110アカサタナハマヤラワヰヱABCDEF0123456789{}<>[]/\\|=+-*&^%$#@!?:;.,_';
  const HEX = '0123456789ABCDEF';

  function pick() {
    return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
  }
  function rb() {
    return HEX[(Math.random() * 16) | 0] + HEX[(Math.random() * 16) | 0];
  }
  function rword() {
    return rb() + ' ' + rb() + ' ' + rb() + ' ' + rb();
  }
  function rascii(bytes) {
    let s = '';
    for (let i = 0; i < bytes; i++) {
      const c = (Math.random() * 94 + 33) | 0;
      s += Math.random() < 0.35 ? '.' : String.fromCharCode(c);
    }
    return s;
  }

  onMount(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    // Cap DPR — 1.5 is plenty for animated text and halves paint cost vs 2x.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const fontSize = 16;
    const colSpacing = 18;
    const hexFontSize = 12;
    const hexLineH = 16;
    let width = 0;
    let height = 0;
    let columns = [];
    let hexBlocks = [];
    let nextHexSpawn = 0;
    let raf = 0;
    let tabVisible = true;
    let inViewport = true;
    let last = performance.now();
    const isVisible = () => tabVisible && inViewport;

    function makeColumn(x, initial = false) {
      const trail = 10 + Math.floor(Math.random() * 22);
      // initial == true on init: spread heads across the entire hero band
      // so the effect is "full" immediately instead of fading in from the top.
      // After reset, columns start a bit above the top.
      const head = initial
        ? Math.random() * (height + trail * fontSize) - trail * fontSize * 0.5
        : -Math.random() * fontSize * (trail + 6);
      return {
        x,
        head,
        speed: 40 + Math.random() * 110, // px per second
        trail,
        glyphs: Array.from({ length: trail + 1 }, pick),
        lastCell: -Infinity,
        flickerRate: 0.02 + Math.random() * 0.05,
        // every few columns is a "bold" hot stream
        bright: Math.random() < 0.22
      };
    }

    function initColumns() {
      const n = Math.max(1, Math.floor(width / colSpacing));
      columns = [];
      for (let i = 0; i < n; i++) {
        columns.push(makeColumn(i * colSpacing + colSpacing / 2, true));
      }
    }

    function makeHexBlock() {
      const rows = 4 + ((Math.random() * 5) | 0); // 4-8 rows
      const baseAddr = ((Math.random() * 0xffffff) | 0) & 0xfffff0;
      const showAscii = Math.random() < 0.55;
      const dataLines = [];
      for (let i = 0; i < rows; i++) {
        const addr = (((baseAddr + i * 16) >>> 0)
          .toString(16)
          .toUpperCase()
          .padStart(6, '0'));
        let line = addr + '  ' + rword() + '  ' + rword();
        if (showAscii) line += '  ' + rascii(8);
        dataLines.push(line);
      }
      const inner = Math.max(...dataLines.map((l) => l.length));
      const title = ' MEM ' + ((Math.random() * 0xff) | 0).toString(16).toUpperCase().padStart(2, '0') + ' ';
      const topPad = inner + 2 - title.length;
      const lpad = Math.max(0, (topPad / 2) | 0);
      const rpad = Math.max(0, topPad - lpad);
      const top = '┌' + '─'.repeat(lpad) + title + '─'.repeat(rpad) + '┐';
      const bottom = '└' + '─'.repeat(inner + 2) + '┘';
      const lines = [top];
      for (const l of dataLines) lines.push('│ ' + l.padEnd(inner) + ' │');
      lines.push(bottom);

      ctx.save();
      ctx.font = `${hexFontSize}px "Geist Mono", ui-monospace, monospace`;
      const w = Math.ceil(ctx.measureText(top).width);
      ctx.restore();
      return {
        x: 16 + Math.random() * Math.max(20, width - w - 32),
        y: -lines.length * hexLineH - Math.random() * 120,
        lines,
        speed: 8 + Math.random() * 14, // much slower — stays on screen longer
        h: lines.length * hexLineH,
        w,
        // animation state — bytes update on a timer
        nextByteSwap: 0,
        nextRowScan: 0,
        scanRow: 0,
        scanCol: 0
      };
    }

    function swapByteInLine(ln) {
      const matches = [...ln.matchAll(/[0-9A-F]{2}(?=[\s│])/g)];
      if (!matches.length) return ln;
      const m = matches[(Math.random() * matches.length) | 0];
      return ln.slice(0, m.index) + rb() + ln.slice(m.index + 2);
    }

    function animateHexBlock(b, now) {
      if (b.lines.length <= 2) return;
      // Continuous byte flicker — swap a random byte every ~30–90ms.
      if (now >= b.nextByteSwap) {
        // swap a few bytes at once for a more visible "data churn"
        const swaps = 1 + ((Math.random() * 3) | 0);
        for (let k = 0; k < swaps; k++) {
          const li = 1 + ((Math.random() * (b.lines.length - 2)) | 0);
          b.lines[li] = swapByteInLine(b.lines[li]);
        }
        b.nextByteSwap = now + 30 + Math.random() * 60;
      }
      // Periodic "row scan" — rewrite a whole row left-to-right every ~1.2–2.5s.
      if (now >= b.nextRowScan) {
        b.scanRow = 1 + ((Math.random() * (b.lines.length - 2)) | 0);
        b.scanCol = 0;
        b.nextRowScan = now + 1200 + Math.random() * 1300;
      }
      // Advance the active scan: rewrite ~2 bytes per frame in the chosen row.
      const row = b.lines[b.scanRow];
      if (row) {
        const matches = [...row.matchAll(/[0-9A-F]{2}(?=[\s│])/g)];
        for (let s = 0; s < 2 && b.scanCol < matches.length; s++, b.scanCol++) {
          const m = matches[b.scanCol];
          b.lines[b.scanRow] =
            b.lines[b.scanRow].slice(0, m.index) +
            rb() +
            b.lines[b.scanRow].slice(m.index + 2);
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const newW = rect.width;
      const newH = rect.height;
      if (newW < 1 || newH < 1) return;
      const sizeChanged = newW !== width || newH !== height;
      width = newW;
      height = newH;
      // IMPORTANT: do not set canvas.style.width/height — leave CSS height:100%
      // in control so the canvas keeps growing with .hero on layout changes
      // (font loads, content reflow, etc.). Only update the drawing buffer.
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'top';
      if (sizeChanged || columns.length === 0) initColumns();
    }

    // Edge-mask: replaces the CSS mask-image gradient. Bright on the sides,
    // near-transparent in the center, so text stays legible without forcing
    // the compositor to repaint a masked, blended layer every frame.
    function edgeAlpha(x) {
      const t = width > 0 ? x / width : 0.5;
      // mirror around 0.5 → distance from center, 0 (center) → 0.5 (edge)
      const d = Math.abs(t - 0.5) * 2; // 0..1
      // ease toward 1 at the edges, near 0 in the middle ~[0.2..0.8]
      if (d < 0.2) return 0.04;
      if (d > 0.84) return 1;
      const k = (d - 0.2) / 0.64;
      return 0.04 + k * k * 0.96;
    }

    // Throttle to ~40fps — visually identical for falling glyphs, ~33% less work.
    const FRAME_MIN_MS = 24;
    let lastDraw = 0;

    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!isVisible()) {
        last = now;
        return;
      }
      if (now - lastDraw < FRAME_MIN_MS) return;
      lastDraw = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'top';

      // ── Hex dump blocks (rendered first, columns fall in front) ─────────
      ctx.font = `${hexFontSize}px "Geist Mono", ui-monospace, monospace`;
      for (let bi = hexBlocks.length - 1; bi >= 0; bi--) {
        const b = hexBlocks[bi];
        b.y += b.speed * dt;
        animateHexBlock(b, now);

        const xFade = edgeAlpha(b.x + b.w / 2);
        for (let i = 0; i < b.lines.length; i++) {
          const y = b.y + i * hexLineH;
          if (y < -hexLineH || y > height) continue;
          const edgeFade =
            Math.min(1, (y + hexLineH) / 60) *
            Math.min(1, (height - y) / 60) *
            xFade;
          if (i === 0) {
            ctx.fillStyle = `rgba(220, 255, 220, ${(0.95 * edgeFade).toFixed(3)})`;
          } else {
            const a = 0.55 * edgeFade * (1 - (i - 1) / (b.lines.length + 2));
            ctx.fillStyle = `rgba(168, 245, 168, ${Math.max(0.04, a).toFixed(3)})`;
          }
          ctx.fillText(b.lines[i], b.x, y);
        }

        if (b.y > height + 20) hexBlocks.splice(bi, 1);
      }

      // schedule next hex spawn — sparse, so each block stays readable
      if (now >= nextHexSpawn && hexBlocks.length < 3) {
        hexBlocks.push(makeHexBlock());
        nextHexSpawn = now + 4000 + Math.random() * 5000;
      }

      // ── Matrix columns ─────────────────────────────────────────────────
      ctx.font = `${fontSize}px "Geist Mono", ui-monospace, monospace`;
      for (const col of columns) {
        col.head += col.speed * dt;

        const cell = Math.floor(col.head / fontSize);
        if (cell !== col.lastCell) {
          col.lastCell = cell;
          col.glyphs.unshift(pick());
          if (col.glyphs.length > col.trail + 1) col.glyphs.pop();
        }
        if (Math.random() < col.flickerRate) {
          const i = Math.floor(Math.random() * col.glyphs.length);
          col.glyphs[i] = pick();
        }

        const xFade = edgeAlpha(col.x);
        if (xFade < 0.05) continue; // skip near-invisible center columns entirely

        for (let i = 0; i < col.glyphs.length; i++) {
          const y = Math.floor(col.head) - i * fontSize;
          if (y < -fontSize || y > height) continue;
          if (i === 0) {
            const a = (col.bright ? 0.95 : 0.85) * xFade;
            ctx.fillStyle = col.bright
              ? `rgba(220, 255, 220, ${a.toFixed(3)})`
              : `rgba(200, 250, 200, ${a.toFixed(3)})`;
          } else {
            const t = 1 - i / col.trail;
            const a = Math.max(0.03, 0.7 * t * t) * xFade;
            ctx.fillStyle = col.bright
              ? `rgba(168, 245, 168, ${a.toFixed(3)})`
              : `rgba(122, 240, 122, ${(a * 0.85).toFixed(3)})`;
          }
          ctx.fillText(col.glyphs[i], col.x, y);
        }

        if (col.head - col.trail * fontSize > height + fontSize * 2) {
          const fresh = makeColumn(col.x);
          fresh.head = -Math.random() * fontSize * 12;
          Object.assign(col, fresh);
        }
      }
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    window.addEventListener('resize', resize);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inViewport = e.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      tabVisible = document.visibilityState === 'visible';
      if (tabVisible) last = performance.now(); // avoid a huge dt on resume
    };
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  });
</script>

<div class="hero-rain-wrap" aria-hidden="true">
  <canvas bind:this={canvas} class="hero-rain"></canvas>
</div>

<style>
  /* Wrapper is a normal block, sized to fill .hero exactly via top/bottom.
     Using a div (not canvas) avoids the replaced-element height-auto quirk
     where top+bottom doesn't actually stretch the box. overflow: hidden then
     guarantees the canvas/animation can never visually leak past .hero. */
  .hero-rain-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    opacity: 0.6;
  }
  .hero-rain {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-rain-wrap {
      display: none;
    }
  }
</style>
