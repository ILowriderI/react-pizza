import { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setPageCurrent,
  setFilters,
} from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/pizzaSlice";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import qs from "qs";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { categoryies } from "../components/Categories/Categories";

const Home = () => {
  const isMounted = useRef(false);
  const navigate = useNavigate();

  const categoryId = useSelector((state) => state.filterReducer.categoryId);
  const sort = useSelector((state) => state.filterReducer.sort.sortProp);
  const searchValue = useSelector((state) => state.filterReducer.searchValue);
  const currentPage = useSelector((state) => state.filterReducer.currentPage);
  const items = useSelector((state) => state.pizzaReducer.items);
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const response = `https://64072b73862956433e669de8.mockapi.io/items?${category}${search}&sortBy=${sort}&order=desc&page=
  ${categoryId > 0 ? 1 : currentPage}&limit=6`;
  //сохраняем параметры url в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
        })
      );
    }
  }, []);

  useEffect(() => {
    setIsloading(true);
    axios
      .get(response)
      .then((res) => {
        dispatch(setItems(res.data));
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsError(true);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  //если был первый рендер и менялись параметры , вшиваем параметры в url
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage]);

  const onChangePage = (num) => {
    dispatch(setPageCurrent(num));
  };

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(id) => dispatch(setCategoryId(id))}
          />
          <Sort />
        </div>
        <h2 className="content__title">{categoryies[categoryId]} pizzas</h2>
        {isError ? (
          <ErrorMessage />
        ) : (
          <div>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                : items.map((data, index) => {
                    return (
                      <PizzaBlock
                        id={data.id}
                        title={data.title}
                        price={data.price}
                        pizzaImg={data.imageUrl}
                        size={data.sizes}
                        doughTypes={data.types}
                        key={index + data.title}
                      />
                    );
                  })}
            </div>

            {categoryId === 0 && (
              <Pagination
                onChangePage={(currentPage) => onChangePage(currentPage)}
                pageCount={currentPage}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

