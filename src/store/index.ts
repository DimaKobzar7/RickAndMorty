import { configureStore } from '@reduxjs/toolkit'

import secondStoreSlice from "./secondStore";
import formStoreSlice from "./formStore";

export const store = configureStore({
  reducer: {
    // работате и без комбайн редюсера то есть можно ставить сколько угодно редюсеров
    secondTest: secondStoreSlice,
    formStore: formStoreSlice,
  },
  // во время создания стора можно закинуть сюда мидл вары
  // middleware
});

// export const store = configureStore({
//   reducer: {
//     posts: postsReducer,
//     comments: commentsReducer,
//     users: usersReducer,
//   },
// })

// export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
//RootState позволяет редакусу видить типы стейтов что лежат в редюсере
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch