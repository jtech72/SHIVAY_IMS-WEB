//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { DispatchActionTypes } from './constants';

import { createDispatchApi, createStockCheckApi, deleteDispatchApi, getDispatchListApi, updateDispatchApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';




function* getDispatchDataFunction(data) {
    try {
        yield put({
            type: DispatchActionTypes.GET_DISPATCH_LIST_LOADING,
            payload: {},
        });
        const response = yield call(getDispatchListApi, data);
        if (response?.status === 200) {
            yield put({
                type: DispatchActionTypes.GET_DISPATCH_LIST_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: DispatchActionTypes.GET_DISPATCH_LIST_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: DispatchActionTypes.GET_DISPATCH_LIST_ERROR,
            payload: error,
        });
    }
}

function* createDispatchFunction(data) {
    try {
        yield put({
            type: DispatchActionTypes.CREATE_DISPATCH_LOADING,
            payload: {},
        });
        const response = yield call(createDispatchApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: DispatchActionTypes.CREATE_DISPATCH_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: DispatchActionTypes.CREATE_DISPATCH_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: DispatchActionTypes.CREATE_DISPATCH_ERROR,
            payload: error,
        });
    }
}

function* updateDispatchFunction(data) {
    try {
        yield put({
            type: DispatchActionTypes.UPDATE_DISPATCH_LOADING,
            payload: {},
        });
        const response = yield call(updateDispatchApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: DispatchActionTypes.UPDATE_DISPATCH_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: DispatchActionTypes.UPDATE_DISPATCH_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: DispatchActionTypes.UPDATE_DISPATCH_ERROR,
            payload: error,
        });
    }
}

function* deleteDispatchFunction(data) {
    try {
        yield put({
            type: DispatchActionTypes.DELETE_DISPATCH_LOADING,
            payload: {},
        });
        const response = yield call(deleteDispatchApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: DispatchActionTypes.DELETE_DISPATCH_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: DispatchActionTypes.DELETE_DISPATCH_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: DispatchActionTypes.DELETE_DISPATCH_ERROR,
            payload: error,
        });
    }
}

function* createStockCheckFunction(data) {
    try {
        yield put({
            type: DispatchActionTypes.CREATE_STOCK_CHECK_LOADING,
            payload: {},
        });
        const response = yield call(createStockCheckApi, data);
        if (response?.status === 200) {
            yield put({
                type: DispatchActionTypes.CREATE_STOCK_CHECK_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: DispatchActionTypes.CREATE_STOCK_CHECK_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: DispatchActionTypes.CREATE_STOCK_CHECK_ERROR,
            payload: error,
        });
    }
}

export function* watchDispatchListData() {
    yield takeEvery(DispatchActionTypes.GET_DISPATCH_LIST, getDispatchDataFunction);
}

export function* watchCreateDispatchData() {
    yield takeEvery(DispatchActionTypes.CREATE_DISPATCH_FIRST, createDispatchFunction);
}

export function* watchUpdateDispatchData() {
    yield takeEvery(DispatchActionTypes.UPDATE_DISPATCH_FIRST, updateDispatchFunction);
}

export function* watchDeleteDispatchData() {
    yield takeEvery(DispatchActionTypes.DELETE_DISPATCH_FIRST, deleteDispatchFunction);
}

export function* watchCreateStockCheckData() {
    yield takeEvery(DispatchActionTypes.CREATE_STOCK_CHECK_FIRST, createStockCheckFunction);
}

function* dispatchSaga() {
    yield all([
        fork(watchDispatchListData),
        fork(watchCreateDispatchData),
        fork(watchUpdateDispatchData),
        fork(watchDeleteDispatchData),
        fork(watchCreateStockCheckData),

    ]);
}

export default dispatchSaga;


