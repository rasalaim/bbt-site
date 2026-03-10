/* ═══════════════════════════════════════════
   BBT — Shared JS (nav, ticker, interactions)
   ═══════════════════════════════════════════ */
// ── Logo injection ────────────────────────────────────────────
document.querySelectorAll('[data-logo]').forEach(el => {
  const img = document.createElement('img');
  img.src = BBT_LOGO;
  img.alt = 'Best Betting Tips';
  img.style.cssText = el.dataset.logoStyle || '';
  el.appendChild(img);
});
// ── Mobile nav toggle ────────────────────────────────────────
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle && navLinks) {
  let open = false;
  mobileToggle.addEventListener('click', () => {
    open = !open;
    navLinks.style.cssText = open
      ? 'display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:#1A1735;border-bottom:1px solid rgba(105,116,182,0.18);padding:12px;gap:4px;z-index:99;'
      : '';
    mobileToggle.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
    mobileToggle.querySelectorAll('span')[1].style.opacity  = open ? '0' : '1';
    mobileToggle.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
}
// ── Mobile Sports dropdown toggle ────────────────────────────
const navDropdown = document.querySelector('.nav-dropdown');
if (navDropdown) {
  const dropdownLink = navDropdown.querySelector('.nav-link');
  const dropdownMenu = navDropdown.querySelector('.dropdown-menu');
  if (dropdownLink && dropdownMenu) {
    dropdownLink.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const isOpen = dropdownMenu.style.display === 'flex';
        dropdownMenu.style.cssText = isOpen
          ? ''
          : 'display:flex;flex-direction:column;position:static;opacity:1;visibility:visible;transform:none;background:rgba(105,116,182,0.08);border-radius:8px;padding:6px;margin-top:4px;';
      }
    });
  }
}
// ── Active nav link ───────────────────────────────────────────
const path = window.location.pathname;
document.querySelectorAll('.nav-link, .dropdown-item').forEach(el => {
  const href = el.getAttribute('href');
  if (href && path.includes(href) && href !== '/' && href !== 'index.html') {
    el.classList.add('active');
  }
});
// ── Newsletter form ───────────────────────────────────────────
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const input = form.querySelector('input');
    if (!input.value.includes('@')) return;
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#27AE60';
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  });
});
// ── Smooth fade-in on scroll ──────────────────────────────────
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.card, .sidebar-widget, .tip-box').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateY(16px);transition:opacity 0.45s ease,transform 0.45s ease;';
    io.observe(el);
  });
}
