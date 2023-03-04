import * as SagaActionTypes from "../SagaActions/SagaActionTypes";


const initial = {
  userData: {},
  getLoginResp: {}
};


const HomeReducer = (state = initial, action) => {
  switch (action.type) {
    case SagaActionTypes.GET_USER_PROFILE_DATA:
      console.log("redd", { ...state, userData: action.payload });
      return { ...state, userData: action.payload }

    case SagaActionTypes.SAVELOGINRESP:
      console.log('action.payload ===>', action.payload)
      return { ...state, getLoginResp: action.payload };

    default:
      return state;
  }

};

export default HomeReducer;
