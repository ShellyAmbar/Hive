import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  myName: '',
  incomingUserName: '',
  myImage: '',
  incomingUserImage: '',
  myAge: 0,
  incomingUserAge: 0,
  myCountry: '',
  incomingUserCountry: '',
  myUserId: null,
  isMyLimitedCountry: false,
  myLimitedCountry: '',
  isMyLimitedAges: false,
  myLimitedAges: [0, 100],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMyLimitedAges(state, action) {
      state.myLimitedAges = action.payload;
    },
    setIsMyLimitedAges(state, action) {
      state.isMyLimitedAges = action.payload;
    },
    setMyLimitedCountry(state, action) {
      state.myLimitedCountry = action.payload;
    },
    setIsMyLimitedCountry(state, action) {
      state.isMyLimitedCountry = action.payload;
    },

    setMyName(state, action) {
      state.myName = action.payload;
    },
    setMyAge(state, action) {
      state.myAge = action.payload;
    },
    setIncomingUserAge(state, action) {
      state.incomingUserAge = action.payload;
    },
    setIncomingUserName(state, action) {
      state.incomingUserName = action.payload;
    },
    setMyImage(state, action) {
      state.myImage = action.payload;
    },
    setIncomingUserImage(state, action) {
      state.incomingUserImage = action.payload;
    },
    setMyCountry(state, action) {
      state.myCountry = action.payload;
    },
    setIncomingUserCountry(state, action) {
      state.incomingUserCountry = action.payload;
    },

    setMyUserId(state, action) {
      state.myUserId = action.payload;
    },
  },
});

export const {
  setMyUserId,
  setIncomingUserCountry,
  setMyAge,
  setMyCountry,
  setIncomingUserAge,
  setIncomingUserImage,
  setIncomingUserName,
  setIsMyLimitedCountry,
  setIsMyLimitedAges,
  setMyLimitedAges,
  setMyImage,
  setMyLimitedCountry,
  setMyName,
} = userSlice.actions;
export default userSlice.reducer;
