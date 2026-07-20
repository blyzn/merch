const sizeSelect = document.getElementById("size");
const quantityInput = document.getElementById("quantity");
const priceSpan = document.getElementById("price");
const productImage = document.getElementById("productImage");

// 🖼️ Product image update
const updateImage = () => {
  const selectedColorInput = document.querySelector(
    'input[name="color"]:checked'
  );

  const selectedColor = selectedColorInput.value;
  const imagePath = selectedColorInput.dataset.image;

  if (productImage) {
    productImage.src = imagePath;
    productImage.alt = `Product in ${selectedColor}`;
  } else {
    console.warn("productImage element not found!");
  }
};

// 💰 Price update
const updatePrice = () => {
  const sizePrice = parseInt(sizeSelect.selectedOptions[0].dataset.price);
  const quantity = parseInt(quantityInput.value);
  const total = (basePrice + sizePrice) * quantity;
  priceSpan.textContent = total.toFixed(2);
};

// 🟢 Add event listeners back for color change
const colorOptions = document.querySelectorAll('input[name="color"]');
colorOptions.forEach((option) => {
  option.addEventListener("change", updateImage);
});

sizeSelect.addEventListener("change", updatePrice);
quantityInput.addEventListener("input", updatePrice);

// 🔄 Initialize
updateImage();
updatePrice();

// 🛒 Ensure cartCount is correct on page load
document.getElementById("cartCount").textContent = (
  JSON.parse(localStorage.getItem("cart")) || []
).reduce((sum, p) => sum + p.quantity, 0);
