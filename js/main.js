/* ============================================================
   MAISON LUNE — front-end interactions
   ============================================================ */

const CART_KEY = 'maison_lune_cart';
const money = (n) => '$' + Number(n).toFixed(2);
const catLabel = (c) => (c === 'jewelry' ? 'Jewelry' : 'Clothing');
const getCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
};
const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

/* ---------- Toast + Coming Soon modal ---------- */
let toastTimer;
function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function showComingSoon() {
  const el = document.getElementById('soon-modal');
  if (!el) return;
  closeDrawer();
  el.classList.add('show');
  document.body.classList.add('no-scroll');
}

function closeComingSoon() {
  const el = document.getElementById('soon-modal');
  if (!el) return;
  el.classList.remove('show');
  document.body.classList.remove('no-scroll');
}

/* ---------- Cart ---------- */
function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll('.cart-count').forEach((el) => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n ? 'block' : 'none';
  });
}

function addToCart(id, options = {}) {
  const cart = getCart();
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const size = options.size || (product.sizes[0] || 'One Size');
  const color = options.color || (product.colors[0] || '#000000');
  const found = cart.find((i) => i.id === id && i.size === size && i.color === color);
  if (found) found.qty += options.qty || 1;
  else cart.push({ id, size, color, qty: options.qty || 1 });
  saveCart(cart);
  updateCartBadge();
  renderCart();
  showToast(product.name + ' added to your bag');
  openDrawer();
}

function changeQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function renderCart() {
  const box = document.getElementById('cart-items');
  if (!box) return;
  const cart = getCart();
  if (!cart.length) {
    box.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <h3>Your bag is empty</h3>
        <p>Discover pieces you will love.</p>
        <a href="shop.html" class="btn btn-outline btn-sm" data-close-drawer>Start shopping</a>
      </div>`;
  } else {
    box.innerHTML = cart.map((item, index) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      if (!p) return '';
      return `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.name}">
          <div>
            <div class="cart-item-top">
              <div>
                <h4>${p.name}</h4>
                <div class="ci-meta">${item.size} · ${catLabel(p.category)}</div>
              </div>
              <div class="ci-price">${money(p.price * item.qty)}</div>
            </div>
            <div class="cart-item-bottom">
              <div class="cart-qty">
                <button type="button" data-qty="-1" data-index="${index}" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty="1" data-index="${index}" aria-label="Increase quantity">+</button>
              </div>
              <button type="button" class="remove-item" data-remove="${index}">Remove</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }
  const total = cart.reduce((sum, item) => {
    const p = PRODUCTS.find((x) => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const subtotal = document.getElementById('cart-subtotal');
  if (subtotal) subtotal.textContent = money(total);
  const checkout = document.getElementById('checkout-btn');
  if (checkout) checkout.disabled = cart.length === 0;
}

function openDrawer() {
  document.getElementById('cart-drawer')?.classList.add('show');
  document.getElementById('drawer-overlay')?.classList.add('show');
  document.body.classList.add('no-scroll');
}

function closeDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('show');
  document.getElementById('drawer-overlay')?.classList.remove('show');
  if (!document.getElementById('soon-modal')?.classList.contains('show')) {
    document.body.classList.remove('no-scroll');
  }
}

/* ---------- Product cards ---------- */
function productCardHTML(p) {
  return `
    <article class="product-card">
      <div class="product-media">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a>
        <div class="quick-actions">
          <button type="button" class="btn btn-sm" data-add="${p.id}">Add to Bag</button>
          <a class="btn btn-sm" href="product.html?id=${p.id}">View</a>
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat">${catLabel(p.category)}</div>
        <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-price">${money(p.price)}</div>
        <div class="color-dots">${p.colors.slice(0, 4).map((c) => `<i style="background:${c}"></i>`).join('')}</div>
      </div>
    </article>`;
}

/* ---------- Page-specific init ---------- */
function initHome() {
  const featured = document.getElementById('featured-grid');
  if (featured) {
    featured.innerHTML = PRODUCTS.filter((p) => p.badge).slice(0, 8).map(productCardHTML).join('');
  }
  const newArrivals = document.getElementById('new-grid');
  if (newArrivals) {
    newArrivals.innerHTML = PRODUCTS.filter((p) => p.category === 'jewelry').slice(0, 4).map(productCardHTML).join('');
  }
}

function initShop() {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;
  const count = document.getElementById('result-count');
  const categoryRadios = () => [...document.querySelectorAll('input[name="category"]')];
  const priceSelect = document.getElementById('price-filter');
  const sortSelect = document.getElementById('sort-select');
  const searchInput = document.getElementById('shop-search');

  const urlCategory = new URLSearchParams(window.location.search).get('category');
  if (urlCategory === 'clothing' || urlCategory === 'jewelry') {
    const target = categoryRadios().find((r) => r.value === urlCategory);
    if (target) target.checked = true;
  }

  function render() {
    const category = categoryRadios().find((r) => r.checked)?.value || 'all';
    const price = priceSelect?.value || 'all';
    const query = (searchInput?.value || '').trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (price === 'under50' && p.price >= 50) return false;
      if (price === '50to100' && (p.price < 50 || p.price > 100)) return false;
      if (price === 'over100' && p.price <= 100) return false;
      if (query && !p.name.toLowerCase().includes(query) && !catLabel(p.category).toLowerCase().includes(query)) return false;
      return true;
    });
    const sort = sortSelect?.value || 'featured';
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    grid.innerHTML = list.length ? list.map(productCardHTML).join('') : `
      <div class="empty-state"><h3>No pieces found</h3><p>Try adjusting your filters.</p></div>`;
    if (count) count.textContent = list.length + (list.length === 1 ? ' product' : ' products');
  }

  categoryRadios().forEach((r) => r.addEventListener('change', render));
  priceSelect?.addEventListener('change', render);
  sortSelect?.addEventListener('change', render);
  searchInput?.addEventListener('input', render);
  document.getElementById('clear-filters')?.addEventListener('click', () => {
    const all = categoryRadios().find((r) => r.value === 'all');
    if (all) all.checked = true;
    if (priceSelect) priceSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'featured';
    if (searchInput) searchInput.value = '';
    render();
  });
  render();
}

