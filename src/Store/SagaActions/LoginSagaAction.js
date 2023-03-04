import * as SagaActionTypes from "./SagaActionTypes";


export const loginrequest = (payload) => {
  return {
    type: SagaActionTypes.LOGINREQUEST,
    payload: payload,
  };
};
export const saveLoginResp = (payload) => {
  return {
    type: SagaActionTypes.SAVELOGINRESP,
    payload: payload,
  };
};

export const UserProfilereq = (payload) => {
  return {
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

export const transactionsAction = (payload) => {
  return {
    type: SagaActionTypes.TRANSACTIONS,
    payload,
  };
};
export const getUserProfileAction = (payload) => {
  return {
    type: SagaActionTypes.GET_USER_PROFILE,
    payload
  }
}

export const getUserProfile = (payload) => {
  return {
    type: SagaActionTypes.GET_USER_PROFILE_DATA,
    payload
  }
}
export const transferAction = (payload) => {
  return {
    type: SagaActionTypes.POST_TRANSFER,
    payload
  }
}
export const kycAction = (payload) => {
  return {
    type: SagaActionTypes.KYCREQUEST,
    payload
  }
}
