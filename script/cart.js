document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartCountEl = document.getElementById("cartCount");
  const addToCartBtn = document.querySelector(".a-t-c");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartIcon = document.getElementById("cartIcon");
  const closeCartBtn = document.getElementById("closeCart");
  const cartOverlay = document.getElementById("cartOverlay");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function updateCartCount() {
    cartCountEl && (cartCountEl.textContent = cart.length);
  }

  function renderCartItems() {
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = cart
      .map(
        (item, index) => `
      <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${item.image}" alt="${
          item.title
        }" style="width: 50px; height: auto;">
          <div>
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-meta">
              <span>Color: ${item.color}</span>
              <span>Size: ${item.size}</span>
              <span class="cart-price">Price: $<strong class="item-total-price" data-index="${index}">${(
          item.price * item.qty
        ).toFixed(2)}</strong></span>
              <span>
                Quantity:
                <button class="qty-btn decrement" data-index="${index}">-</button>
                <input type="number" class="qty-input" data-index="${index}" value="${
          item.qty
        }" min="1" max="499" />
                <button class="qty-btn increment" data-index="${index}">+</button>
              </span>
            </div>
          </div>
        </div>
        <button class="delete-item" data-index="${index}" style="background: none; border: none; color: red; cursor: pointer;">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `
      )
      .join("");

    attachQuantityListeners();
    attachDeleteListeners();
  }

  function attachQuantityListeners() {
    document.querySelectorAll(".increment").forEach((btn) =>
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        if (cart[index].qty < 499) {
          cart[index].qty++;
          document.querySelector(`.qty-input[data-index="${index}"]`).value =
            cart[index].qty;
          updateItemPrice(index);
          saveCart();
          updateCartCount();
        }
      })
    );

    document.querySelectorAll(".decrement").forEach((btn) =>
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        if (cart[index].qty > 1) {
          cart[index].qty--;
          document.querySelector(`.qty-input[data-index="${index}"]`).value =
            cart[index].qty;
          updateItemPrice(index);
          saveCart();
          updateCartCount();
        }
      })
    );

    document.querySelectorAll(".qty-input").forEach((input) => {
      input.addEventListener("input", () => {
        const index = input.dataset.index;
        let val = parseInt(input.value);
        val = Math.max(1, Math.min(499, isNaN(val) ? 1 : val));
        input.value = val;
        cart[index].qty = val;
        updateItemPrice(index);
        saveCart();
        updateCartCount();
      });
    });
  }

  function attachDeleteListeners() {
    document.querySelectorAll(".delete-item").forEach((button) => {
      button.addEventListener("click", () => {
        const index = parseInt(button.dataset.index);
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        renderCartItems();
      });
    });
  }

  function updateItemPrice(index) {
    const item = cart[index];
    const priceEl = document.querySelector(
      `.item-total-price[data-index="${index}"]`
    );
    if (priceEl) priceEl.textContent = (item.price * item.qty).toFixed(2);
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function refreshCartPrices() {
    const basePriceEl = document.getElementById("price");
    const sizeSelect = document.getElementById("size");
    if (!basePriceEl || !sizeSelect) return;

    const basePrice = parseFloat(basePriceEl.textContent);
    cart.forEach((item) => {
      if (item.title === "Renaissance") {
        const sizeOption = Array.from(sizeSelect.options).find(
          (opt) => opt.value === item.size
        );
        const sizePrice = sizeOption ? parseFloat(sizeOption.dataset.price) : 0;
        item.price = basePrice + sizePrice;
      }
    });
  }

  function saveAndRender() {
    refreshCartPrices();
    saveCart();
    renderCartItems();
    updateCartCount();
  }

  // EVENT LISTENERS — attach only if elements exist

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const prodImg = document.getElementById("productImage")?.src;
      const title = document.getElementById("productTitle")?.textContent;
      const basePrice = parseFloat(
        document.getElementById("price")?.textContent || 0
      );
      const qty = parseInt(document.getElementById("quantity")?.value || 1);
      const color = document.querySelector(
        'input[name="color"]:checked'
      )?.value;
      const sizeSelect = document.getElementById("size");
      const size = sizeSelect?.value;
      const sizePrice = parseFloat(
        sizeSelect?.selectedOptions[0]?.dataset.price || 0
      );

      if (!prodImg || !title || !color || !size) return;

      const finalPrice = basePrice + sizePrice;

      const existingIndex = cart.findIndex(
        (item) =>
          item.title === title && item.color === color && item.size === size
      );

      if (existingIndex > -1) {
        cart[existingIndex].qty += qty;
      } else {
        cart.push({
          image: prodImg,
          title,
          price: finalPrice,
          color,
          size,
          qty,
        });
      }

      saveAndRender();

      cartSidebar?.classList.add("active");
      cartOverlay?.classList.add("active");
    });
  }

  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      saveAndRender();
      cartSidebar?.classList.add("active");
      cartOverlay?.classList.add("active");
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", () => {
      cartSidebar?.classList.remove("active");
      cartOverlay?.classList.remove("active");
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", () => {
      cartSidebar?.classList.remove("active");
      cartOverlay?.classList.remove("active");
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      saveCart();
      window.location.href = "checkout.html";
    });
  }

  updateCartCount();
});
