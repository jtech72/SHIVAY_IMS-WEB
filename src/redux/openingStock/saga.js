//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { StockActionTypes } from './constants';

import { createStockApi, getStockListApi, updateStockApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';




function* getStockListFunction(data) {
    try {
        yield put({
            type: StockActionTypes.STOCK_LIST_LOADING,
            payload: {},
        });
        const response = yield call(getStockListApi, data);
        if (response?.status === 200) {
            yield put({
                type: StockActionTypes.STOCK_LIST_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: StockActionTypes.STOCK_LIST_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: StockActionTypes.STOCK_LIST_ERROR,
            payload: error,
        });
    }
}

function* createStockFunction(data) {
    try {
        yield put({
            type: StockActionTypes.CREATE_STOCK_LOADING,
            payload: {},
        });
        const response = yield call(createStockApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: StockActionTypes.CREATE_STOCK_SUCCESS,
                payload: response.data,
            });
            yield put({
                type: StockActionTypes.CREATE_STOCK_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: StockActionTypes.CREATE_STOCK_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: StockActionTypes.CREATE_STOCK_ERROR,
            payload: error,
        });
    }
}

function* updateStockFunction(data) {
    try {
        yield put({
            type: StockActionTypes.UPDATE_STOCK_LOADING,
            payload: {},
        });
        const response = yield call(updateStockApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: StockActionTypes.UPDATE_STOCK_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: StockActionTypes.UPDATE_STOCK_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: StockActionTypes.UPDATE_STOCK_ERROR,
            payload: error,
        });
    }
}


export function* watchUserListData() {
    yield takeEvery(StockActionTypes.STOCK_LIST_FIRST, getStockListFunction);
}

export function* watchCreateStockData() {
    yield takeEvery(StockActionTypes.CREATE_STOCK_FIRST, createStockFunction);
}

export function* watchUpdateStockData() {
    yield takeEvery(StockActionTypes.UPDATE_STOCK_FIRST, updateStockFunction);
}



function* stockSaga() {
    yield all([
        fork(watchUserListData),
        fork(watchCreateStockData),
        fork(watchUpdateStockData),

    ]);
}

export default stockSaga;


