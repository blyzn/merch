document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider-track");
  const items = document.querySelectorAll(".slider-track .re-li-des");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  let currentIndex = 0;

  function updateSlider() {
    if (window.innerWidth > 727) return;

    const itemWidth = items[0].offsetWidth;
    const translateX = -currentIndex * itemWidth;

    track.style.transform = `translateX(${translateX}px)`;

    prevBtn.style.display = currentIndex === 0 ? "none" : "block";
    nextBtn.style.display =
      currentIndex === items.length - 1 ? "none" : "block";
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < items.length - 1) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 727) {
      updateSlider();
    } else {
      // Reset transform on desktop
      track.style.transform = "none";
      currentIndex = 0;
    }
  });

  updateSlider();
});
