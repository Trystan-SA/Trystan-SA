<script>
  import '../app.css';
  import '@fontsource-variable/inter-tight';
  import '@fontsource-variable/source-serif-4/opsz.css';
  import '@fontsource-variable/source-serif-4/opsz-italic.css';
  import '@fontsource-variable/jetbrains-mono';
  import { page } from '$app/stores';
  import Icons from '$lib/components/icons.svelte';
  import GithubStarsBadge from '$lib/components/GithubStarsBadge.svelte';
  import { base } from '$app/paths';

  let { children } = $props();

  const isActive = (path) => {
    const p = $page.url.pathname;
    if (path === '/') return p === '/' || p === '';
    return p === path || p === path + '/' || p.startsWith(path + '/');
  };
</script>

<div class="shell">
  <nav class="topnav">
    <div class="topnav-inner">
      <a class="brand" href="{base}/">
        <div class="brand-avatar" aria-label="Profile picture">
          <img
            src="{base}/trystanx60.jpg"
            alt="Trystan Sarrade"
            width="60"
            height="60"
            decoding="async"
            fetchpriority="high"
          />
        </div>
        <div>
          <div class="brand-name">Trystan Sarrade</div>
          <span class="brand-sub">Senior Software Architect</span>
        </div>
      </a>
      <div class="nav-links">
        <a href="{base}/" class={isActive('/') ? 'is-active' : ''}>Home</a>
        <a
          href="{base}/articles/"
          class={isActive('/articles') ||
          $page.url.pathname.startsWith('/article/') ||
          $page.url.pathname.startsWith('/guide/')
            ? 'is-active'
            : ''}
        >
          Articles
        </a>
        <a href="{base}/projects/" class={isActive('/projects') ? 'is-active' : ''}>Projects</a>
        <a href="{base}/about/" class={isActive('/about') ? 'is-active' : ''}>About</a>
      </div>
      <div class="nav-tools">
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
    </div>
  </nav>

  <main class="shell-main">
    {@render children()}
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="brand">
          <div class="brand-avatar" aria-label="Profile picture">
            <img
              src="{base}/trystanx60.jpg"
              alt="Trystan Sarrade"
              width="60"
              height="60"
              decoding="async"
              loading="lazy"
            />
          </div>
          <div class="brand-name">Trystan Sarrade</div>
        </div>
        <p>Senior software architect writing about systems, teams, and the craft of shipping software that lasts.</p>
      </div>
      <div>
        <h4>Site</h4>
        <ul>
          <li><a href="{base}/">Home</a></li>
          <li><a href="{base}/articles/">Articles</a></li>
          <li><a href="{base}/projects/">Projects</a></li>
          <li><a href="{base}/about/">About</a></li>
        </ul>
      </div>
      <div>
        <h4>Elsewhere</h4>
        <ul>
          <li><a href="https://github.com/Trystan-SA" target="_blank" rel="noopener">GitHub ↗</a></li>
          <li><a href="https://www.linkedin.com/in/trystan-sarrade/" target="_blank" rel="noopener">LinkedIn ↗</a></li>
          <li><a href="mailto:trystansarrade@gmail.com">trystansarrade@gmail.com</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Trystan Sarrade. All writing licensed CC-BY 4.0.</span>
    </div>
  </footer>
</div>
