import { createSlice } from '@reduxjs/toolkit';

export interface MainState {
  value: string;
  isOpenAccount: boolean;
}

const initialState: MainState = {
  value: 'posts',
  isOpenAccount: false,
};

export const mainSlice = createSlice({
  name: 'mainOld',
  initialState,
  reducers: {
    changeTab(state, action) {
      state.value = action.payload;
    },
    toggleAccount(state) {
      state.isOpenAccount = !state.isOpenAccount;
    },
  },
});

export const { changeTab, toggleAccount } = mainSlice.actions;

export default mainSlice.reducer;
