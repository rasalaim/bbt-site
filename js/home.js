/* ═══════════════════════════════════════════
   BBT — Homepage dynamic card builder
   Reads /data/tips.json and populates all
   section grids automatically.
   ═══════════════════════════════════════════ */

const OVERLAY = '';

const CAT_CONFIG = {
  horse:      { tag: 'tag-racing',  emoji: '🐎', label: 'Horse Racing', accent: 'var(--pink)',    gradient: 'linear-gradient(135deg,#1E2060,#2B378C,#120F27)', image: '/assets/images/sport-horse.png' },
  greyhounds: { tag: 'tag-grey',    emoji: '🐕', label: 'Greyhounds',   accent: 'var(--teal)',    gradient: 'linear-gradient(135deg,#0a2030,#1a4a55,#120F27)', image: '/assets/images/sport-grey.png' },
  grey:       { tag: 'tag-grey',    emoji: '🐕', label: 'Greyhounds',   accent: 'var(--teal)',    gradient: 'linear-gradient(135deg,#0a2030,#1a4a55,#120F27)', image: '/assets/images/sport-grey.png' },
  nba:        { tag: 'tag-nba',     emoji: '🏀', label: 'NBA',          accent: '#E87840',        gradient: 'linear-gradient(135deg,#1a1040,#2a1a10,#120F27)', image: '/assets/images/sport-nba.png' },
  nrl:        { tag: 'tag-nrl',     emoji: '🏉', label: 'NRL',          accent: '#CD73AD',        gradient: 'linear-gradient(135deg,#1a0a30,#2a1040,#120F27)', image: '/assets/images/sport-nrl.png' },
  nfl:        { tag: 'tag-nfl',     emoji: '🏈', label: 'NFL',          accent: '#60C870',        gradient: 'linear-gradient(135deg,#0a1a10,#102010,#120F27)', image: '/assets/images/sport-nfl.png' },
  soccer:     { tag: 'tag-soccer',  emoji: '⚽', label: 'Soccer',       accent: '#6974B6',        gradient: 'linear-gradient(135deg,#080f18,#101830,#120F27)', image: '/assets/images/sport-soccer.png' },
  mlb:        { tag: 'tag-mlb',     emoji: '⚾', label: 'MLB',          accent: '#D9BEDB',        gradient: 'linear-gradient(135deg,#1a0a20,#201030,#120F27)', image: '/assets/images/sport-mlb.png' },
  ufc:        { tag: 'tag-ufc',     emoji: '🥊', label: 'UFC',          accent: '#E87840',        gradient: 'linear-gradient(135deg,#1a0a10,#2a1010,#120F27)', image: '/assets/images/sport-ufc.png' },
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch(e) { return dateStr; }
}

function extractOdds(tip) {
  const raw = tip.odds || tip.Odds || '';
  if (raw) return raw;
  const match = (tip.analysis || '').match(/@\s*(\d+\.\d+)/);
  return match ? match[1] : '';
}

