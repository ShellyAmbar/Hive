import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers'; // Import your root reducer

// Configure persist reducer
const persistConfig = {
  key: 'root', // Key to save the persisted data under
  storage: AsyncStorage, // Storage engine
  //   whitelist: ['someReducer'], // Optionally, specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with the persisted reducer
const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor};
