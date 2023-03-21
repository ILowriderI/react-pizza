import emptyImg from "../../img/empty-cart.png";
import styles from "./CartEmpty.module.scss";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className={styles.cont}>
      <h2>Your cart is empty 😕 </h2>
      <img src={emptyImg} alt="empty cart" />

      <Link to="/" className="button button--black">
        <span>Back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
