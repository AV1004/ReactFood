import { useState } from "react";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import ShowMeals from "./components/ShowMeals";

function App() {
  const [cart, setCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [isCartOpen, setisCartOpen] = useState(false);

  const [isCheckOutOpen, setisCheckOutOpen] = useState(false);

  const takeCartData = (name, price) => {
    const isMealAlreadyInCart = cart.filter((meal) => {
      if (meal.name === name) {
        return meal;
      }
    });

    if (isMealAlreadyInCart.length !== 0) {
      const nameOfItem = isMealAlreadyInCart[0].name;
      const priceOfItem = isMealAlreadyInCart[0].price;
      const qty = isMealAlreadyInCart[0].qty;

      const indexOfExistingItemInArray = cart.indexOf(isMealAlreadyInCart[0]);
      cart[indexOfExistingItemInArray] = {
        name: nameOfItem,
        price: priceOfItem,
        qty: qty + 1,
      };
      setCartTotalPrice(Number(cartTotalPrice) + Number(priceOfItem));
    } else {
      setCart((prevItems) => {
        return [
          ...prevItems,
          {
            name: name,
            price: Number(price),
            qty: 1,
          },
        ];
      });
      setCartTotalPrice(Number(cartTotalPrice) + Number(price));
    }
  };

  const handleQtyAction = (name, price, plusOrMinus, isItemToBeZero) => {
    const isMealAlreadyInCart = cart.filter((meal) => {
      if (meal.name === name) {
        return meal;
      }
    });

    const indexOfExistingItemInArray = cart.indexOf(isMealAlreadyInCart[0]);

    if (isItemToBeZero === true) {
      setCart(
        cart.filter((cartItem, index) => index !== indexOfExistingItemInArray)
      );
      setCartTotalPrice(Number(cartTotalPrice) - Number(price));
    } else {
      if (plusOrMinus === "plus") {
        const nextCartItems = cart.map((cartItem, index) => {
          if (index === indexOfExistingItemInArray) {
            return {
              name: cartItem.name,
              price: cartItem.price,
              qty: cartItem.qty + 1,
            };
          } else {
            return cartItem;
          }
        });
        setCart(nextCartItems);
        setCartTotalPrice(Number(cartTotalPrice) + Number(price));
      } else {
        const nextCartItems = cart.map((cartItem, index) => {
          if (index === indexOfExistingItemInArray) {
            return {
              name: cartItem.name,
              price: cartItem.price,
              qty: cartItem.qty - 1,
            };
          } else {
            return cartItem;
          }
        });
        setCart(nextCartItems);
        setCartTotalPrice(Number(cartTotalPrice) - Number(price));
      }
    }
  };

  const cartIsOpen = () => {
    setisCartOpen(true);
  };

  const userWantToCloseCart = () => {
    setisCartOpen(false);
  };

  const sawCheckOut = () => {
    setisCheckOutOpen(true);
    setisCartOpen(false);
  };

  const onCloseCheckOut = () => {
    setisCheckOutOpen(false);
  };

  const resetAllThings = () => {
    setCart([]);
    cartTotalPrice(0);
    isCartOpen(false);
    isCheckOutOpen(false);
  };

  return (
    <>
      <Navbar userWantToOpenCart={cartIsOpen} totalCartItems={cart.length} />
      <ShowMeals sendDatatoCart={takeCartData} />

      <Modal open={isCartOpen}>
        {isCartOpen && (
          <Cart
            cart={cart}
            totalPrice={cartTotalPrice}
            onCancel={userWantToCloseCart}
            handleQtyAction={handleQtyAction}
            sawCheckOut={sawCheckOut}
          />
        )}
      </Modal>

      <Modal open={isCheckOutOpen}>
        {isCheckOutOpen && (
          <Checkout
            onCancel={onCloseCheckOut}
            cartTotalPrice={cartTotalPrice}
            cartItems={cart.length}
            resetAllThings={resetAllThings}
          />
        )}
      </Modal>
    </>
  );
}

export default App;
