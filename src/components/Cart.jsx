import React, { useEffect, useState } from "react";

export default function Cart({
  onCancel,
  totalPrice,
  cart,
  handleQtyAction,
  sawCheckOut,
}) {
  const handleOnCheckOut = () => {
    sawCheckOut();
  };

  if (cart.length === 0 || totalPrice === 0) {
    return (
      <div className="cart">
        <h2>Your Cart is empty!</h2>
        <div className="modal-actions">
          <button className="button" onClick={onCancel}>
            Close
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cart.map((cartItem) => {
        return (
          <ul key={cartItem.name} className="cart-item">
            <p>
              {cartItem.name} - {cartItem.qty} x ${cartItem.price.toFixed(2)}
            </p>
            <div className="cart-item-actions">
              <button
                onClick={() => {
                  if (cartItem.qty === 1) {
                    handleQtyAction(
                      cartItem.name,
                      cartItem.price,
                      "minus",
                      true
                    );
                  } else {
                    handleQtyAction(
                      cartItem.name,
                      cartItem.price,
                      "minus",
                      false
                    );
                  }
                }}
              >
                -
              </button>
              {cartItem.qty}
              <button
                onClick={() => {
                  handleQtyAction(cartItem.name, cartItem.price, "plus", false);
                }}
              >
                +
              </button>
            </div>
          </ul>
        );
      })}

      <div className="cart-total">${totalPrice.toFixed(2)}</div>
      <div className="modal-actions">
        <button className="text-button" onClick={onCancel}>
          Close
        </button>
        <button className="button" onClick={handleOnCheckOut}>
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