function starsHTML(confidence) {
  const n = parseInt(confidence) || 0;
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function makeCard(tip, featured = false) {
  const cfg = CAT_CONFIG[tip.category] || CAT_CONFIG.nba;
  const url = `/posts/${tip.slug}.html`;
  const date = formatDate(tip.eventDate || tip.date || tip.publishDate);
  const venue = tip.venue || tip.Venue || '';
  const odds = extractOdds(tip);
  const headline = tip.headline || tip.title || '';
  const confidence = tip.confidence || tip.Confidence || 3;
  const badge = odds ? `<div style="position:absolute;top:10px;right:10px;background:rgba(0,0,0,0.75);color:#fff;font-size:0.78rem;font-weight:700;padding:4px 10px;border-radius:5px;z-index:10;">${odds}</div>` : '';

  if (featured) {
    return `
    <a href="${url}" class="card card-featured">
      <div class="card-img-wrap" style="position:relative;">
        <div class="card-img-placeholder" style="background:url('${cfg.image}') center top/cover no-repeat;height:220px;--placeholder-accent:${cfg.accent}"></div>
        ${badge}
      </div>
      <div class="card-body">
        <span class="tag ${cfg.tag} card-tag">${cfg.label}</span>
        <h3 class="card-title">${headline}</h3>
        <p class="card-excerpt">${tip.analysis || ''}</p>
        <div class="card-meta">
          <span>${date}</span>
          ${venue ? `<span class="card-meta-dot"></span><span>${venue}</span>` : ''}
          <span class="card-meta-dot"></span>
          <span style="color:#FFB800;font-size:0.7rem">${starsHTML(confidence)}</span>
        </div>
      </div>
    </a>`;
  }

  return `
  <a href="${url}" class="card">
    <div class="card-img-wrap" style="position:relative;">
      <div class="card-img-placeholder" style="background:url('${cfg.image}') center top/cover no-repeat;height:160px;--placeholder-accent:${cfg.accent}"></div>
      ${badge}
    </div>
    <div class="card-body">
      <span class="tag ${cfg.tag} card-tag">${cfg.label}</span>
      <h3 class="card-title">${headline}</h3>
      <div class="card-meta">
        <span>${date}</span>
        ${venue ? `<span class="card-meta-dot"></span><span>${venue}</span>` : ''}
      </div>
    </div>
  </a>`;
}

function makeListCard(tip) {
  const cfg = CAT_CONFIG[tip.category] || CAT_CONFIG.nba;
  const url = `/posts/${tip.slug}.html`;
  const date = formatDate(tip.eventDate || tip.date || tip.publishDate);
  const venue = tip.venue || tip.Venue || '';
  const headline = tip.headline || tip.title || '';

  return `
  <a href="${url}" class="card card-list">
    <div class="card-img-wrap" style="width:80px;height:60px;flex-shrink:0;">
      <div style="background:url('${cfg.image}') center top/cover no-repeat;width:100%;height:100%;border-radius:6px;border-bottom:3px solid ${cfg.accent};"></div>
    </div>
    <div class="card-body">
      <span class="tag ${cfg.tag} card-tag">${cfg.label}</span>
      <h3 class="card-title">${headline}</h3>
      <div class="card-meta"><span>${date}</span></div>
    </div>
  </a>`;
}

function makeFeaturedHero(tip) {
  const cfg = CAT_CONFIG[tip.category] || CAT_CONFIG.nba;
  const url = `/posts/${tip.slug}.html`;
  const date = formatDate(tip.eventDate || tip.date || tip.publishDate);
  const venue = tip.venue || tip.Venue || '';
  const odds = extractOdds(tip);
  const headline = tip.headline || tip.title || '';
  const confidence = tip.confidence || tip.Confidence || 3;
  const badge = odds ? `<div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.75);color:#fff;font-weight:800;font-size:0.85rem;padding:5px 12px;border-radius:6px;z-index:10;">${odds}</div>` : '';

  return `
  <a href="${url}" class="hero-feature-card" style="display:block;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);text-decoration:none;">
    <div style="position:relative;background:url('${cfg.image}') center top/cover no-repeat;height:200px;border-bottom:3px solid ${cfg.accent};">
      ${badge}
    </div>
    <div style="background:#13112a;padding:18px;">
      <span class="tag ${cfg.tag}" style="margin-bottom:8px;display:inline-block;">${cfg.label}</span>
      <div style="font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.4">${headline}</div>
      <div style="font-size:0.75rem;color:#7880AA;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
        <span>${date}</span><span>·</span><span>${venue}</span><span>·</span>
        <span style="color:#FFB800">${starsHTML(confidence)}</span>
      </div>
    </div>
  </a>`;
}

function emptyState(label) {
  return `<div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--text-dim)">
    <p style="font-size:0.9rem">No ${label} tips yet — check back soon.</p>
  </div>`;
}

// ── Load and render ───────────────────────────────────────────
fetch('/data/tips.json?v=' + Date.now())
  .then(r => r.json())
  .then(data => {
    const tips = Array.isArray(data) ? data : (data.tips || []);
    tips.sort((a, b) => new Date(b.publishDate||b.publishedAt||0) - new Date(a.publishDate||a.publishedAt||0));

    const heroEl = document.getElementById('hero-featured');
    if (heroEl && tips.length > 0) heroEl.innerHTML = makeFeaturedHero(tips[0]);

    const latestEl = document.getElementById('latest-grid');
    if (latestEl && tips.length > 0) {
      const side = tips.slice(1, 4);
      latestEl.innerHTML = `
        ${makeCard(tips[0], true)}
        <div class="grid-featured-right">
          ${side.map(t => makeCard(t)).join('')}
        </div>`;
    } else if (latestEl) {
      latestEl.innerHTML = emptyState('latest');
    }

    const sections = [
      { id: 'grid-horse',  cats: ['horse'],             max: 4, list: false },
      { id: 'grid-grey',   cats: ['grey','greyhounds'], max: 4, list: false },
      { id: 'grid-nba',    cats: ['nba'],               max: 4, list: false },
      { id: 'grid-nrl',    cats: ['nrl'],               max: 4, list: false },
      { id: 'grid-nfl',    cats: ['nfl'],               max: 4, list: true  },
      { id: 'grid-soccer', cats: ['soccer'],            max: 4, list: true  },
    ];

    sections.forEach(({ id, cats, max, list }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const filtered = tips.filter(t => cats.includes(t.category)).slice(0, max);
      el.innerHTML = filtered.length === 0
        ? emptyState(cats[0])
        : filtered.map(t => list ? makeListCard(t) : makeCard(t)).join('');
    });
  })
  .catch(err => console.warn('Could not load tips.json:', err));
