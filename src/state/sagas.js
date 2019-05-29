import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import types from './types';
import * as actions from './actions';

import DocsService from '../docs.service';
import ReportsList from '../reportsList';

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
}
function* signInWatcher() {
  yield takeLatest(types.SIGN_IN_REQUEST, signIn);
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
  console.log(reports);
  const report = reports.find(r => r.id === reportId);
  console.log(report);
  yield put(actions.selectReportSuccess(report));
}
function* selectReportWatcher() {
  yield takeLatest(types.SELECT_REPORT_REQUEST, selectReport);
}

function* saga() {
  yield all([
    getAuthLinkWatcher(),
    signInWatcher(),
    getReportsWatcher(),
    selectReportWatcher(),
  ]);
}

export default saga;