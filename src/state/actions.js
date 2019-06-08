import types from './types';

export const getAuthLinkRequest = () => ({
  type: types.GET_AUTH_LINK_REQUEST,
});
export const getAuthLinkSuccess = (authLink) => ({
  type: types.GET_AUTH_LINK_SUCCESS,
  payload: authLink,
});
export const signInRequest = (authCode) => ({
  type: types.SIGN_IN_REQUEST,
  payload: authCode,
});
export const signInSuccess = () => ({
  type: types.SIGN_IN_SUCCESS,
});
export const autoSignInRequest = () => ({
  type: types.AUTO_SIGN_IN_REQUEST,
});
export const getReportsRequest = () => ({
  type: types.GET_REPORTS_REQUEST,
});
export const getReportsSuccess = (reports) => ({
  type: types.GET_REPORTS_SUCCESS,
  payload: reports,
});
export const selectReportRequest = (reportId) => ({
  type: types.SELECT_REPORT_REQUEST,
  payload: reportId,
});
export const selectReportSuccess = (report) => ({
  type: types.SELECT_REPORT_SUCCESS,
  payload: report,
});