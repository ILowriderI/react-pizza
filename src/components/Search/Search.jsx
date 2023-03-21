import { useRef, useCallback, useState } from "react";

import closeIco from "../../img/close.svg";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((value) => dispatch(setSearchValue(value)), 350),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };
  return (
    <div className={styles.cont}>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
        className={styles.inp}
        placeholder="Search"
      />
      {value && (
        <img onClick={() => onClickClear()} src={closeIco} alt="close" />
      )}
    </div>
  );
};

export default Search;
