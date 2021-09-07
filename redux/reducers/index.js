import { combineReducers } from "redux";
import { selectedImageReducer } from "./imageReducer";
import { imagesReducer  } from "./imagesReducer";
import { RESET_STORE } from "../types/actionTypes";
const reducers = combineReducers({
  allImages: imagesReducer,
  image: selectedImageReducer,
  
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return reducers(state, action)
}

export default rootReducer;