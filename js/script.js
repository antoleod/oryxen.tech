/* ============================================================
   ORYXEN LABS — script.js v2.0
   Handles: theme, nav, scroll reveal, active nav, back-to-top, contact form
   ============================================================ */
(function () {
  'use strict';
  /* ── Helpers ── */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  /* ============================================================
     1. THEME
  ============================================================ */
  const THEME_KEY = 'oryxen-theme';
  const root      = document.documentElement;
  const themeBtn  = $('#theme-toggle');
  function normalizeTheme (theme) {
    if (theme === 'white') return 'light';
    if (theme === 'light' || theme === 'dark') return theme;
    return null;
  }
  function getStoredTheme () {
    const stored = normalizeTheme(localStorage.getItem(THEME_KEY));
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  function applyTheme (theme) {
    const resolved = normalizeTheme(theme) || 'dark';
    root.setAttribute('data-theme', resolved);
    localStorage.setItem(THEME_KEY, resolved);
    if (themeBtn) themeBtn.setAttribute('aria-label', resolved === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', resolved === 'light' ? '#ffffff' : '#0a0a0f');
  }
  applyTheme(getStoredTheme());
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
  /* ============================================================
     2. NAVIGATION — mobile drawer
  ============================================================ */
  const navToggle  = $('#nav-toggle');
  const navClose   = $('#nav-close');
  const navMenu    = $('#nav-menu');
  const navOverlay = $('#nav-overlay');
  function openNav () {
    navMenu?.classList.add('open');
    navOverlay?.classList.add('open');
    navToggle?.setAttribute('aria-expanded', 'true');
    navMenu?.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('main')?.setAttribute('inert', '');
    document.querySelector('footer')?.setAttribute('inert', '');
    setTimeout(() => navClose?.focus(), 50);
  }
  function closeNav () {
    navMenu?.classList.remove('open');
    navOverlay?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.getElementById('main')?.removeAttribute('inert');
    document.querySelector('footer')?.removeAttribute('inert');
    navToggle?.focus();
  }
  
  navMenu?.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !navMenu.classList.contains('open')) return;
    const focusable = [...navMenu.querySelectorAll(
      'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.closest('[aria-hidden="true"]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
  navToggle?.addEventListener('click',  openNav);
  navClose?.addEventListener('click',   closeNav);
  navOverlay?.addEventListener('click', closeNav);
  
  $$('[data-nav]').forEach(link => link.addEventListener('click', closeNav));
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu?.classList.contains('open')) closeNav();
  });
  /* ============================================================
     3. ACTIVE NAV LINK (Intersection Observer)
  ============================================================ */
  const sections  = $$('section[id]');
  const navLinks  = $$('.nav__link[data-nav]');
  function setActive (id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${id}`);
    });
  }
  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
  }
  /* ============================================================
     4. SCROLL REVEAL
  ============================================================ */
  const revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || '0';
          entry.target.style.transitionDelay = `${parseInt(delay, 10) * 0.08}s`;
          entry.target.classList.add('revealed');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });
    revealEls.forEach(el => revealIO.observe(el));
    window.__revealIO = revealIO;
  } else {
    
    revealEls.forEach(el => el.classList.add('revealed'));
  }
  /* ============================================================
     5. BACK TO TOP
  ============================================================ */
  const backToTop = $('#back-to-top');
  if (backToTop) {
    const toggleBackToTop = () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop();
  }
  /* ============================================================
     6. STICKY HEADER shadow on scroll
  ============================================================ */
  const header = $('#header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  /* ============================================================
     7. CONTACT FORM — client-side validation + mailto fallback
  ============================================================ */
  const form       = $('#contact-form');
  const statusEl   = $('#form-status');
  const submitBtn  = $('#contact-submit');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      
      if ($('[name="_gotcha"]')?.value) return;
      const name    = $('#cf-name')?.value.trim();
      const email   = $('#cf-email')?.value.trim();
      const subject = $('#cf-subject')?.value.trim();
      const message = $('#cf-message')?.value.trim();
      
      let hasError = false;
      [['cf-name', name], ['cf-email', email], ['cf-message', message]].forEach(([id, val]) => {
        const input = document.getElementById(id);
        const group = input?.closest('.form-group');
        if (group) group.classList.toggle('field-error', !val);
        if (input) input.setAttribute('aria-invalid', val ? 'false' : 'true');
        if (!val) hasError = true;
      });
      if (hasError) {
        showStatus('error', '⚠ Please fill in all required fields.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const emailEl = document.getElementById('cf-email');
        emailEl?.closest('.form-group')?.classList.add('field-error');
        emailEl?.setAttribute('aria-invalid', 'true');
        showStatus('error', '⚠ Please enter a valid email address.');
        return;
      }
      
      form.querySelectorAll('.field-error').forEach(el => {
        el.classList.remove('field-error');
        el.querySelector('input,textarea')?.setAttribute('aria-invalid', 'false');
      });
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Opening email client…</span>';
      }
      
      const mailSubject = encodeURIComponent(subject || `[Oryxen Labs] Message from ${name}`);
      const body        = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:jdioses@outlook.be?subject=${mailSubject}&body=${body}`;
      showStatus('info', 'Opening your email client… If nothing happens, <a href="mailto:jdioses@outlook.be" style="color:inherit;text-decoration:underline">email us directly</a>.');
      
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            '<span class="btn-text">Send Message</span>' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        }
      }, 1500);
    });
  }
  function showStatus (type, msg) {
    if (!statusEl) return;
    statusEl.innerHTML = msg;
    statusEl.className = `form-status ${type}`;
    setTimeout(() => {
      statusEl.innerHTML = '';
      statusEl.className = 'form-status';
    }, 7000);
  }
  /* ============================================================
     8. HERO TERMINAL ANIMATION
  ============================================================ */
  function initTerminalAnimation() {
    const terminalBody = $('.terminal__body');
    if (!terminalBody) return;
    const lines = $$('.t-line', terminalBody);
    if (!lines.length) return;
    const lineDelay = 200;
    const restartDelay = 5000;
    const typeSpeed = 90;
    const lastLine = lines[lines.length - 1];
    const lastLineCmd = lastLine.querySelector('.t-cmd');
    const cursor = lastLineCmd ? lastLineCmd.querySelector('.t-cursor') : null;
    const originalCmdText = lastLineCmd
      ? [...lastLineCmd.childNodes]
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent)
          .join('')
          .trim()
      : '';
    let pendingRestartId = null;
    function runAnimation() {
      pendingRestartId = null;
      
      lines.forEach(line => line.style.opacity = '0');
      if (lastLineCmd) {
        
        [...lastLineCmd.childNodes]
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .forEach(n => n.remove());
      }
      if (cursor) cursor.style.display = 'none';
      
      let cumulativeDelay = 500;
      lines.forEach((line, index) => {
        setTimeout(() => {
          line.style.transition = 'opacity 0.4s ease';
          line.style.opacity = '1';
          
          if (index === lines.length - 1 && lastLineCmd && originalCmdText) {
            if (cursor) cursor.style.display = 'inline-block';
            let charIndex = 0;
            
            const textNode = document.createTextNode('');
            lastLineCmd.insertBefore(textNode, cursor);
            const type = () => {
              if (charIndex < originalCmdText.length) {
                textNode.textContent += originalCmdText[charIndex];
                charIndex++;
                setTimeout(type, typeSpeed);
              }
            };
            setTimeout(type, 300);
          }
        }, cumulativeDelay += lineDelay);
      });
      
      pendingRestartId = setTimeout(runAnimation, cumulativeDelay + restartDelay);
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lines.forEach(line => line.style.opacity = '0');
      const terminalEl = terminalBody.closest('.hero__terminal') || terminalBody;
      if ('IntersectionObserver' in window) {
        const termIO = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) {
              clearTimeout(pendingRestartId);
              pendingRestartId = null;
            } else if (pendingRestartId === null) {
              runAnimation();
            }
          });
        }, { threshold: 0.1 });
        termIO.observe(terminalEl);
      } else {
        runAnimation();
      }
    }
  }
  initTerminalAnimation();
  /* ============================================================
     9. SMOOTH SCROLL for anchor links
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      
      if (target.hasAttribute('tabindex')) {
        target.focus();
        return;
      }
      const headerH = document.getElementById('header')?.offsetHeight ?? 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();