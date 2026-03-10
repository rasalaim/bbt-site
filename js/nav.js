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
    <a class="nav-logo" href="/" data-logo data-logo-style="height:68px;width:auto;object-fit:contain;"></a>
    <div class="nav-links desktop-nav">
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
    <div class="mobile-nav" style="display:none;">
      <a class="nav-link" href="/horse-racing.html">🐎 Horse Racing</a>
      <a class="nav-link" href="/greyhounds.html">🐕 Greyhounds</a>
      <a class="nav-link" href="/nba.html">🏀 NBA</a>
      <a class="nav-link" href="/nbl.html">🏀 NBL</a>
      <a class="nav-link" href="/nrl.html">🏉 NRL</a>
      <a class="nav-link" href="/nfl.html">🏈 NFL</a>
      <a class="nav-link" href="/soccer.html">⚽ Soccer</a>
      <a class="nav-link" href="/mlb.html">⚾ MLB</a>
      <a class="nav-link" href="/ufc.html">🥊 UFC</a>
    </div>
    <div class="nav-cta">
      <button class="btn-ghost" id="nav-newsletter-btn">Newsletter</button>
      <a href="/contact.html" class="btn-primary">Contact Us</a>
    </div>
    <div class="nav-mobile-toggle"><span></span><span></span><span></span></div>
  </div>
</nav>`;

  document.body.insertAdjacentHTML('afterbegin', nav);

  document.getElementById('nav-newsletter-btn').addEventListener('click', function(){
    const el = document.getElementById('newsletter-footer');
    if(el){ el.scrollIntoView({behavior:'smooth'}); setTimeout(()=>el.focus(),600); }
  });

  document.querySelector('.nav-mobile-toggle').addEventListener('click', function(){
    const mobileNav = document.querySelector('.mobile-nav');
    const isOpen = mobileNav.style.display === 'flex';
    mobileNav.style.cssText = isOpen
      ? 'display:none;'
      : 'display:flex;flex-direction:column;position:absolute;top:72px;left:0;right:0;background:#1A1735;border-bottom:1px solid rgba(105,116,182,0.18);padding:12px;gap:4px;z-index:99;';
    const spans = this.querySelectorAll('span');
    spans[0].style.transform = isOpen ? '' : 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = isOpen ? '1' : '0';
    spans[2].style.transform = isOpen ? '' : 'rotate(-45deg) translate(5px,-5px)';
  });

})();
