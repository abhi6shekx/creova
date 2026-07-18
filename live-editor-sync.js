(() => {
  const byId = id => document.querySelector(id);
  const all = selector => [...document.querySelectorAll(selector)];
  const setText = (selector, value, html = false) => all(selector).forEach(node => { html ? node.innerHTML = value : node.textContent = value; });
  const update = () => {
    const brand = byId('#brandInput')?.value || '';
    const title = byId('#titleInput')?.value || '';
    const description = byId('#textInput')?.value || '';
    const button = byId('#buttonInput')?.value || '';
    const primary = byId('#primaryColor')?.value;
    const accent = byId('#accentColor')?.value;
    const heading = byId('#headingFont')?.value;
    const body = byId('#bodyFont')?.value;
    const fontSize = byId('#fontSize')?.value;
    const spacing = byId('#spacing')?.value;
    setText('#siteLogo,.scandi-logo,.category-logo', brand);
    setText('#heroTitle,.scandi-hero h1,.category-hero h1', title.replace(/\n/g, '<br>'), true);
    setText('#heroText,.scandi-copy p,.category-copy p', description);
    setText('#ctaBtn,.scandi-hero .scandi-link,.category-cta', button);
    const site = byId('#site');
    if (!site) return;
    if (primary) all('#heroTitle,#siteLogo,.scandi-logo,.scandi h1,.category-logo,.category-hero h1').forEach(node => node.style.color = primary);
    if (accent) { site.style.setProperty('--accent', accent); all('.eyebrow,.scandi-eyebrow,.category-eyebrow').forEach(node => node.style.color = accent); }
    if (heading) all('h1,h2,.scandi-logo,.category-logo,#siteLogo').forEach(node => node.style.fontFamily = `'${heading}', serif`);
    if (body) site.style.fontFamily = `'${body}', sans-serif`;
    if (fontSize) site.style.fontSize = `${fontSize}px`;
    if (spacing) all('.section,.scandi-section,.category-section').forEach(node => { node.style.paddingTop = `${spacing}px`; node.style.paddingBottom = `${spacing}px`; });
  };
  ['#brandInput','#titleInput','#textInput','#buttonInput','#primaryColor','#accentColor','#fontSize','#spacing'].forEach(selector => byId(selector)?.addEventListener('input', update));
  ['#headingFont','#bodyFont'].forEach(selector => byId(selector)?.addEventListener('change', update));
  update();
})();
