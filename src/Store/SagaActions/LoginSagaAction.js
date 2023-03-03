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
