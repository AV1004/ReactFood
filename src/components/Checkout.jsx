import React, { useState } from "react";
import { updateUserOrders } from "../http";

export default function Checkout({
  onCancel,
  cartTotalPrice,
  cartItems,
  resetAllThings,
}) {
  const [isOrderIsCheckOut, setIsOrderIsCheckOut] = useState(false);
  const MakeAOrder = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    try {
      await updateUserOrders(customerData, cartItems);
    } catch (error) {
      console.log(error);
    }
    setIsOrderIsCheckOut(true);
  };

  if (isOrderIsCheckOut) {
    return (
      <div>
        <h2>Order Confirmed!</h2>
        <p>Your Order has been successfully placed!</p>
        <p>Other Information will be provided on your E-mail</p>
        <button
          className="button"
          onClick={() => {
            onCancel();
            resetAllThings();
          }}
        >
          Okay
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: ${cartTotalPrice.toFixed(2)}</p>
      <form onSubmit={MakeAOrder} className="control">
        <label htmlFor="name">Full Name</label>
        <input type="text" name="name" />
        <label htmlFor="email">E-Mail Adress</label>
        <input type="email" name="email" />
        <label htmlFor="street">Street</label>
        <input type="text" name="street" />
        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input type="number" name="postal-code" />
          </div>
          <div className="control">
            <label htmlFor="city">City</label>
            <input type="text" name="city" />
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={onCancel} className="text-button">
            Close
          </button>
          <button type="submit" className="button">
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
