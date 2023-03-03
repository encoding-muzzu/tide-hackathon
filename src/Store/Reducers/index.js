import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';


const rootReducer = combineReducers({
    HomeReducer: HomeReducer,
})

export default rootReducer;