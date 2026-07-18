(() => {
  const logo = "../creova-logo.png";
  const style = document.createElement("style");
  style.textContent = ".creova-brand-logo{display:block;width:122px;height:44px;object-fit:contain}.brand:has(.creova-brand-logo){display:flex!important;align-items:center;padding:0!important;background:transparent!important;border-radius:0;box-shadow:none!important}.brand:has(.creova-brand-logo) .mark{display:none!important}";
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
