(function(){
  const footerHTML = `
<footer class="footer" style="font-family:'Montserrat',sans-serif;">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div data-logo data-logo-style="height:52px;width:auto;object-fit:contain;background:transparent;" class="footer-logo-wrap"></div>
        <p class="footer-about" style="margin-top:14px;font-family:'Montserrat',sans-serif;">Free Australian sports and racing tips for horse racing, greyhounds, NBA, NRL, NFL, soccer and more — published every morning, completely free.</p>
        <p class="footer-disclaimer" style="font-family:'Montserrat',sans-serif;">BBT provides sports and racing analysis for informational purposes only. We do not offer wagering services and do not guarantee outcomes or accuracy. Odds and event details may change at any time.</p>
        <div class="footer-social" style="margin-top:14px">
          <a href="#" class="footer-social-btn">X</a>
          <a href="#" class="footer-social-btn">IG</a>
          <a href="#" class="footer-social-btn">FB</a>
        </div>
      </div>
      <div>
        <p class="footer-col-title" style="font-family:'Montserrat',sans-serif;">Racing & Sports</p>
        <div class="footer-links">
          <a href="/horse-racing.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">Horse Racing</a>
          <a href="/greyhounds.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">Greyhounds</a>
          <a href="/nba.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">NBA</a>
          <a href="/nrl.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">NRL</a>
          <a href="/nfl.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">NFL</a>
          <a href="/soccer.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">Soccer</a>
          <a href="/mlb.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">MLB</a>
          <a href="/ufc.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">UFC</a>
        </div>
      </div>
      <div>
        <p class="footer-col-title" style="font-family:'Montserrat',sans-serif;">Information</p>
        <div class="footer-links">
          <a href="/bookmakers.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">Australian Bookmakers</a>
          <a href="/faq.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">FAQ</a>
          <a href="/privacy.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">Privacy Policy</a>
          <a href="/terms.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">Terms of Service</a>
          <a href="/contact.html" class="footer-link" style="font-family:'Montserrat',sans-serif;">Contact Us</a>
        </div>
      </div>
      <div>
        <p class="footer-col-title" style="font-family:'Montserrat',sans-serif;">Free Tips Newsletter</p>
        <form class="footer-newsletter" id="footer-newsletter-form" onsubmit="return false">
          <input type="email" id="newsletter-footer" placeholder="Your email address" autocomplete="email" style="font-family:'Montserrat',sans-serif;">
          <button type="submit" style="font-family:'Montserrat',sans-serif;">Subscribe — It's Free</button>
        </form>
        <div style="margin-top:16px;font-size:0.78rem;color:var(--text-dim);line-height:1.7;font-family:'Montserrat',sans-serif;">
          <strong style="color:var(--slate);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;font-family:'Montserrat',sans-serif;">Our Partners</strong><br>
          <div style="margin-top:8px;display:flex;gap:12px">
            <a href="https://www.betfocus.com.au/signup/BBT500" target="_blank" rel="noopener" style="color:var(--teal);font-weight:600;font-family:'Montserrat',sans-serif;">BetFocus</a>
            <a href="https://www.teambet.com.au/signup/BBT500" target="_blank" rel="noopener" style="color:var(--teal);font-weight:600;font-family:'Montserrat',sans-serif;">TeamBet</a>
          </div>
          <span style="display:block;margin-top:4px;font-size:0.72rem;font-family:'Montserrat',sans-serif;">Code: <strong style="color:var(--white);font-family:'Montserrat',sans-serif;">BBT500</strong></span>
        </div>
        <div style="margin-top:14px;font-size:0.72rem;color:var(--text-dim);line-height:1.65;font-family:'Montserrat',sans-serif;">
          18+ only. Gamble Responsibly.<br>
          <a href="https://www.gamblinghelponline.org.au" style="color:var(--teal);font-family:'Montserrat',sans-serif;">GamblingHelpOnline 1800 858 858</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy" style="font-family:'Montserrat',sans-serif;">© 2026 Best Betting Tips. All rights reserved.</p>
      <div class="footer-policy">
        <a href="/privacy.html" style="font-family:'Montserrat',sans-serif;">Privacy Policy</a>
        <a href="/terms.html" style="font-family:'Montserrat',sans-serif;">Terms of Service</a>
        <a href="/faq.html" style="font-family:'Montserrat',sans-serif;">FAQ</a>
        <a href="/contact.html" style="font-family:'Montserrat',sans-serif;">Contact Us</a>
      </div>
    </div>
  </div>
</footer>`;

  // Inject into #site-footer if present, otherwise append to body
  const target = document.getElementById('site-footer');
  if (target) {
    target.innerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  // Newsletter form
  const newsletterForm = document.getElementById('footer-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(){
      const btn = this.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = 'var(--teal)';
      btn.style.color = '#000';
      this.querySelector('input').value = '';
    });
  }

  // Re-run logo injection for footer
  if (window.BBT_LOGO) {
    document.querySelectorAll('[data-logo]').forEach(el => {
      if (!el.querySelector('img')) {
        const img = document.createElement('img');
        img.src = window.BBT_LOGO;
        const s = el.getAttribute('data-logo-style') || '';
        img.setAttribute('style', s + ';background:transparent;mix-blend-mode:screen;');
        el.appendChild(img);
      }
    });
  }
})();
