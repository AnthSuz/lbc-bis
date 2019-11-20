import React, { useState } from "react";
import axios from "axios";

const Publish = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");

  const userToken =
    // "zcJ8DHdAFTPH2JV8wRDb50kL0IgkquESMC3XAJuduoEP717J2en46sjNX0kzcdCv";
    props.token;
  return (
    <div className="container box-shadow">
      <div className="publish">
        <div className="publish--inside">
          <h2>Déposer une annonce</h2>
          <form
            onSubmit={async event => {
              event.preventDefault();
              if (props.token) {
                const formData = new FormData();
                formData.append("title", title);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("file", file);

                const response = await axios.post(
                  "https://leboncoin-api.herokuapp.com/api/offer/publish",
                  formData,
                  {
                    headers: {
                      Authorization: "Bearer " + userToken
                    }
                  }
                );

                console.log(response.data);
                setTitle("");
                setDescription("");
                setPrice("");
                setFile("");
              } else {
                props.setShowModal(true);
              }
            }}
          >
            <div className="publish--title">
              <p>Titre de l'annonce *</p>
              <input
                type="text"
                value={title}
                onChange={event => {
                  setTitle(event.target.value);
                }}
              />
            </div>

            <div className="publish--description">
              <p>Description de l'annonce *</p>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={event => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>

            <div className="publish--price">
              <p>Prix *</p>
              <input
                type="number"
                value={price}
                onChange={event => {
                  setPrice(event.target.value);
                }}
              />
              <span> €</span>
            </div>

            <div className="publish--pictures">
              <p>Photo *</p>
              <input
                type="file"
                onChange={event => {
                  setFile(event.target.files[0]);
                }}
              />
              <br />
            </div>
            <div className="publish--submit">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Publish;
