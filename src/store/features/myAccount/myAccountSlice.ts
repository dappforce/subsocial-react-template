import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountId } from '@subsocial/api/types/dto';
import { Account } from 'src/models/account';
import store from 'store';
import { ACCOUNT_STATUS } from 'src/models/auth';

type MyAddressState = {
  address?: string;
  accounts?: Account[];
  status: ACCOUNT_STATUS;
  signer?: any;
};

type MyAccountState = MyAddressState;

const initialState: MyAccountState = { status: ACCOUNT_STATUS.INIT };

export const MY_ADDRESS = 'myAddress';

const myAccountSlice = createSlice({
  name: 'myAccount',
  initialState,
  reducers: {
    setMyAddress(state, action: PayloadAction<AccountId>) {
      const address = action.payload;

      if (address) {
        store.set(MY_ADDRESS, address);
        state.address = address;
      }
    },
    setAccounts(state, action: PayloadAction<Account[]>) {
      const accounts = action.payload;

      if (accounts) {
        state.accounts = accounts;
      }
    },
    signOut(state) {
      store.remove(MY_ADDRESS);
      delete state.address;
    },
    setSigner(state, action: PayloadAction<any>) {
      state.signer = action.payload;
    },
  },
});

export const { setMyAddress, setAccounts, signOut, setSigner } =
  myAccountSlice.actions;

export default myAccountSlice.reducer;
