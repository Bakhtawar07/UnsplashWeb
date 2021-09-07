import { ActionTypes } from "../types/actionTypes";

const intialState = {
  data: [],
  page:1,
  loading: false,
  error: "",
  name:"",

};

export const imagesReducer = (state = intialState, { type, payload = {} }) => {
  switch (type) {
    case ActionTypes.SET_IMAGES:
      return { ...state, ...payload };
    case ActionTypes.APPEND_IMAGES:
      return { ...state, ...payload, data: [...state.data, ...payload.data] };
      case ActionTypes.SET_ALL_IMAGES_PAYLOAD:
        return {...state, ...payload};
    default:
      return state;
      
  }
};