function initProduct() {
  const root = document.getElementById('product-root');
  if (!root) return;
  const params = new URLSearchParams(window.location.search);
  const p = PRODUCTS.find((x) => x.id === params.get('id')) || PRODUCTS[0];
  document.title = p.name + ' | MAISON LUNE';
  const crumb = document.getElementById('crumb-name');
  if (crumb) crumb.textContent = p.name;

  const thumbs = [0, 1, 2].map((i) => `
    <button type="button" class="${i === 0 ? 'active' : ''}" data-thumb="${i}" style="position:relative;overflow:hidden" aria-label="View image ${i + 1}">
      <img src="${p.image}" alt="${p.name}" style="object-position:${['center 30%', 'center 55%', 'center 80%'][i]};transform:scale(${1 + i * 0.22})">
    </button>`).join('');

  root.innerHTML = `
    <div class="gallery">
      <div class="gallery-main"><img id="main-image" src="${p.image}" alt="${p.name}"></div>
      <div class="gallery-thumbs">${thumbs}</div>
    </div>
    <div class="detail-info">
      <div class="detail-cat">${catLabel(p.category)} / New Collection</div>
      <h1>${p.name}</h1>
      <div class="detail-price">${money(p.price)}</div>
      <div class="detail-rating"><b>★★★★★</b> &nbsp; 4.9 · 128 reviews</div>
      <p class="detail-desc">${p.description}</p>

      <div class="option-label">Colour</div>
      <div class="option-row" id="color-options">
        ${p.colors.map((c, i) => `<button type="button" class="option-chip color ${i === 0 ? 'active' : ''}" data-color="${c}" aria-label="Colour ${i + 1}"><i style="background:${c}"></i></button>`).join('')}
      </div>

      <div class="option-label">Size</div>
      <div class="option-row" id="size-options">
        ${p.sizes.map((s, i) => `<button type="button" class="option-chip ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>`).join('')}
      </div>

      <div class="qty-row">
        <div class="qty-stepper">
          <button type="button" id="detail-minus" aria-label="Decrease quantity">−</button>
          <span id="detail-qty">1</span>
          <button type="button" id="detail-plus" aria-label="Increase quantity">+</button>
        </div>
        <span style="font-size:12px;color:var(--muted)">In stock · Ships in 1–2 days</span>
      </div>

      <div class="detail-buttons">
        <button type="button" class="btn" id="detail-add">Add to Bag</button>
        <button type="button" class="btn btn-outline" id="detail-buy">Buy It Now</button>
      </div>

      <div class="detail-accordion">
        <div class="acc-item">
          <button type="button" class="acc-trigger">Product Details <span>+</span></button>
          <div class="acc-panel"><ul>${p.details.map((d) => `<li>${d}</li>`).join('')}</ul></div>
        </div>
        <div class="acc-item">
          <button type="button" class="acc-trigger">Shipping & Returns <span>+</span></button>
          <div class="acc-panel">Complimentary worldwide shipping on orders over $99. Standard delivery takes 7–14 business days. Easy returns within 30 days of delivery.</div>
        </div>
      </div>
    </div>`;

  let qty = 1;
  let selectedSize = p.sizes[0];
  let selectedColor = p.colors[0];

  document.getElementById('detail-minus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    document.getElementById('detail-qty').textContent = qty;
  });
  document.getElementById('detail-plus').addEventListener('click', () => {
    qty = Math.min(20, qty + 1);
    document.getElementById('detail-qty').textContent = qty;
  });
  document.getElementById('color-options').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-color]');
    if (!btn) return;
    document.querySelectorAll('#color-options .option-chip').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedColor = btn.dataset.color;
  });
  document.getElementById('size-options').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-size]');
    if (!btn) return;
    document.querySelectorAll('#size-options .option-chip').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSize = btn.dataset.size;
  });
  document.getElementById('detail-add').addEventListener('click', () => {
    addToCart(p.id, { qty, size: selectedSize, color: selectedColor });
  });
  document.getElementById('detail-buy').addEventListener('click', showComingSoon);

  root.querySelectorAll('[data-thumb]').forEach((btn) => {
    btn.addEventListener('click', () => {
      root.querySelectorAll('[data-thumb]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const i = Number(btn.dataset.thumb);
      const img = document.getElementById('main-image');
      img.style.transform = `scale(${1 + i * 0.22})`;
      img.style.transformOrigin = ['center 30%', 'center 55%', 'center 80%'][i];
    });
  });

  document.querySelectorAll('.acc-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      panel.classList.toggle('open');
      btn.querySelector('span').textContent = panel.classList.contains('open') ? '−' : '+';
    });
  });

  const related = document.getElementById('related-grid');
  if (related) {
    related.innerHTML = PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category).slice(0, 4).map(productCardHTML).join('');
  }
}

/* ---------- Global bindings ---------- */
function initGlobal() {
  updateCartBadge();
  renderCart();

  document.querySelectorAll('.cart-open').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  }));
  document.getElementById('drawer-overlay')?.addEventListener('click', closeDrawer);
  document.getElementById('drawer-close')?.addEventListener('click', closeDrawer);
  document.getElementById('checkout-btn')?.addEventListener('click', showComingSoon);
  document.querySelectorAll('.coming-soon').forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    showComingSoon();
  }));
  document.querySelectorAll('[data-close-soon]').forEach((el) => el.addEventListener('click', closeComingSoon));
  document.getElementById('soon-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'soon-modal') closeComingSoon();
  });

  document.getElementById('cart-items')?.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('[data-qty]');
    if (qtyBtn) { changeQty(Number(qtyBtn.dataset.index), Number(qtyBtn.dataset.qty)); return; }
    const removeBtn = e.target.closest('[data-remove]');
    if (removeBtn) { removeItem(Number(removeBtn.dataset.remove)); return; }
    if (e.target.closest('[data-close-drawer]')) closeDrawer();
  });

  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) addToCart(addBtn.dataset.add);
  });

  document.getElementById('mobile-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.add('show');
  });
  document.getElementById('mobile-close')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.remove('show');
  });

  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showToast('Thank you for subscribing!');
  });
  document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showToast('Thank you! We will be in touch soon.');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeComingSoon();
    closeDrawer();
    document.getElementById('mobile-menu')?.classList.remove('show');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGlobal();
  initHome();
  initShop();
  initProduct();
});
