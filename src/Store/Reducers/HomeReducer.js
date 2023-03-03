import * as SagaActionTypes from "../SagaActions/SagaActionTypes";


const initial = {
  isLoading: false,
  apiStatus: 0,
  isPageDataAvailable: "",
  isName:'Syntizen',
};


const HomeReducer = (state = initial, action) => {
//   switch (action.type) {
//     case SagaActionTypes.APISTATUS:
//       if (action.payload) {
//         return { ...state, apiStatus: state.apiStatus + 1 };
//       } else {
//         return { ...state, apiStatus: state.apiStatus - 1 };
//       }

//     // case SagaActionTypes.DYNAMIC_CSS_PROPERTIES:
//     //   return { ...state, cssProperties: action.payload };

//     // case SagaActionTypes.STORE_PAGE_DATA:
//     //   return { ...state, isPageDataAvailable: action.payload };

//     default:
//       return state;
//   }

  // switch (action.type) {
  //   case SagaActionTypes.HEADINGOFNAVBARREQ:
  //     return { ...state, isName: action.payload };

  //   default:
  //     return initial;
  // }
 return initial
};

export default HomeReducer;
