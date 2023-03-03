import * as SagaActionTypes from "./SagaActionTypes";


export const tabledatarequest = (payload) => {
  return {
    type: SagaActionTypes.TABLEDATAREQUEST,
    payload: payload,
  };
};
export const GetTodayVcipDashboardCountActionReq = (payload) => {
  return {
    type: SagaActionTypes.DASHBOARDCOUNTREQUEST,
    payload: payload,
  };
};


export const GetCustomerTxnDataActionReq = (payload) => {
  return {
    type: SagaActionTypes.CUSTOMERREPORTREQUEST,
    payload: payload,
  };
};


export const GetVcipWebhookDetailsActionreqpayload = (payload) => {
  // console.log("dispatc action")
  return {
    type: SagaActionTypes.WEBHOOKDETAILSREQUEST,
    payload: payload,
  };
};

// export const GetHeaderNameAction = (payload) =>{
//   console.log(payload,"headerName");
//   return{
//     type: SagaActionTypes.HEADINGOFNAVBARREQ,
//     payload:payload,
//   }
// }

