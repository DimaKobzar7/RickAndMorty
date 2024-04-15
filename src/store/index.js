import { configureStore } from "@reduxjs/toolkit";

import secondStoreSlice from "./secondStore";
import formStoreSlice from "./formStore";

const store = configureStore({
  reducer: {
    // работате и без комбайн редюсера то есть можно ставить сколько угодно редюсеров
    secondTest: secondStoreSlice,
    formStore: formStoreSlice,
  },
  // во время создания стора можно закинуть сюда мидл вары
  // middleware
});

export default store;
