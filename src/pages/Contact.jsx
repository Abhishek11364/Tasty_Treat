import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import "../styles/contact.css";

const ContactPage = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const sendEmail = () => {
    const templateParams = {
      from_name: nameRef.current.value,
      from_email: emailRef.current.value,
      message: messageRef.current.value,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID,
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          toast.success("Email sent successfully!");
          // Clear the form fields after success
          nameRef.current.value = "";
          emailRef.current.value = "";
          messageRef.current.value = "";
        },
        (error) => {
          console.error("Error sending email:", error);
          toast.error("Error sending email");
        },
      );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Gather form data
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;

    // Log the form data for demonstration purposes
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // Send the email
    sendEmail();
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <ToastContainer /> {/* This is the container for displaying toasts */}
      <form className="contact-form" onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            required
            ref={nameRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            required
            ref={emailRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            placeholder="Your message"
            required
            ref={messageRef}
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
