import React, { useState, useEffect } from "react";

import Null from "../images/img-null.png";
import { Link } from "react-router-dom";
import Wen from "../svg/Wen";

import LeftPage from "../svg/LeftPage";
import LeftPageBlue from "../svg/LeftPageBlue";

import RightPageBlue from "../svg/RightPageBlue";
import RightPage from "../svg/RightPage";

import axios from "axios";

const Offers = () => {
  //   const date = format(new Date(props.date), "MM/dd/yyyy à mm:ss");
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const limit = 5;
  const tab = [];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=" +
          page +
          "&limit=" +
          limit
      );
      setIsLoading(false);
      setCard(response.data.offers);
      setCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  for (let i = 0; i < count / limit; i++) {
    tab.push(i + 1);
  }
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <section>
      <div className="container pv-50">
        <div className="search--box br-5 box-shadow">
          <div className="search">
            <Wen />
            <input type="text" size="25" placeholder="Que recherchez-vous ?" />
          </div>

          <button className="search--button--blue">Rechercher</button>
        </div>
      </div>
      {/* OFFERS */}
      {isLoading === true ? (
        <p>Chargement en cours ...</p>
      ) : (
        <div className="container offers">
          {card.map((annonce, index) => {
            return (
              <Link to={"/offer/" + annonce._id}>
                <article className="box-shadow overflow-hidden br-5 mb-20">
                  <div className="bg-silver d-flex">
                    {annonce.pictures[0] !== undefined ? (
                      <img src={annonce.pictures[0]} alt="" />
                    ) : (
                      <img src={Null} alt="" />
                    )}
                  </div>

                  <ul className="white description p-15 inside--description">
                    <div className="top-description">
                      <li className="title">{annonce.title}</li>
                      <li className="price">{annonce.price} €</li>
                    </div>

                    <div className="bottom-description">
                      <li className="date">{annonce.created}</li>
                    </div>
                  </ul>
                </article>
              </Link>
            );
          })}
          <div className="array--pages">
            {page === 0 ? (
              <span>{page === 0 ? <LeftPage /> : <LeftPageBlue />}</span>
            ) : (
              <span
                onClick={() => {
                  setPage(page - limit);
                }}
              >
                {page === 0 ? <LeftPage /> : <LeftPageBlue />}
              </span>
            )}

            {tab.map((array, index) => {
              return (
                <>
                  {page === array * limit - limit ? (
                    <p
                      className="selected--page br-5"
                      onClick={() => {
                        setPage(array * limit - limit);
                      }}
                    >
                      {array}
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        setPage(array * limit - limit);
                      }}
                    >
                      {array}
                    </p>
                  )}
                </>
              );
            })}

            {page === (tab.length - 1) * limit ? (
              <span>
                {page === (tab.length - 1) * limit ? (
                  <RightPage />
                ) : (
                  <RightPageBlue />
                )}
              </span>
            ) : (
              <span
                onClick={() => {
                  setPage(page + limit);
                }}
              >
                {page === (tab.length - 1) * limit ? (
                  <RightPage />
                ) : (
                  <RightPageBlue />
                )}
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
export default Offers;
