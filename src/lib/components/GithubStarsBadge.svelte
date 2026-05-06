<script>
  import Icons from './icons.svelte';

  let { user } = $props();
  let stars = $state(null);
  let error = $state(false);

  $effect(() => {
    let cancelled = false;
    (async () => {
      try {
        let total = 0;
        let page = 1;
        for (let i = 0; i < 5; i++) {
          const res = await fetch(
            `https://api.github.com/users/${user}/repos?per_page=100&page=${page}&type=owner&sort=updated`
          );
          if (!res.ok) throw new Error('gh fetch failed');
          const data = await res.json();
          if (!Array.isArray(data) || data.length === 0) break;
          total += data.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
          if (data.length < 100) break;
          page++;
        }
        if (!cancelled) stars = total;
      } catch (e) {
        if (!cancelled) error = true;
      }
    })();
    return () => {
      cancelled = true;
    };
  });
</script>

<a
  href={`https://github.com/${user}`}
  target="_blank"
  rel="noopener"
  class="gh-stars-badge"
  title="Total stars across all my GitHub repos"
>
  <Icons name="github" />
  <span class="gh-meta">
    <span class="gh-stars-icon"><Icons name="star" /></span>
    <span class="gh-stars-num">
      {error ? '—' : stars === null ? '…' : stars.toLocaleString()}
    </span>
  </span>
</a>
