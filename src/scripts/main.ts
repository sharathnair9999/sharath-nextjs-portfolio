// All client behaviour for the site. Astro bundles this once; the page-load hook
// re-runs per navigation because <ClientRouter /> swaps the DOM instead of reloading.

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function setTheme(next: 'light' | 'dark') {
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage blocked: theme still applies for this page */
    }
  };
  if ('startViewTransition' in document && !reduceMotion()) document.startViewTransition(apply);
  else apply();
}

// Delegated listeners: bound once, survive DOM swaps.
document.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement;

  if (target.closest('[data-theme-toggle]')) {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    return;
  }

  const copy = target.closest<HTMLButtonElement>('[data-copy]');
  if (copy) {
    try {
      await navigator.clipboard.writeText(copy.dataset.copy ?? '');
      copy.dataset.copied = 'true';
      const label = copy.querySelector('[data-copy-label]');
      const original = label?.textContent;
      if (label) label.textContent = copy.dataset.copiedText ?? 'Copied';
      setTimeout(() => {
        delete copy.dataset.copied;
        if (label && original) label.textContent = original;
      }, 1800);
    } catch {
      window.location.href = `mailto:${copy.dataset.copy}`;
    }
    return;
  }

  // Close the mobile menu popover after choosing a link.
  const navLink = target.closest('#mobile-nav a');
  if (navLink) document.getElementById('mobile-nav')?.hidePopover();
});

function initReveal() {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)');
  if (reduceMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => observer.observe(el));
  document.addEventListener('astro:before-swap', () => observer.disconnect(), { once: true });
}

/** Highlights the nav link for the section currently in view. */
function initActiveNav() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const sections = links
    .map((link) => document.getElementById(new URL(link.href).hash.slice(1)))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        links.forEach((link) => {
          const active = new URL(link.href).hash === `#${id}`;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => observer.observe(s));
  document.addEventListener('astro:before-swap', () => observer.disconnect(), { once: true });
}

/** Header border once the page scrolls, and the scroll progress bar under it. */
function initHeaderScroll() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const bar = header.querySelector<HTMLElement>('[data-scroll-progress]');
  let frame = 0;

  const update = () => {
    frame = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    header.toggleAttribute('data-scrolled', window.scrollY > 8);
    if (bar) bar.style.transform = `scaleX(${progress.toFixed(4)})`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener(
    'astro:before-swap',
    () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    },
    { once: true },
  );
}

/** Fills the experience path up to a point just below mid-screen and lights up the stops it has passed. */
function initTimeline() {
  const root = document.querySelector<HTMLElement>('[data-timeline]');
  if (!root) return;
  const stops = [...root.querySelectorAll<HTMLElement>('[data-stop]')];
  let frame = 0;

  const update = () => {
    frame = 0;
    const anchor = window.innerHeight * 0.6;
    const rect = root.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
    root.style.setProperty('--progress', progress.toFixed(4));
    for (const stop of stops) {
      const node = stop.querySelector('[data-node]') ?? stop;
      stop.toggleAttribute('data-active', node.getBoundingClientRect().top + 8 <= anchor);
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener(
    'astro:before-swap',
    () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    },
    { once: true },
  );
}

document.addEventListener('astro:page-load', () => {
  initReveal();
  initTimeline();
  initActiveNav();
  initHeaderScroll();
});
