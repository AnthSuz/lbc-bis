import React, { useState, useEffect } from "react";

import Null from "../images/img-null.png";
import { Link } from "react-router-dom";
import Wen from "../svg/Wen";

import LeftPage from "../svg/LeftPage";
import LeftPageBlue from "../svg/LeftPageBlue";

import format from "date-fns/format";

import RightPageBlue from "../svg/RightPageBlue";
import RightPage from "../svg/RightPage";

import axios from "axios";

const Offers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("Filtre");
  const limit = 5;
  const tab = [];

  const sortTab = [
    "Filtre",
    "price-desc",
    "price-asc",
    "date-desc",
    "date-asc"
  ];
  const sortTabModified = [];
  for (let i = 0; i < sortTab.length; i++) {
    sortTabModified.push(<option value={sortTab[i]}>{sortTab[i]}</option>);
  }

  let url =
    "https://leboncoin-api.herokuapp.com/api/offer/with-count?skip=" +
    page +
    "&limit=" +
    limit;

  if (title !== "") {
    url = url + "&title=" + title;
  }
  if (priceMin > 0) {
    url = url + "&priceMin=" + priceMin;
  }
  if (priceMax > 0) {
    url = url + "&priceMax=" + priceMax;
  }
  if (sort) {
    url = url + "&sort=" + sort;
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
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
          <form
            onSubmit={event => {
              event.preventDefault();
              fetchData();
            }}
          >
            <div className="search">
              <Wen />

              <input
                type="text"
                value={title}
                placeholder="Que recherchez-vous ?"
                onChange={event => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <input
              className="search--box--input--price"
              type="number"
              value={priceMin}
              placeholder="Prix Min."
              onChange={event => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              className="search--box--input--price"
              type="number"
              value={priceMax}
              placeholder="Prix Max."
              onChange={event => {
                setPriceMax(event.target.value);
              }}
            />

            <select
              className="search--box--input--sort"
              value={sort}
              onChange={event => {
                setSort(event.target.value);
              }}
            >
              {sortTabModified}
            </select>

            <input
              type="submit"
              value="Rechercher"
              className="search--button--blue"
              onClick={() => {
                fetchData();
              }}
            />
            <br />
          </form>
        </div>
      </div>

      {/* OFFERS */}
      {isLoading === true ? (
        <p>Chargement en cours ...</p>
      ) : (
        <div className="container offers">
          {card.map((annonce, index) => {
            const date = format(
              new Date(annonce.created),
              "dd/MM/yyyy à mm:ss"
            );
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

                  <ul className="white offers--description p-15 offers--inside--description">
                    <div className="top--description">
                      <li className="offers--title">{annonce.title}</li>
                      <li className="offers--price">{annonce.price} €</li>
                    </div>

                    <div className="bottom--description">
                      <li className="offers--date">{date}</li>
                    </div>
                  </ul>
                </article>
              </Link>
            );
          })}
          <div className="offers--array--pages">
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
