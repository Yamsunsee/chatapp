import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import enterSlice from "./slices/enterSlice";
import lobbySlice from "./slices/lobbySlice";
import chatroomSlice from "./slices/chatroomSlice";
import socketSlice from "./slices/socketSlice";

const rootReducer = combineReducers({
  enter: enterSlice,
  lobby: lobbySlice,
  chatroom: chatroomSlice,
  socket: socketSlice,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    blacklist: ["socket"],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
