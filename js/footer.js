(function(){
  const footerHTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div data-logo data-logo-style="height:68px;width:auto;object-fit:contain;background:transparent;" class="footer-logo-wrap"></div>
        <p class="footer-about" style="margin-top:14px;">Free Australian sports and racing tips for horse racing, greyhounds, NBA, NRL, NFL, soccer and more — published every morning, completely free.</p>
        <p class="footer-disclaimer">BBT provides sports and racing analysis for informational purposes only. We do not offer wagering services and do not guarantee outcomes or accuracy. Odds and event details may change at any time.</p>
        <div class="footer-social" style="margin-top:14px">
          <a href="#" class="footer-social-btn">X</a>
          <a href="#" class="footer-social-btn">IG</a>
          <a href="#" class="footer-social-btn">FB</a>
        </div>
      </div>
      <div>
        <p class="footer-col-title">Racing & Sports</p>
        <div class="footer-links">
          <a href="/horse-racing.html" class="footer-link">Horse Racing</a>
          <a href="/greyhounds.html" class="footer-link">Greyhounds</a>
          <a href="/nba.html" class="footer-link">NBA</a>
          <a href="/nrl.html" class="footer-link">NRL</a>
          <a href="/afl.html" class="footer-link">AFL</a>
          <a href="/nfl.html" class="footer-link">NFL</a>
          <a href="/soccer.html" class="footer-link">Soccer</a>
          <a href="/mlb.html" class="footer-link">MLB</a>
          <a href="/ufc.html" class="footer-link">UFC</a>
        </div>
      </div>
      <div>
        <p class="footer-col-title">Information</p>
        <div class="footer-links">
          <a href="/bookmakers.html" class="footer-link">Australian Bookmakers</a>
          <a href="/faq.html" class="footer-link">FAQ</a>
          <a href="/privacy.html" class="footer-link">Privacy Policy</a>
          <a href="/terms.html" class="footer-link">Terms of Service</a>
          <a href="/contact.html" class="footer-link">Contact Us</a>
        </div>
      </div>
      <div>
        <p class="footer-col-title">Free Tips Newsletter</p>
        <form class="footer-newsletter" name="newsletter" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="newsletter">
  <input type="email" name="email" placeholder="Your email address" autocomplete="email" required>
  <button type="submit">Subscribe — It's Free</button>
</form>
        <div style="margin-top:16px;font-size:0.78rem;color:var(--text-dim);line-height:1.7;">
          <strong style="color:var(--slate);font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;">Our Partners</strong><br>
          <div style="margin-top:8px;display:flex;gap:12px">
            <a href="https://www.betfocus.com.au/signup/BBT500" target="_blank" rel="noopener" style="color:var(--teal);font-weight:600;">BetFocus</a>
            <a href="https://www.teambet.com.au/signup/BBT500" target="_blank" rel="noopener" style="color:var(--teal);font-weight:600;">TeamBet</a>
          </div>
          <span style="display:block;margin-top:4px;font-size:0.72rem;">Code: <strong style="color:var(--white);">BBT500</strong></span>
        </div>
        <div style="margin-top:14px;font-size:0.72rem;color:var(--text-dim);line-height:1.65;">
          18+ only. Gamble Responsibly.<br>
          <a href="https://www.gamblinghelponline.org.au" style="color:var(--teal);">GamblingHelpOnline 1800 858 858</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2026 Best Betting Tips. All rights reserved.</p>
      <div class="footer-policy">
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms of Service</a>
        <a href="/faq.html">FAQ</a>
        <a href="/contact.html">Contact Us</a>
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

})();
