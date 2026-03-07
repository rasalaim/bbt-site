/* ═══════════════════════════════════════════
   BBT — Homepage dynamic card builder
   Reads /data/tips.json and populates all
   section grids automatically.
   ═══════════════════════════════════════════ */

const CAT_CONFIG = {
  horse:      { tag: 'tag-racing',  label: 'Horse Racing', accent: '#CD73AD', gradient: 'linear-gradient(180deg,rgba(205,115,173,0.15),rgba(120,40,80,0.55),rgba(30,10,40,0.85))',  image: '/assets/images/sport-horse.png' },
  greyhounds: { tag: 'tag-grey',    label: 'Greyhounds',   accent: '#80CFD9', gradient: 'linear-gradient(180deg,rgba(128,207,217,0.15),rgba(40,120,130,0.55),rgba(10,50,60,0.85))',  image: '/assets/images/sport-grey.png'  },
  grey:       { tag: 'tag-grey',    label: 'Greyhounds',   accent: '#80CFD9', gradient: 'linear-gradient(180deg,rgba(128,207,217,0.15),rgba(40,120,130,0.55),rgba(10,50,60,0.85))',  image: '/assets/images/sport-grey.png'  },
  nba:        { tag: 'tag-nba',     label: 'NBA',          accent: '#E87840', gradient: 'linear-gradient(180deg,rgba(232,120,64,0.15),rgba(160,60,20,0.55),rgba(80,20,0,0.85))',      image: '/assets/images/sport-nba.png'   },
  nbl:        { tag: 'tag-nba',     label: 'NBL',          accent: '#E87840', gradient: 'linear-gradient(180deg,rgba(232,120,64,0.15),rgba(160,60,20,0.55),rgba(80,20,0,0.85))',      image: '/assets/images/sport-nba.png'   },
  nrl:        { tag: 'tag-nrl',     label: 'NRL',          accent: '#CD73AD', gradient: 'linear-gradient(180deg,rgba(180,100,160,0.15),rgba(120,40,80,0.55),rgba(60,10,40,0.85))',    image: '/assets/images/sport-nrl.png'   },
  nfl:        { tag: 'tag-nfl',     label: 'NFL',          accent: '#60C870', gradient: 'linear-gradient(180deg,rgba(80,180,100,0.15),rgba(40,120,60,0.55),rgba(10,60,20,0.85))',     image: '/assets/images/sport-nfl.png'   },
  soccer:     { tag: 'tag-soccer',  label: 'Soccer',       accent: '#6974B6', gradient: 'linear-gradient(180deg,rgba(105,116,182,0.15),rgba(40,50,120,0.55),rgba(10,15,60,0.85))',    image: '/assets/images/sport-soccer.png'},
  mlb:        { tag: 'tag-mlb',     label: 'MLB',          accent: '#D9BEDB', gradient: 'linear-gradient(180deg,rgba(217,190,219,0.15),rgba(120,100,160,0.55),rgba(60,40,100,0.85))', image: '/assets/images/sport-mlb.png'   },
  ufc:        { tag: 'tag-ufc',     label: 'UFC',          accent: '#E87840', gradient: 'linear-gradient(180deg,rgba(232,120,64,0.15),rgba(160,60,20,0.55),rgba(80,20,0,0.85))',      image: '/assets/images/sport-ufc.png'   },
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch(e) { return dateStr; }
}

function getDayOfWeek(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('en-AU', { weekday: 'long' }).toUpperCase(); }
  catch(e) { return ''; }
}

function starsHTML(confidence) {
  const n = parseInt(confidence) || 0;
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

function extractOdds(tip) {
  const raw = tip.odds || tip.Odds || '';
  if (raw) return raw;
  const match = (tip.analysis || '').match(/@\s*(\d+\.\d+)/);
  return match ? match[1] : '';
}

function imgBlock(cfg, height, day, fontSize) {
  const badge_day = day ? `<div style="position:absolute;bottom:10px;left:0;right:0;text-align:center;font-size:${fontSize}px;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,0.9);font-family:Arial Black,Impact,sans-serif;">${day}</div>` : '';
  return `<div style="position:relative;height:${height}px;overflow:hidden;">
    <div style="position:absolute;inset:0;background-image:url(${cfg.image});background-size:cover;background-position:center top;"></div>
    <div style="position:absolute;inset:0;background:${cfg.gradient};"></div>
    ${badge_day}
  </div>`;
}

function makeCard(tip, featured = false) {
  const cfg = CAT_CONFIG[tip.category] || CAT_CONFIG.nba;
  const url = `/posts/${tip.slug}.html`;
  const date = formatDate(tip.eventDate || tip.date || tip.publishDate);
  const venue = tip.venue || tip.Venue || '';
  const odds = extractOdds(tip);
  const headline = tip.headline || tip.title || '';
  const confidence = tip.confidence || tip.Confidence || 3;
  const day = getDayOfWeek(tip.eventDate || tip.publishDate);
  const badge = odds ? `<div style="position:absolute;top:10px;right:10px;background:${cfg.accent}CC;color:#120F27;font-size:0.78rem;font-weight:800;padding:4px 10px;border-radius:5px;z-index:10;">${odds}</div>` : '';

  if (featured) {
    return `
    <a href="${url}" class="card card-featured">
      <div class="card-img-wrap" style="position:relative;">
        ${imgBlock(cfg, 220, day, 26)}
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
      ${imgBlock(cfg, 160, day, 20)}
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
  const headline = tip.headline || tip.title || '';

  return `
  <a href="${url}" class="card card-list">
    <div style="position:relative;width:80px;height:60px;flex-shrink:0;border-radius:6px;overflow:hidden;border-bottom:3px solid ${cfg.accent};">
      <div style="position:absolute;inset:0;background-image:url(${cfg.image});background-size:cover;background-position:center top;"></div>
      <div style="position:absolute;inset:0;background:${cfg.gradient};"></div>
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
  const badge = odds ? `<div style="position:absolute;top:12px;right:12px;background:${cfg.accent}CC;color:#120F27;font-weight:800;font-size:0.85rem;padding:5px 12px;border-radius:6px;z-index:10;">${odds}</div>` : '';

  return `
  <a href="${url}" class="hero-feature-card" style="display:block;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);text-decoration:none;">
    <div style="position:relative;height:200px;border-bottom:3px solid ${cfg.accent};">
      <div style="position:absolute;inset:0;background-image:url(${cfg.image});background-size:cover;background-position:center top;"></div>
      <div style="position:absolute;inset:0;background:${cfg.gradient};"></div>
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
