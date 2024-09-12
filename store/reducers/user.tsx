import {createSlice} from '@reduxjs/toolkit';

export enum EAnimation {
  NONE,
  ROCKET,
  HEARTS,
  FLAMES,
  LIKES,
  HEY,
  UNICORN,
  MONEY,
  KISS,
}

export const Gender = {
  WOMEN: 'Women',
  MEN: 'Men',
  TRANS: 'Trans',
  OTHER: 'Other',
};
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
  myGender: Gender.MEN,
  myOtherGender: Gender.MEN,
  incomingUserGender: Gender.MEN,
  isMyLimitedUserGender: false,
  mySelectedAnimation: EAnimation.NONE,
  isShowMyAnimation: false,
  otherUserSelectedAnimation: EAnimation.NONE,
  isShowOtherUserAnimation: false,
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
    setMyGender(state, action) {
      console.log('setMyGender - ', action.payload);

      state.myGender = action.payload;
    },
    setMyOtherGender(state, action) {
      console.log('setMyOtherGender - ', action.payload);
      state.myOtherGender = action.payload;
    },
    setIsMyLimitedUserGender(state, action) {
      state.isMyLimitedUserGender = action.payload;
    },
    setIncomingUserGender(state, action) {
      state.incomingUserGender = action.payload;
    },
    setMySelectedAnimation(state, action) {
      console.log('setMySelectedAnimation', action.payload);
      state.mySelectedAnimation = action.payload;
    },

    setIsShowMyAnimation(state, action) {
      console.log('setIsShowMyAnimation', action.payload);
      state.isShowMyAnimation = action.payload;
    },
    setOtherUserSelectedAnimation(state, action) {
      console.log('setOtherUserSelectedAnimation', action.payload);
      state.otherUserSelectedAnimation = action.payload;
    },

    setIsShowOtherUserAnimation(state, action) {
      console.log('setIsShowOtherUserAnimation', action.payload);

      state.isShowOtherUserAnimation = action.payload;
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
  setMyGender,
  setMyOtherGender,
  setIsMyLimitedUserGender,
  setIncomingUserGender,
  setIsShowMyAnimation,
  setMySelectedAnimation,
  setIsShowOtherUserAnimation,
  setOtherUserSelectedAnimation,
} = userSlice.actions;
export default userSlice.reducer;
