import React, { useState } from "react";
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

    let createdCard;

    try {
      createdCard = await saveCard(name, email, message);
    } catch (error) {
      console.log("Error crearing card", error);
    }

    if (!createdCard) {
      console.log("createdCard is empty");
      return;
    }

    console.log(createdCard);

    const cardId = createdCard.id;

    const link = `/get-card/${cardId}`;

    setCardMessageUrl(link);

    sendEmail(
      name,
      email,
      message,
      `${process.env.REACT_APP_DEPLOY_URL}${link}`
    );

    setSent(true);

    setName("");
    setEmail("");
    setMessage("");
  };

  const handleBack = () => {
    setSent(false);
  };
  return (
    <div>
      {!sent ? (
        <div className="form">
          <div className="title">Send your wish</div>
          <div className="input-container ic1">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder=" "
              required
            />
            <div className="cut"></div>
            <label htmlFor="firstname" className="placeholder">
              Your name
            </label>
          </div>
          <div className="input-container ic2">
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input"
              placeholder=" "
              required
            />
            <div className="cut"></div>
            <label htmlFor="message" className="placeholder">
              Whishes
            </label>
          </div>
          <div className="input-container ic2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder=" "
              required
            />
            <div className="cut cut-short"></div>
            <label htmlFor="email" className="placeholder">
              Email
            </label>
          </div>
          <button onClick={handleSubmit} type="submit" className="submit">
            Send Wishes
          </button>
        </div>
      ) : (
        <div className="form">
          <p className="title">Your Christmas card has been sent!</p>
          <Link
            to={cardMessageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="title"
          >
            Click here to view your Christmas card
          </Link>
          <br />
          <button onClick={handleBack} className="submit">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default InputForm;
