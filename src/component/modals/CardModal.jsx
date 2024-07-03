import React, { useContext } from "react";
import "../../styles/CardModal.style.css";
import { ProductContext } from "../../context/ProductProvider";

const CardModal = React.forwardRef((props, cartRef) => {
  const { cartData: cartItems, setCartData } = useContext(ProductContext);

  const deleteItem = (item) => {
    let list = cartItems;
    let newList = list.filter((x) => x.id !== item.id);
    setCartData(newList);
    // dispatch(remove_items(newList));
  };

  // finding the total amount from the items in cart
  let total = 0;
  // map the items in cart and add to total
  cartItems.map((item) => {
    total += Number(item.price) * Number(item.quantity);
    return total;
  });

  return (
    <div className="cart-modal" ref={cartRef}>
      <div className="top">
        <p className="cart-title">Cart</p>
        <p className="total-price">
          Total Price: ${parseFloat(total.toFixed(2))}
        </p>
      </div>
      <div className="bottom">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="occupied-cart">
            <div className="item-list">
              {cartItems.map((item, index) => {
                return (
                  <div className="item" id={item.id} key={index}>
                    <div
                      className="item-prev"
                      style={{ backgroundImage: `url(${item.img})` }}
                    ></div>
                    <div className="cart-item-info">
                      <p className="item-name">{item.title}</p>
                      <p className="item-quantity">
                        ${item.price} x {item.quantity}{" "}
                        <span>${item.price * item.quantity}</span>
                      </p>
                    </div>
                    <button
                      className="del"
                      onClick={() => deleteItem(item)}
                    ></button>
                  </div>
                );
              })}
            </div>
            <button className="checkout">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
});

export default CardModal;
