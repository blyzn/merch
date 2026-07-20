// Dropdown toggle behavior
const headers = document.querySelectorAll(".dropdown-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const currentContent = header.nextElementSibling;
    const currentArrow = header.querySelector(".arrow");

    headers.forEach((otherHeader) => {
      const otherContent = otherHeader.nextElementSibling;
      const otherArrow = otherHeader.querySelector(".arrow");

      if (otherHeader !== header) {
        otherContent.classList.remove("show");
        if (otherArrow) otherArrow.classList.remove("rotate");
      }
    });

    currentContent.classList.toggle("show");
    if (currentArrow) currentArrow.classList.toggle("rotate");
  });
});
