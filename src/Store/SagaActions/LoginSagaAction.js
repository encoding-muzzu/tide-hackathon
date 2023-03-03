import * as SagaActionTypes from "./SagaActionTypes";


export const loginrequest = (payload) => {
  return {
    type: SagaActionTypes.LOGINREQUEST,
    payload: payload,
  };
};

export const UserProfilereq = (payload)=>{
  return{
    type: SagaActionTypes.USERPROFILEREQ,
    payload: payload,

  }
}

export const registerUserAction = (payload) => {
  return {
    type: SagaActionTypes.REGISTER_USER,
    payload,
  };
};

export const getUserProfileAction = (payload) =>{
  return {
    type: SagaActionTypes.GET_USER_PROFILE,
    payload
  }
}

export const getUserProfile = (payload) =>{
  return {
    type: SagaActionTypes.GET_USER_PROFILE_DATA,
    payload
  }
}
