import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

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
          <p className="card-title">Merry Christmas</p>
          <p className="card-message"> {card.message}</p>
          <p className="card-name">From: {card.name}</p>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ViewCard;
