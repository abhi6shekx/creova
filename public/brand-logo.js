(() => {
  const logo = "../creova-logo.png";
  const style = document.createElement("style");
  style.textContent = ".creova-brand-logo{display:block;width:116px;height:42px;object-fit:contain}.brand:has(.creova-brand-logo){display:flex!important;align-items:center;padding:3px 7px!important;background:#fff!important;border-radius:8px;box-shadow:0 8px 24px #0003}.brand:has(.creova-brand-logo) .mark{display:none!important}";
  document.head.append(style);
  document.querySelectorAll(".brand").forEach((brand) => {
    brand.replaceChildren();
    const image = document.createElement("img");
    image.className = "creova-brand-logo";
    image.src = logo;
    image.alt = "Creova";
    brand.append(image);
  });
})();
