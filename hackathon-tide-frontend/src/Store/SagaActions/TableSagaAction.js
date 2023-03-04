import * as SagaActionTypes from "./SagaActionTypes";


export const tabledatarequest = (payload) => {
  return {
    type: SagaActionTypes.TABLEDATAREQUEST,
    payload: payload,
  };
};



export const GetCustomerTxnDataActionReq = (payload) => {
  return {
    type: SagaActionTypes.CUSTOMERREPORTREQUEST,
    payload: payload,
  };
};


