(() => {
  const site = document.querySelector('#site');
  const form = document.querySelector('#productForm');
  if (!site || !form || site.classList.contains('scandi')) return;

  const experience = localStorage.getItem('creova_experience') || 'default';
  const category = localStorage.getItem('creova_experience_category') || 'general';
  const storageKey = `creova_products_${category}_${experience}`.replace(/[^a-z0-9_]/gi, '_').toLowerCase();
  const fallback = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=86';
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
  let products = [];
  try { products = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch (_) { products = []; }

  const css = document.createElement('style');
  css.textContent = `.universal-product-section{padding:72px 5vw;background:inherit;color:inherit}.universal-product-section .universal-product-head{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:28px}.universal-product-section small{letter-spacing:.16em;text-transform:uppercase;opacity:.65}.universal-product-section h2{margin:8px 0 0;font-size:clamp(30px,4vw,58px);font-family:Georgia,serif;font-weight:400}.universal-product-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.universal-product-card{min-width:0}.universal-product-card img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;background:#ddd}.universal-product-meta{display:flex;justify-content:space-between;gap:12px;padding-top:11px;font-size:13px}.universal-product-meta span{opacity:.68}@media(max-width:700px){.universal-product-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
  document.head.append(css);

  const card = product => `<article class="universal-product-card"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"><div class="universal-product-meta"><b>${escapeHtml(product.name)}</b><span>₹${Number(product.price).toLocaleString('en-IN')}</span></div></article>`;
  const getGrid = () => {
    let grid = site.querySelector('.universal-product-grid');
    if (grid) return grid;
    const section = document.createElement('section');
    section.className = 'universal-product-section';
    section.innerHTML = `<div class="universal-product-head"><div><small>Your catalog</small><h2>Featured products</h2></div><small class="universal-product-total"></small></div><div class="universal-product-grid"></div>`;
    site.append(section);
    return section.querySelector('.universal-product-grid');
  };
  const storefrontCard = product => `<article class="product user-added-product" data-name="${escapeHtml(product.name)}" data-category="${escapeHtml(product.category)}"><button class="remove-product" title="Remove product">×</button><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}"><div class="product-meta"><div><b>${escapeHtml(product.name)}</b><span>₹${Number(product.price).toLocaleString('en-IN')}</span></div></div></article>`;
  const render = () => {
    if (!products.length) return null;
    const storefrontGrid = site.querySelector('.products');
    if (storefrontGrid) {
      storefrontGrid.querySelectorAll('.user-added-product').forEach(item => item.remove());
      storefrontGrid.insertAdjacentHTML('beforeend', products.map(storefrontCard).join(''));
      return storefrontGrid.closest('section') || storefrontGrid;
    }
    const grid = getGrid();
    grid.innerHTML = products.map(card).join('');
    const total = site.querySelector('.universal-product-total');
    if (total) total.textContent = `${products.length} product${products.length === 1 ? '' : 's'}`;
    return grid.closest('section');
  };
  render();


  const notify = message => {
    const toast = document.querySelector('#toast');
    if (!toast) return;
    const label = toast.querySelector('span');
    if (label) label.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
  };
  form.onsubmit = event => {
    event.preventDefault();
    const name = document.querySelector('#productName').value.trim();
    const price = Number(document.querySelector('#productPrice').value);
    if (!name || !price) { notify('Product name and price are required'); return; }
    const preview = document.querySelector('#productImagePreview');
    const image = preview?.src && preview.style.display !== 'none' ? preview.src : fallback;
    products.push({ name, price, category: document.querySelector('#productCategory').value, image });
    try { localStorage.setItem(storageKey, JSON.stringify(products)); } catch (_) { notify('Product added for this preview, but it could not be saved locally.'); }
    const addedSection = render();
    window.dispatchEvent(new CustomEvent('creova:product-added',{detail:{id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,name,price,category:document.querySelector('#productCategory').value,stock:Number(document.querySelector('#productStock')?.value||10),image}}));
    document.querySelector('#productModal')?.classList.remove('open');
    event.target.reset();
    if (preview) { preview.src = ''; preview.style.display = 'none'; }
    addedSection?.scrollIntoView({ behavior:'smooth', block:'center' });
    notify(`${name} added to your website`);
  };
  window.addEventListener('creova:product-removed',event=>{const name=event.detail?.name;if(!name)return;products=products.filter(product=>product.name!==name);try{localStorage.setItem(storageKey,JSON.stringify(products))}catch(_){}const section=site.querySelector('.universal-product-section');if(section){section.remove();render();}});
})();
