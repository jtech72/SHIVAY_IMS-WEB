//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { DashboardActionTypes } from './constants';

import { getDashboardApi, getDispatchApi, getLowStockApi, getRecentTransactionApi, getStockinApi, getStockReportApi } from './api';
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

function* getStockReportFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.GET_STOCK_REPORT_LOADING,
            payload: {},
        });
        const response = yield call(getStockReportApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.GET_STOCK_REPORT_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.GET_STOCK_REPORT_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.GET_STOCK_REPORT_ERROR,
            payload: error,
        });
    }
}

function* getRecentTransactionFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.GET_RECENT_TRANS_LOADING,
            payload: {},
        });
        const response = yield call(getRecentTransactionApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.GET_RECENT_TRANS_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.GET_RECENT_TRANS_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.GET_RECENT_TRANS_ERROR,
            payload: error,
        });
    }
}

function* getLowStockFunction(data) {
    try {
        yield put({
            type: DashboardActionTypes.GET_LOW_STOCK_LOADING,
            payload: {},
        });
        const response = yield call(getLowStockApi, data);
        if (response?.status === 200) {
            yield put({
                type: DashboardActionTypes.GET_LOW_STOCK_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: DashboardActionTypes.GET_LOW_STOCK_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: DashboardActionTypes.GET_LOW_STOCK_ERROR,
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

export function* watchStockReportList() {
    yield takeEvery(DashboardActionTypes.GET_STOCK_REPORT_FIRST, getStockReportFunction);
}

export function* watchRecentTransactionList() {
    yield takeEvery(DashboardActionTypes.GET_RECENT_TRANS_FIRST, getRecentTransactionFunction);
}

export function* watchLowStockList() {
    yield takeEvery(DashboardActionTypes.GET_LOW_STOCK_FIRST, getLowStockFunction);
}

function* dashboardSaga() {
    yield all([
        fork(watchDashboardData),
        fork(watchStockinList),
        fork(watchLowStockList),
        fork(watchDispatchList),
        fork(watchStockReportList),
        fork(watchRecentTransactionList),

    ]);
}

export default dashboardSaga;


