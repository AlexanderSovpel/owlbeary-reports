import types from './types';

const initialState = {
  reports: [],
  current: null,
  signedIn: false,
  // authCode: '',
  authLink: '',
};

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_AUTH_LINK_SUCCESS: {
      return {
        ...state,
        authLink: payload,
      };
    }
    case types.SIGN_IN_SUCCESS: {
      return {
        ...state,
        signedIn: true,
        // authCode: payload,
      };
    }
    case types.GET_REPORTS_SUCCESS: {
      return {
        ...state,
        reports: payload,
      };
    }
    case types.SELECT_REPORT_SUCCESS: {
      return {
        ...state,
        current: payload,
      };
    }
    default:
      return state;
  }
}

export default reducer;