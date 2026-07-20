const colorMap = {
  Red: "#FF0000",
  Blue: "#0000FF",
  Green: "#00FF00",
  Beige: "#F5F5DC",
  Black: "#000000",
  White: "#FFFFFF",
};

const colorOptionsContainer = document.getElementById("color-options");

for (const [colorName, hex] of Object.entries(colorMap)) {
  const label = document.createElement("label");
  label.style.cursor = "pointer";
  label.style.marginRight = "10px";

  label.innerHTML = `
    <input type="radio" name="color" value="${colorName}">
    <span style="
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: ${hex};
      border: 1px solid #ccc;
      vertical-align: middle;
      margin-right: 5px;
      border-radius: 50%;
    "></span>
    ${colorName}
  `;

  colorOptionsContainer.appendChild(label);
}
colorOptionsContainer.addEventListener("change", (event) => {
  if (event.target.name === "color") {
    const selectedColor = event.target.value; // e.g. "Red"
    console.log("Selected color:", selectedColor);

    // Here you would do:
    // - Update product color in your JS state or form
    // - Send to backend when saving product
  }
});
