const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closePopup");
const openBtn = document.getElementById("openPopup");

// Check if popup has been shown before
window.addEventListener("load", () => {
  const hasPopupShown = localStorage.getItem("popupShown");

  // Only show the popup if it hasn't been shown before
  if (!hasPopupShown) {
    setTimeout(() => {
      popup.classList.add("show");
      // Set flag so it doesn't show again
      localStorage.setItem("popupShown", "true");
    }, 300); // Delay before showing
  }
});

// Open popup when link is clicked
openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("show");
});

// Close popup with smooth transition
closeBtn.addEventListener("click", () => {
  popup.classList.remove("show");
});
