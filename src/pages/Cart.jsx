import React from "react";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Checkout from "./Checkout";

const Cart = ({ cartItems }) => {
  const totalAmount = 0;

  return (
    <Helmet title="Cart">
      <CommonSection title="Your Cart" />
      <section>
        {cartItems.length === 0 ? (
          <h5 className="text-center">Your cart is empty</h5>
        ) : (
          <>
            <h5 className="mb-5">Summary of your order</h5>
            <table className="table table-borderless mb-5 align-middle">
              <tbody>
                {cartItems.map((item) => (
                  <Tr item={item} key={item.id} />
                ))}
              </tbody>
            </table>
            <Checkout />
          </>
        )}

        <div className="mt-4">
          <h6>
            Subtotal: ₹<span className="cart__subtotal">{totalAmount}</span>
          </h6>
          <p>Taxes and shipping will calculate at checkout</p>
          {cartItems.length > 0 && (
            <div className="cart__page-btn">
              <button className="addTOCart__btn me-4">
                <Link to="/pizzas">Continue Shopping</Link>
              </button>
              <button className="addTOCart__btn">
                <Link to="/checkout">Proceed to checkout</Link>
              </button>
            </div>
          )}
        </div>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;

  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">₹{price}</td>
      <td className="text-center">{quantity}px</td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart.cartItems,
  };
};

export default connect(mapStateToProps)(Cart);
