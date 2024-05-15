export const fetchMeals = async () => {
  const respone = await fetch("https://react-food-api.vercel.app/meals");
  const meals = await respone.json();

  if (!respone.ok) {
    throw new Error("Failed to Fetch Meals");
  }

  return meals;
};

export async function updateUserOrders(customer, cartItems) {
  const responses = await fetch("https://react-food-api.vercel.app/orders", {
    method: "POST",
    body: JSON.stringify({
      order: { items: cartItems, customer: customer },
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await responses.json();

  return resData.message;
}
