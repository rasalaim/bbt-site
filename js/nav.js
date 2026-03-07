(function(){
  const nav = `
<div class="ticker-bar">
  <div class="ticker-inner">
    <span class="ticker-item"><span class="ticker-dot accent-horse"></span>Horse Racing</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot" style="background:var(--teal)"></span>Greyhounds</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nba"></span>NBA</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nrl"></span>NRL</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nfl"></span>NFL</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot" style="background:var(--slate)"></span>Soccer</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-horse"></span>Horse Racing</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot" style="background:var(--teal)"></span>Greyhounds</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nba"></span>NBA</span><span class="ticker-divider">·</span>
    <span class="ticker-item"><span class="ticker-dot accent-nrl"></span>NRL</span>
  </div>
</div>
<nav class="navbar">
  <div class="nav-inner">
    <a class="nav-logo" href="/" data-logo data-logo-style="height:52px;width:auto;object-fit:contain;"></a>
    <div class="nav-links">
      <a class="nav-link" href="/horse-racing.html">Horse Racing</a>
      <a class="nav-link" href="/greyhounds.html">Greyhounds</a>
      <a class="nav-link" href="/nba.html">NBA</a>
      <a class="nav-link" href="/nrl.html">NRL</a>
      <a class="nav-link" href="/nfl.html">NFL</a>
      <a class="nav-link" href="/soccer.html">Soccer</a>
    </div>
    <div class="nav-cta">
      <a href="/" class="btn-primary">Free Tips ↗</a>
    </div>
    <div class="nav-mobile-toggle"><span></span><span></span><span></span></div>
  </div>
</nav>`;

  const target = document.getElementById('site-nav');
  if (target) {
    target.innerHTML = nav;
  } else {
    document.body.insertAdjacentHTML('afterbegin', nav);
  }

  // Mobile toggle
  document.querySelector('.nav-mobile-toggle').addEventListener('click', function(){
    document.querySelector('.nav-links').classList.toggle('nav-open');
  });
})();
