import React, { useState, useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offer, setOffer] = useState({});

  let { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/" + id
      );
      setOffer(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log("vous êtes nul");
    }
  };
  console.log("offer here --> " + offer.created);

  let date;
  if (offer.created) {
    date = format(new Date(offer.created), "dd/MM/yyyy à mm:ss");
  } else {
    date = offer.created;
  }
  console.log("date -->" + date);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isLoading === true ? (
        "Loading in progress"
      ) : (
        <section className="offer">
          <div className="container">
            <div className="offer--article">
              <div className="offer--back--image">
                <img src={offer.pictures[0]} alt="product" />
              </div>
              <div className="offer--infos  box-shadow">
                <div>
                  <span className="offer--title">{offer.title}</span>
                  <span className="offer--price">{offer.price} €</span>
                </div>
                <span> {date} </span>
              </div>
              <div>
                <h3>Description</h3>
                <p>{offer.description}</p>
                <br />
              </div>
            </div>
            <aside className="box-shadow">
              <div className="offer--infos--user">
                <span>{offer.creator.account.username}</span>
                <a href="#">17 annonces en ligne</a>
              </div>
              <button className="offer--buy">
                <svg
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.2963 9.97C16.9563 10.59 16.2963 11 15.5463 11H8.09634L6.99634 13H18.9963V15H6.99634C5.47634 15 4.51634 13.37 5.24634 12.03L6.59634 9.59L2.99634 2H0.996338V0H4.26634L5.20634 2H20.0063C20.7663 2 21.2463 2.82 20.8763 3.48L17.2963 9.97ZM18.3063 4H6.15634L8.52634 9H15.5463L18.3063 4ZM6.99634 16C5.89634 16 5.00634 16.9 5.00634 18C5.00634 19.1 5.89634 20 6.99634 20C8.09634 20 8.99634 19.1 8.99634 18C8.99634 16.9 8.09634 16 6.99634 16ZM15.0063 18C15.0063 16.9 15.8963 16 16.9963 16C18.0963 16 18.9963 16.9 18.9963 18C18.9963 19.1 18.0963 20 16.9963 20C15.8963 20 15.0063 19.1 15.0063 18Z"
                    fill="white"
                  />
                </svg>
                Acheter
              </button>
            </aside>
          </div>
        </section>
      )}
    </>
  );
};

export default Offer;
