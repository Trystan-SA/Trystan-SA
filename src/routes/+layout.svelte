<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Icons from '$lib/components/icons.svelte';
  import GithubStarsBadge from '$lib/components/GithubStarsBadge.svelte';
  import { base } from '$app/paths';
  import { lang, t, initLang, setLang } from '$lib/i18n.js';

  let { children } = $props();
  let menuOpen = $state(false);

  const isActive = (path) => {
    const p = $page.url.pathname;
    if (path === '/') return p === '/' || p === '';
    return p === path || p === path + '/' || p.startsWith(path + '/');
  };

  onMount(() => {
    initLang();

    if (!import.meta.env.PROD) return;
    // Defer GA4 until the browser is idle so it doesn't fight critical
    // resources for main-thread time or get flagged by Lighthouse for unused
    // JS within the LCP/FCP window.
    const loadGA = () => {
      if (window.__gaLoaded) return;
      window.__gaLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'G-523N92F8SN');
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=G-523N92F8SN';
      document.head.appendChild(s);
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadGA, { timeout: 4000 });
    } else {
      setTimeout(loadGA, 2500);
    }
  });

  $effect(() => {
    // close menu on route change
    $page.url.pathname;
    menuOpen = false;
  });
</script>


<div class="shell">
  <nav class="topnav">
    <div class="topnav-inner">
      <a class="brand" href="{base}/" aria-label="Trystan Sarrade">
        <span class="brand-sub">{$t.profile.brandSub}</span>
      </a>
      <div class="nav-links">
        <a href="{base}/" class={isActive('/') ? 'is-active' : ''}>{$t.nav.home}</a>
        <a href="{base}/articles/" class={isActive('/articles') ? 'is-active' : ''}>{$t.nav.articles}</a>
        <a href="{base}/projects/" class={isActive('/projects') ? 'is-active' : ''}>{$t.nav.projects}</a>
        <a href="{base}/about/" class={isActive('/about') ? 'is-active' : ''}>{$t.nav.about}</a>
      </div>
      <div class="nav-tools">
        <div class="lang-switcher">
          <button
            class="lang-btn {$lang === 'en' ? 'is-active' : ''}"
            onclick={() => setLang('en')}
          >EN</button>
          <span class="lang-sep">|</span>
          <button
            class="lang-btn {$lang === 'fr' ? 'is-active' : ''}"
            onclick={() => setLang('fr')}
          >FR</button>
        </div>
        <a
          href="https://www.linkedin.com/in/trystan-sarrade/"
          target="_blank"
          rel="noopener"
          class="theme-toggle"
          title="LinkedIn"
        >
          <Icons name="linkedin" />
        </a>
        <GithubStarsBadge user="Trystan-SA" />
      </div>
      <button
        class="nav-hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onclick={() => (menuOpen = !menuOpen)}
      >
        <span></span><span></span><span></span>
      </button>
    </div>
    {#if menuOpen}
      <div class="nav-mobile-menu">
        <a href="{base}/" class={isActive('/') ? 'is-active' : ''}>{$t.nav.home}</a>
        <a href="{base}/articles/" class={isActive('/articles') ? 'is-active' : ''}>{$t.nav.articles}</a>
        <a href="{base}/projects/" class={isActive('/projects') ? 'is-active' : ''}>{$t.nav.projects}</a>
        <a href="{base}/about/" class={isActive('/about') ? 'is-active' : ''}>{$t.nav.about}</a>
        <div class="nav-mobile-tools">
          <div class="lang-switcher">
            <button class="lang-btn {$lang === 'en' ? 'is-active' : ''}" onclick={() => setLang('en')}>EN</button>
            <span class="lang-sep">|</span>
            <button class="lang-btn {$lang === 'fr' ? 'is-active' : ''}" onclick={() => setLang('fr')}>FR</button>
          </div>
          <a href="https://www.linkedin.com/in/trystan-sarrade/" target="_blank" rel="noopener" class="theme-toggle" title="LinkedIn">
            <Icons name="linkedin" />
          </a>
          <GithubStarsBadge user="Trystan-SA" />
        </div>
      </div>
    {/if}
  </nav>

  <main class="shell-main">
    {@render children()}
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div>
        <h4>{$t.footer.siteLabel}</h4>
        <ul>
          <li><a href="{base}/">{$t.nav.home}</a></li>
          <li><a href="{base}/articles/">{$t.nav.articles}</a></li>
          <li><a href="{base}/projects/">{$t.nav.projects}</a></li>
          <li><a href="{base}/about/">{$t.nav.about}</a></li>
        </ul>
      </div>
      <div>
        <h4>{$t.footer.elsewhereLabel}</h4>
        <ul>
          <li><a href="https://github.com/Trystan-SA" target="_blank" rel="noopener">GitHub ↗</a></li>
          <li><a href="https://www.linkedin.com/in/trystan-sarrade/" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li><a href="mailto:trystansarrade@gmail.com">trystansarrade@gmail.com</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>{$t.footer.copyright}</span>
    </div>
  </footer>
</div>
