// Groups the existing product cards (.re-li-des) inside .related-list into
// pages, and shows one page at a time using numbered buttons.
// This does NOT touch the existing prev/next arrow slider or its script —
// it only adds/removes a "page-hidden" class on cards that already exist.

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".related-list");
  const paginationEl = document.getElementById("prodPagination");
  if (!list || !paginationEl) return;

  const items = Array.from(list.querySelectorAll(".re-li-des"));
  if (items.length === 0) return;

  const PER_PAGE = 6; // how many products to show per page/slide — adjust as needed
  const pageCount = Math.ceil(items.length / PER_PAGE);

  // Nothing to paginate if everything already fits on one page.
  if (pageCount <= 1) return;

  let current = 0;

  function showPage(index) {
    current = Math.max(0, Math.min(pageCount - 1, index));

    items.forEach((item, i) => {
      const page = Math.floor(i / PER_PAGE);
      item.classList.toggle("page-hidden", page !== current);
    });

    renderPagination();

    // Scroll the section into view when paging, so the user sees the new products.
    list.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderPagination() {
    let html = `<button type="button" class="nav-btn" data-action="prev" ${
      current === 0 ? "disabled" : ""
    }>&#10094;</button>`;

    for (let i = 0; i < pageCount; i++) {
      html += `<button type="button" data-page="${i}" class="${
        i === current ? "active" : ""
      }">${i + 1}</button>`;
    }

    html += `<button type="button" class="nav-btn" data-action="next" ${
      current === pageCount - 1 ? "disabled" : ""
    }>&#10095;</button>`;

    paginationEl.innerHTML = html;
  }

  paginationEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    if (btn.dataset.page !== undefined) showPage(Number(btn.dataset.page));
    if (btn.dataset.action === "prev") showPage(current - 1);
    if (btn.dataset.action === "next") showPage(current + 1);
  });

  showPage(0);
});