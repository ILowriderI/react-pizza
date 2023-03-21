import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const PizzaBlock = ({ id, title, price, pizzaImg, size, doughTypes }) => {
  const dough = ["thin", "traditional"];

  const [activeDough, setActiveDough] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cartReducer.items.find((obj) => obj.id === id)
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      pizzaImg,
      type: dough[activeDough],
      size: size[activeSize],
      // count:0,
    };
    dispatch(addItem(item));
  };
 
const link =  `/pizza/${id}`
  return (
    <div className="pizza-block">
      <Link to={link}>
      <img className="pizza-block__image" src={pizzaImg} alt="Pizza" />
      </Link>
      
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {doughTypes.map((value) => {
            return (
              <li
                className={activeDough === value ? "active" : ""}
                onClick={() => setActiveDough(value)}
                key={value + "c"}
              >
                {dough[value]}{" "}
              </li>
            );
          })}
        </ul>
        <ul>
          {size.map((value, index) => {
            return (
              <li
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
                key={index + "c"}
              >
                {value} cm{" "}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{`from ${price} $`}</div>
        <button
          onClick={() => onClickAdd()}
          className="button button--outline button--add"
        >
         <span>+</span>
          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
export default PizzaBlock;
