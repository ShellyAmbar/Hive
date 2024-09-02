const initialState = {
  name: '',
  incomingUserName: '',
  image: '',
  incomingUserImage: '',
  myAge: 0,
  incomingUserAge: 0,
  myCountry: '',
  incomingUserCountry: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_MY_AGE':
      console.log('action.payload', action.payload);

      return {
        ...state,
        myAge: action.payload,
      };
    case 'SET_INCOMING_USER_AGE':
      return {
        ...state,
        incomingUserAge: action.payload,
      };
    case 'SET_INCOMING_USER_NAME':
      return {
        ...state,
        incomingUserName: action.payload,
      };
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.payload,
      };
    case 'SET_INCOMING_USER_IMAGE':
      return {
        ...state,
        incomingUserImage: action.payload,
      };
    case 'SET_MY_COUNTRY':
      return {
        ...state,
        myCountry: action.payload,
      };
    case 'SET_INCOMING_USER_COUNTRY':
      return {
        ...state,
        incomingUserCountry: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
