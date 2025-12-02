const AllProducts = [
  {
    name: "Robin Bird",
    description:
      "A beautiful close-up of a European Robin perched on a branch.",
    price: 49.99,
    image: "../../Assets/bird.webp",
  },
  {
    name: "Wānaka Tree",
    description:
      "The iconic, solitary willow tree near Lake Wānaka in New Zealand.",
    price: 79.5,
    image: "../../Assets/default.jpg",
  },
  {
    name: "Cherry Blossom",
    description:
      "Vibrant pink cherry blossom tree in full bloom, symbolizing spring.",
    price: 65.0,
    image: "../../Assets/pink_tree.webp",
  },
  {
    name: "Red Flower",
    description: "A macro shot of a striking red flower with detailed petals.",
    price: 35.99,
    image: "../../Assets/flower.jpg",
  },
  {
    name: "Sky",
    description:
      "A tranquil canvas capturing soft, sweeping clouds across a blue sky.",
    price: 55.0,
    image: "../../Assets/sky.jpg",
  },
  {
    name: "Blue Leaves",
    description:
      "Artistic interpretation of leaves rendered in cool, deep blue tones.",
    price: 45.75,
    image: "../../Assets/leves.jpg",
  },
  {
    name: "Cute Rabbit",
    description:
      "An adorable fluffy rabbit nestled in the grass, perfect for a nursery.",
    price: 59.99,
    image: "../../Assets/rabbit.jpg",
  },
  {
    name: "Fall Road",
    description: "A scenic road lined with trees ablaze in autumn colors.",
    price: 89.9,
    image: "../../Assets/road.jpg",
  },
  {
    name: "Water Fall",
    description: "A powerful, flowing waterfall descending into a clear pool.",
    price: 99.99,
    image: "../../Assets/water_fall.jpg",
  },
  {
    name: "House on the Lake",
    description:
      "A cozy cabin reflecting perfectly on a still, misty lake at dawn.",
    price: 110.0,
    image: "../../Assets/house_on_the_lake.jpg",
  },
  {
    name: "Night City",
    description:
      "A long-exposure photograph capturing the vibrant lights of a bustling city at night.",
    price: 125.0,
    image: "../../Assets/night_city.jpg",
  },
];

// Save the array to Local Storage so catalog.js can access it
localStorage.setItem("AllProducts", JSON.stringify(AllProducts));
