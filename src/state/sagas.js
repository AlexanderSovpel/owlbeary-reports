import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import types from './types';
import * as actions from './actions';

import DocsService from '../services/docs.service';
import ReportsList from '../helpers/reportsList';

import { OWLBEARY_AUTH_CODE } from '../constants';

const docsService = new DocsService();

function* getAuthLink() {
  const authLink = yield call(docsService.getAuthLink);
  yield put(actions.getAuthLinkSuccess(authLink));
}
function* getAuthLinkWatcher() {
  yield takeLatest(types.GET_AUTH_LINK_REQUEST, getAuthLink);
}

function* signIn(action) {
  const code = action.payload;

  yield call(docsService.authByCode, code);
  yield put(actions.signInSuccess());

  localStorage.setItem(OWLBEARY_AUTH_CODE, code);
}
function* signInWatcher() {
  yield takeLatest(types.SIGN_IN_REQUEST, signIn);
}

function* autoSignIn() {
  const code = localStorage.getItem(OWLBEARY_AUTH_CODE);

  if (code) {
    yield call(signIn, { payload: code });
  }
}
function* autoSignInWatcher() {
  yield takeLatest(types.AUTO_SIGN_IN_REQUEST, autoSignIn);
}

function* getReports() {
  const doc = yield call(docsService.getDocument);
  const reportsList = new ReportsList(doc);
  yield put(actions.getReportsSuccess(reportsList));
}
function* getReportsWatcher() {
  yield takeLatest(types.GET_REPORTS_REQUEST, getReports);
}

function* selectReport(action) {
  const reportId = parseInt(action.payload);

  const reports = yield select(state => state.reports);
  const report = reports.find(r => r.id === reportId);
  yield put(actions.selectReportSuccess(report));
}
function* selectReportWatcher() {
  yield takeLatest(types.SELECT_REPORT_REQUEST, selectReport);
}

function* saga() {
  yield all([
    getAuthLinkWatcher(),
    signInWatcher(),
    autoSignInWatcher(),
    getReportsWatcher(),
    selectReportWatcher(),
  ]);
}

export default saga;