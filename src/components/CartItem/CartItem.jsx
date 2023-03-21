import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../../redux/slices/cartSlice";
import minIco from "../../img/minus.png";
import addIco from "../../img/add.png";
import removeIco from "../../img/remove.png";

import styles from "./CartItem.module.scss";

const CartItem = ({ id, price, pizzaImg, count, title, type, size }) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };
  const onClickRemove = () => {
    dispatch(removeItem(id));
  };
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  return (
    <>
      <div className="cart__item">
        <div className="cart__item-img">
          <img className="pizza-block__image" src={pizzaImg} alt="Pizza" />
        </div>
        <div className="cart__item-info">
          <h3>{title}</h3>
          <p>
            {type}, {size}cm.
          </p>
        </div>
        <div className="cart__item-count">
          <img
            className={styles.correct_btns}
            onClick={onClickMinus}
            src={minIco}
            alt="minus"
          />
          <b>{count}</b>
          <img
            className={styles.correct_btns}
            onClick={onClickPlus}
            src={addIco}
            alt="add"
          />
        </div>
        <div className="cart__item-price">
          <b>{price * count}$</b>
        </div>
        <div className="cart__item-remove">
          <img
            className={styles.correct_btns}
            onClick={onClickRemove}
            src={removeIco}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default CartItem;
