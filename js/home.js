/* ═══════════════════════════════════════════
   BBT — Homepage dynamic card builder
   Reads /data/tips.json and populates all
   section grids automatically.
   ═══════════════════════════════════════════ */

const OVERLAY = 'linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.3) 60%,rgba(0,0,0,0.7) 100%)';

const CAT_CONFIG = {
  horse:      { tag: 'tag-racing',  label: 'Horse Racing', accent: '#CD73AD', images: 5, key: 'horse'  },
  greyhounds: { tag: 'tag-grey',    label: 'Greyhounds',   accent: '#80CFD9', images: 5, key: 'grey'   },
  grey:       { tag: 'tag-grey',    label: 'Greyhounds',   accent: '#80CFD9', images: 5, key: 'grey'   },
  nba:        { tag: 'tag-nba',     label: 'NBA',          accent: '#E87840', images: 5, key: 'nba'    },
  nbl:        { tag: 'tag-nbl',     label: 'NBL',          accent: '#E87840', images: 5, key: 'nbl'    },
  nrl:        { tag: 'tag-nrl',     label: 'NRL',          accent: '#CD73AD', images: 5, key: 'nrl'    },
  afl:        { tag: 'tag-afl',     label: 'AFL',          accent: '#2166C4', images: 5, key: 'afl'    },
  nfl:        { tag: 'tag-nfl',     label: 'NFL',          accent: '#60C870', images: 2, key: 'nfl'    },
  soccer:     { tag: 'tag-soccer',  label: 'Soccer',       accent: '#6974B6', images: 5, key: 'soccer' },
  mlb:        { tag: 'tag-mlb',     label: 'MLB',          accent: '#D9BEDB', images: 5, key: 'mlb'    },
  ufc:        { tag: 'tag-ufc',     label: 'UFC',          accent: '#E87840', images: 5, key: 'ufc'    },
};

function cleanText(str) {
  return (str || '').replace(/[^\x00-\x7F]/g, '').replace(/\s+/g, ' ').trim();
}

function getImage(cfg, slug, customPath) {
  if (customPath) return '/' + customPath;
  const hash = (slug || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const num = (hash % cfg.images) + 1;
  return '/assets/images/sport-' + cfg.key + '-' + num + '.png';
}

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
  if (raw) return raw.startsWith('$') ? raw : '$' + raw;
  return '';
}

function imgBlock(cfg, slug, height, day, fontSize, customPath) {
  const image = getImage(cfg, slug, customPath);
  const badge_day = day ? '<div style="position:absolute;bottom:10px;left:0;right:0;text-align:center;font-size:' + fontSize + 'px;font-weight:900;color:#fff;letter-spacing:4px;text-transform:uppercase;text-shadow:0 2px 8px rgba(0,0,0,0.9);font-family:Arial Black,Impact,sans-serif;">' + day + '</div>' : '';
  return '<div style="position:relative;height:' + height + 'px;overflow:hidden;">' +
    '<div style="position:absolute;inset:0;background-image:url(' + image + ');background-size:cover;background-position:center top;"></div>' +
    '<div style="position:absolute;inset:0;background:' + OVERLAY + ';"></div>' +
    badge_day +
    '</div>';
}

