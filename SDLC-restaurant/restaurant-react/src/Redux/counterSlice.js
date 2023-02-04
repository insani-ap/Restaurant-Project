import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  menu: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1;
      state.menu = [...state.menu, action.payload]
    },
    decrement: (state, action) => {
      state.value -= 1;
      state.menu.splice(action.payload, 1)

    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectMenu = (state) => state.counter.menu;


export default counterSlice.reducer;
