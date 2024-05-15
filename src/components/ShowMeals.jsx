import React, { useEffect, useState } from "react";

import { fetchMeals } from "../http";

export default function ShowMeals({ sendDatatoCart }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState(false);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function getMeals() {
      try {
        setIsFetching(true);

        const meals = await fetchMeals();

        setAvailableMeals(meals);
        setIsFetching(false);
      } catch (error) {
        setError(true);
        setIsFetching(false);
      }
    }
    getMeals();
  }, []);

  if (error) {
    return (
      <div className="main-show-meals">
        <div id="meals">
          <li className="meal-item">
            <h3>
              An Error Has Ouccred During Fetching of Data Please Try Again
            </h3>
          </li>
        </div>
      </div>
    );
  }

  const handleAddTOCart = (name, price) => {
    sendDatatoCart(name, price);
  };

  return (
    <div id="main-show-meals">
      <div id="meals">
        {isFetching ? (
          <li className="meal-item">
            {" "}
            <h3>Fetching Available Meals....</h3>
          </li>
        ) : (
          availableMeals.map((meal) => {
            return (
              <li key={meal.id} className="meal-item">
                <img
                  src={`https://react-food-api.vercel.app/images/${meal.image}`}
                  alt={meal.name}
                />
                <h3>{meal.name}</h3>
                <div className="meal-item-price">${meal.price}</div>
                <p className="meal-item-description">{meal.description}</p>
                <button
                  className="meal-item-actions button"
                  onClick={() => {
                    handleAddTOCart(meal.name, meal.price);
                  }}
                >
                  Add to Cart
                </button>
              </li>
            );
          })
        )}
      </div>
    </div>
  );
}
