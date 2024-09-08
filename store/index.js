import rootReducer from './reducers'; // Import your root reducer
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Use AsyncStorage for React Native
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for persistence
  timeout: null, // Increase this timeout if necessary
  debug: true, // Enable debug mode for redux-persist
  whitelist: ['user'],
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a Redux store with Redux Toolkit, and apply thunk middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true, // Enable thunk middleware
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor instance
const persistor = persistStore(store);

export {store, persistor};
