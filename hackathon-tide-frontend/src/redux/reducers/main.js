import { combineReducers } from "redux";
import { cartreducer } from "./reducer";
import loginReducer from './loginReducer';

const rootred = combineReducers({
    cartreducer,
    loginReducer
});


export default rootred