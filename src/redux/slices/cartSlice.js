import { createSlice } from "@reduxjs/toolkit";

const calcTotalPrice = (items) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const initialState = {
  totalPrice: JSON.parse(localStorage.getItem('cartTotalPrice')) ,//or// calcTotalPrice(JSON.parse(localStorage.getItem('cartItem'))) 
  items: JSON.parse(localStorage.getItem('cartItem')) ||[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* addItem(state, action) {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum,obj)=>{
        return obj.price+sum
      },0)
    },*/
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      // state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++;
        state.totalPrice = calcTotalPrice(state.items);
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
        state.totalPrice = calcTotalPrice(state.items);
      }
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
/*
state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);


      state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;

*/