function makeCard(tip, featured) {
  featured = featured || false;
  const cfg = CAT_CONFIG[tip.category] || CAT_CONFIG.horse;
  const url = '/posts/' + tip.slug + '.html';
  const date = formatDate(tip.eventDate || tip.date || tip.publishDate);
  const venue = tip.venue || tip.Venue || '';
  const odds = extractOdds(tip);
  const headline = cleanText(tip.headline || tip.title);
  const confidence = tip.confidence || tip.Confidence || 3;
  const day = tip.imageText || getDayOfWeek(tip.eventDate || tip.publishDate);
  const analysis = cleanText(tip.analysis);
  const badge = odds ? '<div style="position:absolute;top:10px;right:10px;background:' + cfg.accent + 'CC;color:#120F27;font-size:0.78rem;font-weight:800;padding:4px 10px;border-radius:5px;z-index:10;">Top Tip ' + odds + '</div>' : '';

  if (featured) {
    return '<a href="' + url + '" class="card card-featured">' +
      '<div class="card-img-wrap" style="position:relative;">' + imgBlock(cfg, tip.slug, 220, day, 26, tip.imagePath) + badge + '</div>' +
      '<div class="card-body">' +
        '<span class="tag ' + cfg.tag + ' card-tag">' + cfg.label + '</span>' +
        '<h3 class="card-title">' + headline + '</h3>' +
        (analysis ? '<p class="card-excerpt">' + analysis + '</p>' : '') +
        '<div class="card-meta">' +
          '<span>' + date + '</span>' +
          (venue ? '<span class="card-meta-dot"></span><span>' + venue + '</span>' : '') +
          '<span class="card-meta-dot"></span>' +
          '<span style="color:#FFB800;font-size:0.7rem">' + starsHTML(confidence) + '</span>' +
        '</div>' +
      '</div>' +
    '</a>';
  }

  return '<a href="' + url + '" class="card">' +
    '<div class="card-img-wrap" style="position:relative;">' + imgBlock(cfg, tip.slug, 160, day, 20, tip.imagePath) + badge + '</div>' +
    '<div class="card-body">' +
      '<span class="tag ' + cfg.tag + ' card-tag">' + cfg.label + '</span>' +
      '<h3 class="card-title">' + headline + '</h3>' +
      '<div class="card-meta">' +
        '<span>' + date + '</span>' +
        (venue ? '<span class="card-meta-dot"></span><span>' + venue + '</span>' : '') +
      '</div>' +
    '</div>' +
  '</a>';
}

function makeListCard(tip) {
  const cfg = CAT_CONFIG[tip.category] || CAT_CONFIG.horse;
  const url = '/posts/' + tip.slug + '.html';
  const date = formatDate(tip.eventDate || tip.date || tip.publishDate);
  const headline = cleanText(tip.headline || tip.title);
  const image = getImage(cfg, tip.slug, tip.imagePath);

  return '<a href="' + url + '" class="card card-list">' +
    '<div style="position:relative;width:80px;height:60px;flex-shrink:0;border-radius:6px;overflow:hidden;border-bottom:3px solid ' + cfg.accent + ';">' +
      '<div style="position:absolute;inset:0;background-image:url(' + image + ');background-size:cover;background-position:center top;"></div>' +
      '<div style="position:absolute;inset:0;background:' + OVERLAY + ';"></div>' +
    '</div>' +
    '<div class="card-body">' +
      '<span class="tag ' + cfg.tag + ' card-tag">' + cfg.label + '</span>' +
      '<h3 class="card-title">' + headline + '</h3>' +
      '<div class="card-meta"><span>' + date + '</span></div>' +
    '</div>' +
  '</a>';
}

