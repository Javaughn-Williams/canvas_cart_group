// catalog.js

document.addEventListener("DOMContentLoaded", () => {
  const products = JSON.parse(localStorage.getItem("AllProducts") || "[]");
  const productList = document.getElementById("product-list");

  if (!productList) {
    console.error("ERROR: #product-list not found in HTML");
    return;
  }

  productList.innerHTML = "";

  const formatPrice = (price) => "$" + price.toFixed(2);

  products.forEach((product) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    itemDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}">

      <div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>
    `;

    productList.appendChild(itemDiv);
  });

  console.log("catalog.js finished rendering products");

  // Attach click event to all items
  document.querySelectorAll(".item").forEach(makeClickable);

  function makeClickable(item) {
    const img = item.querySelector("img");
    const name = item.querySelector("div h3").textContent;
    const description = item.querySelector("div p").textContent;

    item.addEventListener("click", () => {
      const image = {
        link: img.src,
        name: name,
        description: description,
      };

      // Save the clicked image source to localStorage
      localStorage.setItem("selectedImage", JSON.stringify(image));

      // Redirect to product page
      window.location.href = "product.html";
    });
  }
});
