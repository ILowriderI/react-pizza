import { useState } from "react";

export const categoryies = [
  "All",
  "Meat",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Сheesy",
];

const Categories = ({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoryies.map((item, index) => {
          return (
            <li
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
              key={index + "a"}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
