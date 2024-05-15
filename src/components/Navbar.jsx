import React from "react";
import LOGO from "../assets/logo.jpg";

export default function Navbar({ userWantToOpenCart, totalCartItems }) {
  return (
    <nav id="main-header">
      <h1 id="title">
        <img src={LOGO} alt="ReactFood" />
        REACTFOOD
      </h1>
      <div id="btn" onClick={userWantToOpenCart}>
        Cart({totalCartItems})
      </div>
    </nav>
  );
}
