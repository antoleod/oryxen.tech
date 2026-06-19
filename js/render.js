/* ============================================================
   ORYXEN LABS — render.js
   Carga datos JSON y renderiza contenido dinámicamente
   ============================================================ */
(async function () {
  'use strict';
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  function safeUrl(url) {
    if (!url) return '';
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return url;
    } catch (_) {}
    return '#';
  }
  async function loadData() {
    try {
      const [projects, stack] = await Promise.all([
        fetch('data/projects.json').then(r => r.json()),
        fetch('data/stack.json').then(r => r.json())
      ]);
      return { projects, stack };
    } catch (err) {
      console.error('Error loading data:', err);
      return null;
    }
  }
  const FALLBACK_MSG = '<p style="color:var(--text-3);text-align:center;padding:2rem 1rem;font-size:.9rem">Unable to load content — please refresh the page.</p>';
  const data = await loadData();
  if (!data) {
    document.querySelectorAll('.products__grid, .stack__grid').forEach(el => {
      el.innerHTML = FALLBACK_MSG;
    });
    return;
  }
  function observeNewReveals(container) {
    container.querySelectorAll('[data-reveal]').forEach(el => {
      if (window.__revealIO) {
        window.__revealIO.observe(el);
      } else {
        el.classList.add('revealed');
      }
    });
  }
  function renderProducts() {
    const container = document.querySelector('.products__grid');
    if (!container) return;
    const products = data.projects?.products;
    if (!Array.isArray(products) || products.length === 0) {
      container.innerHTML = FALLBACK_MSG;
      return;
    }
    container.innerHTML = products.map((product, idx) => `
      <article class="product-card" data-reveal data-delay="${idx + 1}" ${product.disabled ? 'style="opacity:.7"' : ''} aria-label="${escapeHtml(product.title)} — ${escapeHtml(product.status)}">
        <span class="product-card__status status--${product.status === 'Live' ? 'live' : 'coming'}">${escapeHtml(product.status)}</span>
        ${product.iconImg
          ? `<img class="product-card__icon product-card__icon--img" src="${escapeHtml(product.iconImg)}" alt="${escapeHtml(product.title)} icon" width="48" height="48" loading="lazy" onerror="this.outerHTML='<span class=\\'product-card__icon\\' aria-hidden=\\'true\\'>${escapeHtml(product.icon)}</span>'">`
          : `<span class="product-card__icon" aria-hidden="true">${escapeHtml(product.icon)}</span>`
        }
        <h3 class="product-card__title">${escapeHtml(product.title)}</h3>
        <p class="product-card__desc">${escapeHtml(product.description)}</p>
        <div class="product-card__tags">
          ${(product.tags || []).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        ${product.url ? `
          <a href="${escapeHtml(safeUrl(product.url))}" target="_blank" rel="noopener noreferrer" class="product-card__link" id="link-${escapeHtml(product.id)}" aria-label="${escapeHtml(product.ariaLabel)}">
            Visit Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        ` : `
          <span class="product-card__link" style="color:var(--text-3);cursor:default" aria-hidden="true">In preparation…</span>
        `}
      </article>
    `).join('');
    observeNewReveals(container);
    initCarousel();
  }
  function initCarousel() {
    const viewport  = document.querySelector('.carousel__viewport');
    const prevBtn   = document.querySelector('.carousel__btn--prev');
    const nextBtn   = document.querySelector('.carousel__btn--next');
    const dotsWrap  = document.getElementById('carousel-dots');
    const cards     = document.querySelectorAll('.product-card');
    if (!viewport || !prevBtn || !nextBtn || !dotsWrap || !cards.length) return;
    
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      dot.setAttribute('aria-label', `Go to product ${i + 1}`);
      dot.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = () => dotsWrap.querySelectorAll('.carousel__dot');
    let currentIdx = 0;
    function cardWidth() {
      const card = cards[0];
      if (!card || card.offsetWidth === 0) return 272;
      const style = getComputedStyle(document.querySelector('.products__grid'));
      const gap = parseFloat(style.gap) || 24;
      return card.offsetWidth + gap;
    }
    function derivedIndex() {
      const w = cardWidth();
      if (!w) return 0;
      return Math.round(viewport.scrollLeft / w);
    }
    function updateState(idx) {
      const total = cards.length;
      currentIdx = idx;
      prevBtn.disabled = idx <= 0;
      prevBtn.tabIndex = idx <= 0 ? -1 : 0;
      nextBtn.disabled = idx >= total - 1;
      nextBtn.tabIndex = idx >= total - 1 ? -1 : 0;
      dots().forEach((d, i) => {
        const active = i === idx;
        d.classList.toggle('carousel__dot--active', active);
        d.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }
    function goTo(idx) {
      const clamped = Math.max(0, Math.min(idx, cards.length - 1));
      viewport.scrollTo({ left: clamped * cardWidth(), behavior: 'smooth' });
      updateState(clamped);
    }
    prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
    nextBtn.addEventListener('click', () => goTo(currentIdx + 1));
    
    const carousel = document.getElementById('products-carousel');
    carousel?.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const active = document.activeElement;
      if (active?.matches('.product-card__link, .carousel__dot')) return;
      e.preventDefault();
      goTo(currentIdx + (e.key === 'ArrowRight' ? 1 : -1));
    });
    let scrollTimer;
    viewport.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => updateState(derivedIndex()), 80);
    }, { passive: true });
    
    let dragStartX = 0;
    let dragging = false;
    let captured = false;
    viewport.addEventListener('pointerdown', e => {
      dragStartX = e.clientX;
      dragging = true;
      captured = false;
    });
    viewport.addEventListener('pointermove', e => {
      if (!dragging || captured) return;
      if (Math.abs(e.clientX - dragStartX) > 8) {
        viewport.setPointerCapture(e.pointerId);
        captured = true;
      }
    });
    viewport.addEventListener('pointerup', e => {
      if (!dragging) return;
      dragging = false;
      captured = false;
      const delta = dragStartX - e.clientX;
      if (Math.abs(delta) > 40) goTo(currentIdx + (delta > 0 ? 1 : -1));
    });
    updateState(0);
  }
  function renderStack() {
    const container = document.querySelector('.stack__grid');
    if (!container) return;
    const cats = data.stack?.categories;
    if (!Array.isArray(cats) || cats.length === 0) { container.innerHTML = FALLBACK_MSG; return; }
    container.innerHTML = cats.map((cat, idx) => `
      <div class="stack-cat" data-reveal data-delay="${idx + 1}">
        <span class="stack-cat__label">${escapeHtml(cat.label)}</span>
        <div class="stack-items">
          ${(cat.items || []).map(item => `<div class="stack-item"><span class="stack-item-emoji">${escapeHtml(item.emoji)}</span> ${escapeHtml(item.text)}</div>`).join('')}
        </div>
      </div>
    `).join('');
    observeNewReveals(container);
  }
  renderProducts();
  renderStack();
})();