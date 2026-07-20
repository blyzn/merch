document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNavPopup = document.getElementById("mobileNavPopup");
  const closeBtn = document.getElementById("closeBtn");

  hamburgerBtn.addEventListener("click", () => {
    mobileNavPopup.style.opacity = "";
    mobileNavPopup.style.pointerEvents = "";
    mobileNavPopup.classList.add("show");
    mobileNavPopup.classList.remove("hide");
  });

  closeBtn.addEventListener("click", () => {
    mobileNavPopup.classList.add("hide");
    mobileNavPopup.classList.remove("show");

    setTimeout(() => {
      mobileNavPopup.classList.remove("hide");
      mobileNavPopup.style.opacity = "0";
      mobileNavPopup.style.pointerEvents = "none";
    }, 400);
  });
});
