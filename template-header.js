(() => {
  const name = localStorage.getItem('creova_experience');
  if (!name) return;
  const rawCategory = localStorage.getItem('creova_experience_category') || 'Fashion';
  const tier = (localStorage.getItem('creova_experience_tier') || '').toLowerCase();
  const category = rawCategory.replace(/\b\w/g, letter => letter.toUpperCase());
  const badge = tier.includes('3d') || /3d/i.test(name) ? '🥽 3D'
    : tier.includes('immersive') || /immersive/i.test(name) ? '🚀 IMMERSIVE'
    : tier.includes('motion') || /motion|cinema|runway|film|scroll/i.test(name) ? '🎬 MOTION'
    : tier.includes('free') ? '🟢 FREE'
    : tier.includes('signature') || tier.includes('pro') ? '⭐ PRO'
    : '🟣 PREMIUM';
  const categoryEl = document.querySelector('#templateCategory');
  const nameEl = document.querySelector('#templateName');
  const badgeEl = document.querySelector('#templateBadge');
  if (categoryEl) categoryEl.textContent = category.toUpperCase();
  if (nameEl) nameEl.textContent = name;
  if (badgeEl) badgeEl.textContent = badge;
  document.title = `Creova — ${name} Editor`;
})();
