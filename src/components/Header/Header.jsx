import logo from "../../img/pizza-header.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Search from "../Search/Search";
import cartIco from "../../img/smallCart.svg";
import { useEffect, useRef } from "react";

const Header = () => {
  const { items, totalPrice } = useSelector((state) => state.cartReducer);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const categoryId = useSelector((state) => state.filterReducer.categoryId);
  const location = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const itemsStorage = JSON.stringify(items);
      const totalPriceStorage = JSON.stringify(totalPrice);
      localStorage.setItem("cartItem", itemsStorage);
      localStorage.setItem("cartTotalPrice", totalPriceStorage);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="Pizza logo" />
          </Link>

          <div>
            <h1>React Pizza</h1>
            <p>the most delicious pizza in the universe</p>
          </div>
        </div>

        {location.pathname !== "/cart" && (
          <>
            {categoryId < 1 && <Search />}

            <div className="header__cart">
              <Link to="/cart" className="button button--cart">
                <span>{totalPrice}$</span>
                <div className="button__delimiter"></div>

                <span>{totalCount}</span>
                <img src={cartIco} alt="cart" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
