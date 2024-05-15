import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", async (req, res) => {
  res.send("Hello from ReactFood API by AV1004");
});

app.get("/meals", async (req, res) => {
  const meals = [
    {
      id: "m1",
      name: "Mac & Cheese",
      price: "8.99",
      description:
        "Creamy cheddar cheese mixed with perfectly cooked macaroni, topped with crispy breadcrumbs. A classic comfort food.",
      image: "images/mac-and-cheese.jpg",
    },
    {
      id: "m2",
      name: "Margherita Pizza",
      price: "12.99",
      description:
        "A classic pizza with fresh mozzarella, tomatoes, and basil on a thin and crispy crust.",
      image: "images/margherita-pizza.jpg",
    },
    {
      id: "m3",
      name: "Caesar Salad",
      price: "7.99",
      description:
        "Romaine lettuce tossed in Caesar dressing, topped with croutons and parmesan shavings.",
      image: "images/caesar-salad.jpg",
    },
    {
      id: "m4",
      name: "Spaghetti Carbonara",
      price: "10.99",
      description:
        "Al dente spaghetti with a creamy sauce made from egg yolk, pecorino cheese, pancetta, and pepper.",
      image: "images/spaghetti-carbonara.jpg",
    },
    {
      id: "m5",
      name: "Veggie Burger",
      price: "9.99",
      description:
        "A juicy veggie patty served on a whole grain bun with lettuce, tomato, and a tangy sauce.",
      image: "images/veggie-burger.jpg",
    },
    {
      id: "m6",
      name: "Grilled Chicken Sandwich",
      price: "10.99",
      description:
        "Tender grilled chicken breast with avocado, bacon, lettuce, and honey mustard on a toasted bun.",
      image: "images/grilled-chicken-sandwich.jpg",
    },
    {
      id: "m7",
      name: "Steak Frites",
      price: "17.99",
      description:
        "Succulent steak cooked to your preference, served with crispy golden fries and herb butter.",
      image: "images/steak-frites.jpg",
    },
    {
      id: "m8",
      name: "Sushi Roll Platter",
      price: "15.99",
      description:
        "An assortment of fresh sushi rolls including California, Spicy Tuna, and Eel Avocado.",
      image: "images/sushi-roll-platter.jpg",
    },
    {
      id: "m9",
      name: "Chicken Curry",
      price: "13.99",
      description:
        "Tender pieces of chicken simmered in a rich and aromatic curry sauce, served with basmati rice.",
      image: "images/chicken-curry.jpg",
    },
    {
      id: "m10",
      name: "Vegan Buddha Bowl",
      price: "11.99",
      description:
        "A hearty bowl filled with quinoa, roasted veggies, avocado, and a tahini dressing.",
      image: "images/vegan-buddha-bowl.jpg",
    },
    {
      id: "m11",
      name: "Seafood Paella",
      price: "19.99",
      description:
        "A Spanish delicacy filled with saffron-infused rice, shrimp, mussels, and chorizo.",
      image: "images/seafood-paella.jpg",
    },
    {
      id: "m12",
      name: "Pancake Stack",
      price: "8.99",
      description:
        "Fluffy pancakes stacked high, drizzled with maple syrup and topped with fresh berries.",
      image: "images/pancake-stack.jpg",
    },
    {
      id: "m13",
      name: "Miso Ramen",
      price: "12.99",
      description:
        "A warming bowl of ramen with miso broth, tender pork, soft-boiled egg, and green onions.",
      image: "images/miso-ramen.jpg",
    },
    {
      id: "m14",
      name: "Beef Tacos",
      price: "9.99",
      description:
        "Three soft tortillas filled with seasoned beef, fresh salsa, cheese, and sour cream.",
      image: "images/beef-tacos.jpg",
    },
    {
      id: "m15",
      name: "Chocolate Brownie",
      price: "5.99",
      description:
        "A rich and fudgy brownie, topped with a scoop of vanilla ice cream and chocolate sauce.",
      image: "images/chocolate-brownie.jpg",
    },
    {
      id: "m16",
      name: "Lobster Bisque",
      price: "14.99",
      description:
        "A creamy soup made from lobster stock, aromatic vegetables, and a touch of brandy.",
      image: "images/lobster-bisque.jpg",
    },
    {
      id: "m17",
      name: "Mushroom Risotto",
      price: "13.99",
      description:
        "Creamy Arborio rice cooked with a medley of wild mushrooms and finished with parmesan.",
      image: "images/mushroom-risotto.jpg",
    },
    {
      id: "m18",
      name: "Eggplant Parmesan",
      price: "11.99",
      description:
        "Layers of breaded eggplant, marinara sauce, and melted mozzarella and parmesan cheeses.",
      image: "images/eggplant-parmesan.jpg",
    },
    {
      id: "m19",
      name: "Lemon Cheesecake",
      price: "6.99",
      description:
        "A creamy cheesecake with a tangy lemon flavor, served on a crumbly biscuit base.",
      image: "images/lemon-cheesecake.jpg",
    },
    {
      id: "m20",
      name: "Falafel Wrap",
      price: "8.99",
      description:
        "Crispy falafels wrapped in a warm pita with lettuce, tomatoes, and a tahini sauce.",
      image: "images/falafel-wrap.jpg",
    },
  ];

  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile("./data/orders.json", "utf8");
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
  res.status(201).json({ message: "Order created!" });
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000);