function makeFeaturedHero(tip) {
  const cfg = CAT_CONFIG[tip.category] || CAT_CONFIG.horse;
  const url = '/posts/' + tip.slug + '.html';
  const date = formatDate(tip.eventDate || tip.date || tip.publishDate);
  const venue = tip.venue || tip.Venue || '';
  const odds = extractOdds(tip);
  const headline = cleanText(tip.headline || tip.title);
  const confidence = tip.confidence || tip.Confidence || 3;
  const day = tip.imageText || getDayOfWeek(tip.eventDate || tip.publishDate);
  const image = getImage(cfg, tip.slug, tip.imagePath);
  const badge = odds ? '<div style="position:absolute;top:12px;right:12px;background:' + cfg.accent + 'CC;color:#120F27;font-weight:800;font-size:0.85rem;padding:5px 12px;border-radius:6px;z-index:10;">Top Tip ' + odds + '</div>' : '';
  const dayText = day ? '<div style="position:absolute;bottom:14px;left:0;right:0;text-align:center;font-size:28px;font-weight:900;color:#fff;letter-spacing:5px;text-transform:uppercase;text-shadow:0 2px 12px rgba(0,0,0,0.9);font-family:Arial Black,Impact,sans-serif;">' + day + '</div>' : '';

  return '<a href="' + url + '" class="hero-feature-card" style="display:block;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);text-decoration:none;">' +
    '<div style="position:relative;height:200px;border-bottom:3px solid ' + cfg.accent + ';">' +
      '<div style="position:absolute;inset:0;background-image:url(' + image + ');background-size:cover;background-position:center top;"></div>' +
      '<div style="position:absolute;inset:0;background:' + OVERLAY + ';"></div>' +
      dayText + badge +
    '</div>' +
    '<div style="background:#13112a;padding:18px;">' +
      '<span class="tag ' + cfg.tag + '" style="margin-bottom:8px;display:inline-block;">' + cfg.label + '</span>' +
      '<div style="font-size:1rem;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.4">' + headline + '</div>' +
      '<div style="font-size:0.75rem;color:#7880AA;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">' +
        '<span>' + date + '</span><span>·</span><span>' + venue + '</span><span>·</span>' +
        '<span style="color:#FFB800">' + starsHTML(confidence) + '</span>' +
      '</div>' +
    '</div>' +
  '</a>';
}

function emptyState(label) {
  return '<div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--text-dim)">' +
    '<p style="font-size:0.9rem">No ' + label + ' tips yet — check back soon.</p>' +
  '</div>';
}

// ── Load and render ───────────────────────────────────────────
fetch('/data/tips.json?v=' + Date.now())
  .then(function(r) { return r.json(); })
  .then(function(data) {
    const tips = Array.isArray(data) ? data : (data.tips || []);
    tips.sort(function(a, b) { return new Date(b.publishDate||b.publishedAt||0) - new Date(a.publishDate||a.publishedAt||0); });

    const heroEl = document.getElementById('hero-featured');
    if (heroEl && tips.length > 0) heroEl.innerHTML = makeFeaturedHero(tips[0]);

    const latestEl = document.getElementById('latest-grid');
    if (latestEl && tips.length > 0) {
      const left = tips.slice(0, 2);
      const right = tips.slice(2, 5);
      latestEl.innerHTML =
        '<div class="grid-featured-left">' + left.map(function(t) { return makeCard(t, true); }).join('') + '</div>' +
        '<div class="grid-featured-right">' + right.map(function(t) { return makeCard(t); }).join('') + '</div>';
    } else if (latestEl) {
      latestEl.innerHTML = emptyState('latest');
    }

    const sections = [
      { id: 'grid-horse',  cats: ['horse'],             max: 4, list: false },
      { id: 'grid-grey',   cats: ['grey','greyhounds'], max: 4, list: false },
      { id: 'grid-nba',    cats: ['nba'],               max: 4, list: false },
      { id: 'grid-nbl',    cats: ['nbl'],               max: 4, list: false },
      { id: 'grid-nrl',    cats: ['nrl'],               max: 4, list: false },
      { id: 'grid-afl',    cats: ['afl'],               max: 4, list: false },
      { id: 'grid-nfl',    cats: ['nfl'],               max: 4, list: true  },
      { id: 'grid-soccer', cats: ['soccer'],            max: 4, list: true  },
    ];

    sections.forEach(function(s) {
      const el = document.getElementById(s.id);
      if (!el) return;
      const filtered = tips.filter(function(t) { return s.cats.includes(t.category); }).slice(0, s.max);
      el.innerHTML = filtered.length === 0
        ? emptyState(s.cats[0])
        : filtered.map(function(t) { return s.list ? makeListCard(t) : makeCard(t); }).join('');
    });
  })
  .catch(function(err) { console.warn('Could not load tips.json:', err); });
