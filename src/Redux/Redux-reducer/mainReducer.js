import {
  SET_ISLOGIN,
  ADD_TO_TABLE,
  SEND_DATA_TO_SERVER,
  UPDATE_DATA_TO_SERVER,
  FETCH_DATA_FROM_SERVER,
  SET_POSITION,
  FETCH_CUSTOM_USER_DATA
} from "../Redux-constants/constants.js";

const initialState = {
  isLogin: false,
  rowsData: [],
  customUserData: {},
  position: ""
};


const mainReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case SET_ISLOGIN:
      return { ...state, isLogin: payload };

    case ADD_TO_TABLE:
      return { ...state, rowsData: payload };

    case SEND_DATA_TO_SERVER:
      return { ...state, rowsData: payload };

    case UPDATE_DATA_TO_SERVER:
      return { ...state, rowsData: payload };

    case FETCH_DATA_FROM_SERVER:
      return { ...state, rowsData: payload };

    case SET_POSITION:
      return { ...state, position: payload };

    case FETCH_CUSTOM_USER_DATA:
      return { ...state, customUserData: payload };

    default:
      return state;
  }
};
export default mainReducer;