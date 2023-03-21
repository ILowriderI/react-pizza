import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import styles from "./PizzaPage.module.scss";
import arrowIco from "./../img/arrow-left.png";

const PizzaPage = () => {
  const [isError, setIsError] = useState(false);
  const [dataPizza, setDataPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://64072b73862956433e669de8.mockapi.io/items?id=${id}`)
      .then(({ data }) => {
        setDataPizza(data[0]);
      })
      .catch((error) => {
        console.log(error.message);
        setIsError(true);
      });
  }, [id]);

  if (!dataPizza) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <>
      {isError ? (
        <ErrorMessage />
      ) : (
        <div>
          <h1 className={styles.title}>{dataPizza.title}</h1>
          <div className={styles.wrap}>
            <PizzaBlock
              id={dataPizza.id}
              title={dataPizza.title}
              price={dataPizza.price}
              pizzaImg={dataPizza.imageUrl}
              size={dataPizza.sizes}
              doughTypes={dataPizza.types}
            />
            <div className={styles.discription}>{dataPizza.description}</div>
          </div>
          <Link to="/">
            <button className={styles.btn}>
              {" "}
              <img src={arrowIco} alt="arrow" /> Back
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default PizzaPage;
