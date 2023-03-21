import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import CartEmpty from "../components/CartEmpty/CartEmpty";
import CartItem from "../components/CartItem/CartItem";
import clearIco from './../img/clear.png';
import cartIco from './../img/cart60.png';
import arrowIco from './../img/arrow-left.png';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cartReducer);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <>
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
          
            <h2 className="content__title">
            <img src={cartIco} alt="cart" />
              Cart
            </h2>
            <div onClick={() => dispatch(clearItems())} className="cart__clear">
              
               <img src={clearIco} alt="clear" />

              <span>Clear cart</span>
            </div>
          </div>
          <div className="content__items">
            {items.map((item) => (
              <CartItem key={item.id + item.title} {...item} />
            ))}
          </div>
          <div className="cart__bottom">
            <div className="cart__bottom-details">
              <span>
                {" "}
                Total pizzas: <b>{totalCount} piece</b>{" "}
              </span>
              <span>
                {" "}
                Sum of order: <b>{totalPrice} $</b>{" "}
              </span>
            </div>
            <div className="cart__bottom-buttons">
            <Link
                to="/"
                className="button button--outline button--add go-back-btn"
              >
               <img src={arrowIco} />
                <span>Back</span>
              </Link>
              <div 
               onClick={()=>alert("Your order has been sent for processing !")}
               className="button pay-btn">
                <span>Confirm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

