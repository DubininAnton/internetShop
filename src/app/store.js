import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/underHeaderApp/underHeaderAppSlice';
import cards from '../components/centerRight/centerRightSlice';
import singInForm from '../components/singInForm/singInFormSlice';
import basketSlice from '../components/basket/basketSlice';

export const store = configureStore({
  reducer: {filters, cards, singInForm, basketSlice},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
