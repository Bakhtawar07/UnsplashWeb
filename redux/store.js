import {createStore} from "redux";
import index from "./reducers/index";


const store = createStore(index, typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
 export default store;