import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../../redux/slices/filterSlice";

const selectedList = [
  { name: "popularity", sortProp: "rate" },
  { name: "price", sortProp: "price" },
  { name: "alphabet", sortProp: "title" },
];

const Sort = () => {
  const [open, setOpen] = useState(false);
  const sortRef = useRef();
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filterReducer.sort);

  const onClickSelected = (obg) => {
    setOpen(false);
    dispatch(setSort(obg));
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", onClickOutside);

    return () => {
      document.body.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by : </b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {selectedList.map((obj, index) => {
              return (
                <li
                  onClick={() => onClickSelected(obj)}
                  className={sort.sortProp === obj.sortProp ? "active" : ""}
                  key={index + "c"}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sort;
