const selectedImage = localStorage.getItem("selectedImage");

let img_element = document.getElementById("product-image");
let img_name = document.getElementById("image-name");
let item_discription = document.getElementById("discription");
let img_h_ratio;

let item_name = "";
let item_material = "";
let item_size = "";
let price = "";
let image_link = "";

if (selectedImage) {
  const image = JSON.parse(selectedImage);

  img_element.src = image.link;
  image_link = image.link;
  img_name.innerText = image.name;
  item_name = image.name;
  item_discription.innerText = image.description;

  // Calculate image height ratio
  const img_height = img_element.naturalHeight;
  const img_width = img_element.naturalWidth;

  img_h_ratio = img_height / img_width;

  let size_string = "Small (" + Math.round(img_h_ratio * 10) + "× 10) in";
  document.getElementById("sml-img").innerText = size_string;

  size_string = "Medium (" + Math.round(img_h_ratio * 12) + "× 12) in";
  document.getElementById("med-img").innerText = size_string;

  size_string = "Large (" + Math.round(img_h_ratio * 16) + "× 16) in";
  document.getElementById("lrg-img").innerText = size_string;
}

const material_radios = document.querySelectorAll('input[name="material"]');
const size_radios = document.querySelectorAll('input[name="size"]');
let material_cost = 100;
let canvas_size = 10;

material_radios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const material = this.value;

    if (material == "paper") {
      material_cost = 50;
    } else if (material == "metal") {
      material_cost = 100;
    } else {
      material_cost = 70;
    }

    item_material = material;

    update_price();
  });
});

size_radios.forEach((radio) => {
  radio.addEventListener("change", function () {
    const size = this.value;

    if (size == "small") {
      canvas_size = 10;
      item_size = "Small (" + Math.round(img_h_ratio * 10) + "× 10) in";
    } else if (size == "medium") {
      canvas_size = 12;
      item_size = "Medium (" + Math.round(img_h_ratio * 12) + "× 12) in";
    } else {
      canvas_size = 18;
      item_size = "Large (" + Math.round(img_h_ratio * 16) + "× 16) in";
    }

    update_price();
  });
});

function update_price() {
  if (item_material != "" && item_size != "") {
    price = "$ " + material_cost * Math.round(img_h_ratio * canvas_size);
    document.getElementById("product-price").innerText = price;
  }
}

const add_cart_button = document.querySelector(".add-cart");
if (add_cart_button) {
  add_cart_button.addEventListener("click", function () {
    if (price != "") {
      const item = {
        item_name,
        item_material,
        item_size,
        price,
        image_link,
      };

      // Get current cart

      users = JSON.parse(localStorage.getItem("users") || "[]");
      currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) {
        alert("Please log in to add items to your cart.");
        return;
      }

      for (let i = 0; i < users.length; i++) {
        if (users[i].trn === currentUser) {
          users[i].cart.push(item);
          localStorage.setItem("users", JSON.stringify(users));
          break;
        }
      }
      alert("Item was added to cart");
    } else {
      alert("Please select a SIZE and MATERIAL");
    }
  });
}
