(function(){
  const nav = `
<div class="ticker-bar">
  <div class="ticker-inner">
    <span class="ticker-item"><span class="ticker-dot accent-horse"></span>Horse Racing</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot" style="background:var(--teal)"></span>Greyhounds</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nba"></span>NBA</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nbl"></span>NBL</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nrl"></span>NRL</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nfl"></span>NFL</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot" style="background:var(--slate)"></span>Soccer</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-horse"></span>Horse Racing</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot" style="background:var(--teal)"></span>Greyhounds</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nba"></span>NBA</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nbl"></span>NBL</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nrl"></span>NRL</span>
  </div>
</div>
<nav class="navbar">
  <div class="nav-inner">
    <a class="nav-logo" href="/" data-logo data-logo-style="height:52px;width:auto;object-fit:contain;"></a>
    <div class="nav-links">
      <div class="nav-dropdown">
        <span class="nav-link">Sports <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></span>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="/nba.html">🏀 NBA</a>
          <a class="dropdown-item" href="/nbl.html">🏀 NBL</a>
          <a class="dropdown-item" href="/nrl.html">🏉 NRL</a>
          <a class="dropdown-item" href="/nfl.html">🏈 NFL</a>
          <a class="dropdown-item" href="/soccer.html">⚽ Soccer</a>
          <a class="dropdown-item" href="/mlb.html">⚾ MLB</a>
          <a class="dropdown-item" href="/ufc.html">🥊 UFC</a>
        </div>
      </div>
      <a class="nav-link" href="/horse-racing.html">Horse Racing</a>
      <a class="nav-link" href="/greyhounds.html">Greyhounds</a>
      <a class="nav-link" href="/nba.html">NBA</a>
      <a class="nav-link" href="/nbl.html">NBL</a>
      <a class="nav-link" href="/nrl.html">NRL</a>
    </div>
    <div class="nav-cta">
      <button class="btn-ghost" id="nav-newsletter-btn">Newsletter</button>
      <a href="/contact.html" class="btn-primary">Contact Us</a>
    </div>
    <div class="nav-mobile-toggle"><span></span><span></span><span></span></div>
  </div>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', nav);

  // Newsletter scroll
  document.getElementById('nav-newsletter-btn').addEventListener('click', function(){
    const el = document.getElementById('newsletter-footer');
    if(el){ el.scrollIntoView({behavior:'smooth'}); setTimeout(()=>el.focus(),600); }
  });

  // Mobile toggle
  document.querySelector('.nav-mobile-toggle').addEventListener('click', function(){
    document.querySelector('.nav-links').classList.toggle('nav-open');
  });
})();
