//import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Header from "../Header/Header";
import Home from "../../pages/Home";
import NotFound from "../../pages/NotFound";
import Cart from "../../pages/Cart";

import "../../scss/app.scss";
import PizzaPage from "../../pages/PizzaPage";


const App = () => {


  return (
    <div>
     
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<PizzaPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
     
    </div>
  );
};

export default App;
/*
 
*/
