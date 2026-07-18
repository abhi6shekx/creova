(() => {
  const style = document.createElement("style");
  style.textContent = ".creova-brand-logo{display:block;width:136px;height:32px;object-fit:contain}.brand:has(.creova-brand-logo){display:flex!important;align-items:center;padding:0!important;background:transparent!important;box-shadow:none!important}.brand:has(.creova-brand-logo) .mark{display:none!important}";
  document.head.append(style);
  document.querySelectorAll(".brand").forEach((brand) => {
    brand.replaceChildren();
    const image = document.createElement("img");
    image.className = "creova-brand-logo";
    image.src = "assets/creova-logo-header.png?v=4";
    image.alt = "Creova";
    brand.append(image);
  });

  if (location.pathname.endsWith("/templates.html")) {
    document.querySelector("#stats")?.remove();
    document.querySelectorAll('[data-type="motion"], [data-type="signature"]').forEach((filter) => filter.remove());
    const launchCatalog = new Map([
      ["Everyday Boutique", "free"],
      ["Minimal Clothing", "free"],
      ["Scandinavian Luxury", "premium"],
      ["Scandinavian", "premium"],
      ["Luxury Atelier", "premium"],
      ["Runway Motion", "premium"],
      ["Vogue Editorial", "premium"],
    ]);
    let activeTier = "all";
    let renderingAll = false;
    const applyLaunchCatalog = () => {
      document.querySelectorAll("#grid .experience").forEach((card) => {
        const name = card.querySelector("h2")?.textContent?.trim();
        const tier = launchCatalog.get(name);
        if (!tier || (activeTier !== "all" && tier !== activeTier)) { card.remove(); return; }
        if (name === "Scandinavian") card.querySelector("h2").textContent = "Scandinavian Luxury";
        card.dataset.type = tier;
        const kind = card.querySelector(".kind");
        if (kind) kind.textContent = tier === "free" ? "Free" : "Premium";
      });
      const count = document.querySelector("#count");
      if (count) count.textContent = `${document.querySelectorAll("#grid .experience").length} design experiences`;
    };
    const grid = document.querySelector("#grid");
    applyLaunchCatalog();
    new MutationObserver(applyLaunchCatalog).observe(grid, { childList: true });
    const allFilter = document.querySelector('[data-type="all"]');
    const freeFilter = document.querySelector('[data-type="free"]');
    const premiumFilter = document.querySelector('[data-type="premium"]');
    allFilter?.addEventListener("click", () => { if (!renderingAll) activeTier = "all"; }, true);
    freeFilter?.addEventListener("click", () => { activeTier = "free"; }, true);
    premiumFilter?.addEventListener("click", (event) => {
      event.stopImmediatePropagation();
      activeTier = "premium";
      renderingAll = true;
      allFilter?.click();
      renderingAll = false;
      document.querySelectorAll(".filter").forEach((filter) => filter.classList.toggle("active", filter === premiumFilter));
      applyLaunchCatalog();
    }, true);
  }
})();
