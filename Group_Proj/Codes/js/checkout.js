users = JSON.parse(localStorage.getItem("users") || "[]");
currentUserTRN = JSON.parse(localStorage.getItem("currentUser"));

let subtotal = 0;
let shipping = 5.0;
let tax = 0;
let discount = 0;
const taxRate = 0.15;

// Find current user's cart
let i = 0;
for (i = 0; i < users.length; i++) {
  if (users[i].trn === currentUserTRN) break;
}

// Get cart
let cart = users[i].cart;
console.log(cart);

// Render items
cart.forEach((item) => {
  const itemLi = document
    .querySelector(".items")
    .appendChild(document.createElement("li"));
  itemLi.innerText = `${item.item_name} -${item.item_material} - ${item.item_size} :
  ${item.price}`;
  const numericPrice = parseFloat(item.price.replace("$", "").trim());

  // calculate subtotal and shipping
  subtotal += numericPrice;
  shipping += 1.0;
});

// Calculate tax
tax = subtotal * taxRate;

// Apply 10% discount if subtotal > $500
discount = subtotal > 500 ? subtotal * 0.1 : 0;

// Update summary
document.getElementById("summary-subtotal").innerText = subtotal.toFixed(2);
document.getElementById("summary-shipping").innerText = shipping.toFixed(2);
document.getElementById("summary-tax").innerText = tax.toFixed(2);
document.getElementById("summary-discount").innerText = discount.toFixed(2);
document.getElementById("summary-total").innerText = (
  subtotal +
  tax +
  shipping -
  discount
).toFixed(2);

// Handle form submission
const form = document.querySelector(".checkout-form");
form.addEventListener("submit", submit);

function submit(e) {
  e.preventDefault();

  // Validate user is logged in
  const userRecordIndex = i;
  const userRecord = users[userRecordIndex];

  if (!currentUserTRN || !userRecord || userRecordIndex === users.length) {
    alert("Please log in to place an order.");
    window.location.href = "signin.html";
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty. Cannot place an order.");
    window.location.href = "cart.html";
    return;
  }

  // 1. Generate Invoice Data
  const invSubtotal = subtotal;
  const invDiscount = discount;
  const invTax = tax;

  const invTotalCost = invSubtotal + invTax - invDiscount + shipping;

  // Collect Shipping Details
  const shippingDetails = {
    street: document.getElementById("ship-street").value,
    town: document.getElementById("ship-town").value,
    cityParish: document.getElementById("ship-city-parish").value,
    country: document.getElementById("ship-country").value,
    amountPaid: invTotalCost.toFixed(2),
  };

  // Create the Invoice Object
  const invoice = {
    companyName: "CanvasCart",
    dateOfInvoice: new Date().toLocaleDateString("en-US"),
    invoiceNumber: "INV-" + Date.now().toString().slice(-8),
    trn: currentUserTRN,
    shippingInformation: {
      name: `${userRecord.firstName} ${userRecord.lastName}`,
      address: `${shippingDetails.street}, ${shippingDetails.town}, ${shippingDetails.cityParish}, ${shippingDetails.country}`,
      amountPaid: parseFloat(shippingDetails.amountPaid),
    },
    purchasedItems: cart.map((item) => ({
      name: item.item_name,
      quantity: 1,
      price: parseFloat(item.price.replace("$", "").trim()),
      discount: 0,
    })),
    subtotal: invSubtotal,
    discount: invDiscount,
    taxes: invTax,
    totalCost: invTotalCost,
  };

  // 4. Store the invoice in the user's RegistrationData
  users[userRecordIndex].invoices.push(invoice);

  // Store a copy of the invoice in the global AllInvoices array
  let allInvoices = JSON.parse(localStorage.getItem("AllInvoices") || "[]");
  allInvoices.push(invoice);
  localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));

  localStorage.setItem("users", JSON.stringify(users));

  // Store the generated invoice data in session storage to display it on the next page
  sessionStorage.setItem("lastInvoice", JSON.stringify(invoice));

  // Clear user's cart and generic cart key
  users[userRecordIndex].cart = [];
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("cart");

  alert("Order placed successfully! Redirecting to Invoice.");
  window.location.href = "invoices.html";
}

// Select the Return to Cart button
const returnBtn = document.querySelector(".return-to-cart");

// Add click event
returnBtn.addEventListener("click", () => {
  // Redirect back to cart page
  window.location.href = "cart.html";
});
