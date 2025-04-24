//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { DashboardActionTypes } from './constants';

import { getDashboardApi, getDispatchApi, getStockinApi } from './api';
/**
 * Login the user
 * @param {*} payload - username and password
 */

// products
function* getDashboardFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.DASHBOARD_DATA_LOADING,
            payload: {},
        });
        const response = yield call(getDashboardApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.DASHBOARD_DATA_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.DASHBOARD_DATA_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.DASHBOARD_DATA_ERROR,
            payload: error,
        });
    }
}

function* getStockinFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.STOCKIN_TRANS_LIST_LOADING,
            payload: {},
        });
        const response = yield call(getStockinApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.STOCKIN_TRANS_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.STOCKIN_TRANS_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.STOCKIN_TRANS_LIST_ERROR,
            payload: error,
        });
    }
}

function* getDispatchFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.DISPATCH_LIST_LOADING,
            payload: {},
        });
        const response = yield call(getDispatchApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.DISPATCH_LIST_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.DISPATCH_LIST_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.DISPATCH_LIST_ERROR,
            payload: error,
        });
    }
}

export function* watchDashboardData() {
    yield takeEvery(DashboardActionTypes.DASHBOARD_DATA_FIRST, getDashboardFunction);
}

export function* watchStockinList() {
    yield takeEvery(DashboardActionTypes.STOCKIN_TRANS_LIST_FIRST, getStockinFunction);
}

export function* watchDispatchList() {
    yield takeEvery(DashboardActionTypes.DISPATCH_LIST_FIRST, getDispatchFunction);
}

function* dashboardSaga() {
    yield all([
        fork(watchDashboardData),
        fork(watchStockinList),
        fork(watchDispatchList),

    ]);
}

export default dashboardSaga;


