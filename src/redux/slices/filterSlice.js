import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: { name: "popularity", sortProp: "rate" },
  searchValue:'',
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setPageCurrent(state, action) {
    
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSort, setPageCurrent, setFilters,setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
