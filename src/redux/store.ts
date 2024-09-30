import { configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import userReducer from './user/userSlice'
import leadReducer from './lead/leadSlice'
import clientReducer from './client/clientSlice';
import myListingReducer from './myListings/myListingSlice';
import offerReducer from './offer/offerSlice';
import showingReducer from './showing/showingSlice'
import agentReducer from './agent/agentSlice'
import advertisementReducer from './advertisement/advertisementSlice'
import postReducer from './post/postSlice'
const reducers = combineReducers({
  user: userReducer,
  lead: leadReducer,
  client: clientReducer,
  myListing: myListingReducer,
  showing: showingReducer,
  offer: offerReducer,
  agent: agentReducer,
  advertisement: advertisementReducer,
  post: postReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch