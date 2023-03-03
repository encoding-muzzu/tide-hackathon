import * as SagaActionTypes from "../SagaActions/SagaActionTypes";


const initial = {
  userData:{}
};


const HomeReducer = (state = initial, action) => {
  switch (action.type) {
    case SagaActionTypes.GET_USER_PROFILE_DATA:
      // if (action.payload) {
      //   return { ...state, apiStatus: state.apiStatus + 1 };
      // } else {
      //   return { ...state, apiStatus: state.apiStatus - 1 };
      // }
      console.log("redd",{...state, userData: action.payload});
      return {...state, userData: action.payload}

    // case SagaActionTypes.DYNAMIC_CSS_PROPERTIES:
    //   return { ...state, cssProperties: action.payload };

    // case SagaActionTypes.STORE_PAGE_DATA:
    //   return { ...state, isPageDataAvailable: action.payload };

    default:
      return state;
  }

  // switch (action.type) {
  //   case SagaActionTypes.HEADINGOFNAVBARREQ:
  //     return { ...state, isName: action.payload };

  //   default:
  //     return initial;
  // }
 return initial
};

export default HomeReducer;
