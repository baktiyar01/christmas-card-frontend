import React, { useState } from "react";
import christmas from "./christmas-card.jpeg";
import { sendEmail, saveCard } from "../utils/utils";
import { Link } from "react-router-dom";

const InputForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [cardMessageUrl, setCardMessageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdCard = await saveCard(name, email, message);

    // Assuming createdCard contains information about the card, including an ID
    const cardId = createdCard.id;

    // Generate the link for viewing the Christmas card
    const link = `/get-card/${cardId}`;

    // Set the link in state
    setCardMessageUrl(link);

    // Uncomment the line below to send an email
    sendEmail(
      name,
      email,
      message,
      `${process.env.REACT_APP_DEPLOY_URL}${link}`
    );

    // Set the sent state to true
    setSent(true);

    // Clear the form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleBack = () => {
    setSent(false); // Reset the sent state to false when the user clicks the back button
  };

  return (
    <div>
      <h2>Send Christmas Wishes</h2>
      {!sent ? (
        <div
          style={{
            backgroundImage: `url(${christmas})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              padding: "10px",
              marginBottom: "10px",
              border: "none",
              borderRadius: "5px",
              margin: "60px",
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <textarea
              name="message"
              placeholder="Wishes"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
        </div>
      ) : (
        <div>
          <p>Your Christmas card has been sent!</p>
          <Link to={cardMessageUrl} target="_blank" rel="noopener noreferrer">
            Click here to view your Christmas card
          </Link>
          <br />
          <button onClick={handleBack}>Back</button>
        </div>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "10px",
          border: "none",
          borderRadius: "5px",
        }}
      />
      <button onClick={handleSubmit} type="submit">
        Send Wishes
      </button>
    </div>
  );
};

export default InputForm;
