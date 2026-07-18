(() => {
  const experience = localStorage.getItem('creova_experience') || '';
  const tier = localStorage.getItem('creova_experience_tier') || '';
  if (!experience || (!tier.includes('premium') && !tier.includes('motion') && !tier.includes('signature'))) return;
  const site = document.querySelector('#site'), hero = document.querySelector('#hero');
  if (!site || !hero) return;
  const slug = experience.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  site.classList.add('motion-active', `motion-${slug}`);
  const style = document.createElement('style');
  style.textContent = `
    @keyframes creovaReveal{from{opacity:0;transform:translateY(34px);filter:blur(10px)}to{opacity:1;transform:none;filter:none}}
    @keyframes creovaZoom{from{background-size:100% auto}to{background-size:112% auto}}
    @keyframes creovaFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes creovaGlow{0%,100%{box-shadow:0 0 0 #9f7cff00}50%{box-shadow:0 0 42px #9f7cff88}}
    @keyframes creovaScan{0%{transform:translateX(-110%) rotate(16deg)}100%{transform:translateX(160%) rotate(16deg)}}
    @keyframes creovaShift{to{background-position:200% center}}
    .motion-active .hero-copy{animation:creovaReveal 900ms cubic-bezier(.18,.82,.22,1) both}.motion-active .site-nav{animation:creovaReveal 700ms .12s both}.motion-active .collection-tabs{animation:creovaReveal 800ms .42s both}.motion-active .product{animation:creovaReveal 700ms both}.motion-active .product:nth-child(1){animation-delay:.1s}.motion-active .product:nth-child(2){animation-delay:.2s}.motion-active .product:nth-child(3){animation-delay:.3s}.motion-active .product:nth-child(4){animation-delay:.4s}.motion-active .site-btn{animation:creovaGlow 2.4s ease-in-out infinite}.motion-luxury-atelier .hero,.motion-couture-house .hero,.motion-fashion-house .hero{background-size:100% auto;animation:creovaZoom 14s ease-out both}.motion-vogue-editorial .hero h1{animation:creovaReveal 1s both;letter-spacing:-.075em}.motion-vogue-editorial .products{display:flex;overflow:hidden}.motion-vogue-editorial .product{min-width:34%;animation:creovaFloat 4s ease-in-out infinite}.motion-runway-motion .hero,.motion-cinematic .hero,.motion-fashion-film .hero,.motion-scroll-cinema .hero{background-size:cover;position:relative}.motion-runway-motion .hero:after,.motion-cinematic .hero:after,.motion-fashion-film .hero:after,.motion-scroll-cinema .hero:after{content:'';position:absolute;inset:-20% auto -20% 0;width:18%;background:linear-gradient(90deg,transparent,#fff6,transparent);pointer-events:none;animation:creovaScan 4.8s ease-in-out infinite}.motion-runway-motion .hero h1,.motion-cinematic .hero h1,.motion-fashion-film .hero h1{animation:creovaReveal .85s both;font-size:clamp(72px,9vw,145px)}.motion-immersive-3d-boutique .product,.motion-virtual-showroom .product,.motion-floating-cards .product{animation:creovaFloat 4.4s ease-in-out infinite;transform-style:preserve-3d}.motion-immersive-3d-boutique .product:nth-child(2),.motion-virtual-showroom .product:nth-child(2),.motion-floating-cards .product:nth-child(2){animation-delay:-1.4s}.motion-immersive-3d-boutique .product:nth-child(3),.motion-virtual-showroom .product:nth-child(3),.motion-floating-cards .product:nth-child(3){animation-delay:-2.7s}.motion-neon-streetwear .hero{animation:creovaGlow 1.8s ease-in-out infinite;background-blend-mode:screen}.motion-neon-streetwear .hero h1{color:#ec4dff;text-shadow:4px 0 #00f7ff,-4px 0 #fffd5b}.motion-collection-chapters .story,.motion-luxury-storytelling .story,.motion-fashion-timeline .story{animation:creovaReveal 1.1s both}.motion-ai-personal-stylist .hero h1{background:linear-gradient(100deg,#fff,#9f82ff,#71e9db,#fff);background-size:260% auto;background-clip:text;color:transparent;animation:creovaShift 5s linear infinite}.motion-glass-boutique .product{backdrop-filter:blur(16px);background:#ffffff1c;border-color:#fff7}.motion-bento-commerce .products{grid-template-columns:1.6fr .8fr .8fr}.motion-bento-commerce .product:first-child{grid-row:span 2}.motion-active.motion-pointer .hero-copy{transition:transform .25s ease-out}@media(prefers-reduced-motion:reduce){.motion-active *{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
  `;
  document.head.append(style);
  if (['Immersive 3D Boutique','Virtual Showroom','Floating Cards','Product Spotlight'].includes(experience)) {
    site.classList.add('motion-pointer');
    hero.addEventListener('pointermove', event => { const r=hero.getBoundingClientRect(), x=(event.clientX-r.left)/r.width-.5, y=(event.clientY-r.top)/r.height-.5, copy=hero.querySelector('.hero-copy'); if(copy)copy.style.transform=`translate(${x*16}px,${y*13}px)`; hero.style.backgroundPosition=`${50+x*3}% ${50+y*3}%`; });
    hero.addEventListener('pointerleave',()=>{const copy=hero.querySelector('.hero-copy');if(copy)copy.style.transform='';hero.style.backgroundPosition=''});
  }
})();
