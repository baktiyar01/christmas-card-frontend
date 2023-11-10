import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewCard = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PUBLIC_URL}/get-card/${cardId}`
        );

        setCard(response.data);
      } catch (error) {
        console.error("Error fetching card", error);
      }
    };

    fetchCard();
  }, [cardId]);

  return (
    <div className="view-card-container">
      {card ? (
        <div className="card-content">
          <p>From: {card.name}</p>
          <p className="message"> {card.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewCard;
