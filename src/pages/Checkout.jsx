// Checkout.js

import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { connect } from "react-redux"; 
import { cartActions } from "../store/shopping-cart/cartSlice";  
import "../styles/checkout.css";
import guyImg from "../assets/images/hero.png";

const Checkout = ({ totalAmount, dispatch }) => {
  useEffect(() => {
    if (totalAmount > 0) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY, 
          key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY, 

          amount: totalAmount * 100, 
          currency: "INR",
          name: "Tasty Treat",
          description: "Payment for Order",
          image:
            "https://g45v7r-3000.csb.app/static/media/res-logo.2f9021c4ef5fe532038e.png",
          handler: function (response) {
            console.log(response);
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [totalAmount]);

  if (totalAmount === 0) {
    return null;
  }

  return (
    <>
      <div className="checkoutMessage">
        <div className="checkoutTitleContainer">
          <AiFillCheckCircle className="checkoutIcon" />
          <h3 className="motionText">Thank you for your order!</h3>
        </div>
        <span>
          Your order is being processed and will be delivered as fast as
          possible.
        </span>
      </div>
      <div className="hero__img">
        <img src={guyImg} alt="delivery-guy" className="w-100" />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    totalAmount: state.cart.totalAmount,
  };
};

export default connect(mapStateToProps)(Checkout);
