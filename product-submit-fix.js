(() => {
  const form = document.querySelector('#productForm');
  if (!form) return;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
  const notify = message => {
    const toast = document.querySelector('#toast');
    if (!toast) return;
    const label = toast.querySelector('span');
    if (label) label.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
  };
  const addProduct = event => {
    const site = document.querySelector('#site');
    if (!site || site.classList.contains('scandi')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const name = document.querySelector('#productName')?.value.trim();
    const price = Number(document.querySelector('#productPrice')?.value);
    if (!name || !price) { notify('Enter a product name and price first'); return; }
    const category = document.querySelector('#productCategory')?.value || 'New Arrivals';
    const stock = Number(document.querySelector('#productStock')?.value || 0);
    const description = document.querySelector('#productDescription')?.value.trim() || '';
    const preview = document.querySelector('#productImagePreview');
    const image = preview?.src && preview.style.display !== 'none' ? preview.src : 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=86';
    let grid = site.querySelector('.products');
    if (!grid) {
      const section = document.createElement('section');
      section.className = 'section';
      section.id = 'collection';
      section.innerHTML = '<div class="section-head"><div><small>// YOUR CATALOG</small><h2>FEATURED PRODUCTS</h2></div></div><div class="products"></div>';
      site.append(section);
      grid = section.querySelector('.products');
    }
    const article = document.createElement('article');
    article.className = 'product';
    article.dataset.name = name;
    article.dataset.category = category;
    article.dataset.stock = String(stock);
    article.dataset.description = description;
    article.innerHTML = `<img src="${escapeHtml(image)}" alt="${escapeHtml(name)}"><div class="product-meta"><div><b>${escapeHtml(name)}</b><span>₹${price.toLocaleString('en-IN')}</span></div></div>`;
    grid.append(article);
    try {
      const key = `creova_added_products_${(localStorage.getItem('creova_experience') || 'default').replace(/[^a-z0-9]/gi, '_')}`;
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      saved.push({ name, price, category, stock, description, image });
      localStorage.setItem(key, JSON.stringify(saved));
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('creova:product-added',{detail:{id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`,name,price,category,stock,image}}));
    document.querySelector('#productModal')?.classList.remove('open');
    form.reset();
    if (preview) { preview.src = ''; preview.style.display = 'none'; }
    document.querySelector('#productMediaPreviews')?.replaceChildren();
    grid.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    notify(`${name} added to Featured Products`);
  };
  form.addEventListener('submit', addProduct, true);
  window.addEventListener('creova:product-removed',event=>{
    const name=event.detail?.name;
    if(!name)return;
    try{
      const key=`creova_added_products_${(localStorage.getItem('creova_experience')||'default').replace(/[^a-z0-9]/gi,'_')}`;
      const saved=JSON.parse(localStorage.getItem(key)||'[]').filter(product=>product.name!==name);
      localStorage.setItem(key,JSON.stringify(saved));
    }catch(_){}
    document.querySelectorAll('.product.user-added-product,.product').forEach(product=>{if(product.dataset.name===name)product.remove()});
  });
  document.querySelector('#confirmAddProduct')?.addEventListener('click', addProduct);
})();
