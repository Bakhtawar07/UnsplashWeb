import { ActionTypes } from "../types/actionTypes";

const intialState = {
  data: {},
  loading: false,
  error: "",
};

export const selectedImageReducer = (
  state =  intialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.SELECTED_IMAGE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
