//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SupplierActionTypes } from './constants';

import { createSupplierApi, deleteSupplierApi, getSupplierListApi, listingSupplierApi, updateSupplierApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';




function* getsupplierListFunction(data) {
    try {
        yield put({
            type: SupplierActionTypes.SUPPLIER_LIST_LOADING,
            payload: {},
        });
        const response = yield call(getSupplierListApi, data);
        if (response?.status === 200) {
            yield put({
                type: SupplierActionTypes.SUPPLIER_LIST_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: SupplierActionTypes.SUPPLIER_LIST_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: SupplierActionTypes.SUPPLIER_LIST_ERROR,
            payload: error,
        });
    }
}

function* createSupplierFunction(data) {
    try {
        yield put({
            type: SupplierActionTypes.CREATE_SUPPLIER_LOADING,
            payload: {},
        });
        const response = yield call(createSupplierApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: SupplierActionTypes.CREATE_SUPPLIER_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: SupplierActionTypes.CREATE_SUPPLIER_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: SupplierActionTypes.CREATE_SUPPLIER_ERROR,
            payload: error,
        });
    }
}

function* updateSupplierFunction(data) {
    try {
        yield put({
            type: SupplierActionTypes.UPDATE_SUPPLIER_LOADING,
            payload: {},
        });
        const response = yield call(updateSupplierApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: SupplierActionTypes.UPDATE_SUPPLIER_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: SupplierActionTypes.UPDATE_SUPPLIER_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: SupplierActionTypes.UPDATE_SUPPLIER_ERROR,
            payload: error,
        });
    }
}

function* deleteSupplierFunction(data) {
    try {
        yield put({
            type: SupplierActionTypes.DELETE_SUPPLIER_LOADING,
            payload: {},
        });
        const response = yield call(deleteSupplierApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: SupplierActionTypes.DELETE_SUPPLIER_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: SupplierActionTypes.DELETE_SUPPLIER_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: SupplierActionTypes.DELETE_SUPPLIER_ERROR,
            payload: error,
        });
    }
}

function* listingSupplierFunction(data) {
    try {
        yield put({
            type: SupplierActionTypes.LISTING_SUPPLIER_LOADING,
            payload: {},
        });
        const response = yield call(listingSupplierApi, data);
        if (response?.status === 200) {
            yield put({
                type: SupplierActionTypes.LISTING_SUPPLIER_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: SupplierActionTypes.LISTING_SUPPLIER_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: SupplierActionTypes.LISTING_SUPPLIER_ERROR,
            payload: error,
        });
    }
}

export function* watchSupplierListData() {
    yield takeEvery(SupplierActionTypes.SUPPLIER_LIST_FIRST, getsupplierListFunction);
}

export function* watchCreateSupplierData() {
    yield takeEvery(SupplierActionTypes.CREATE_SUPPLIER_FIRST, createSupplierFunction);
}

export function* watchUpdateSupplierData() {
    yield takeEvery(SupplierActionTypes.UPDATE_SUPPLIER_FIRST, updateSupplierFunction);
}

export function* watchDeleteSupplierData() {
    yield takeEvery(SupplierActionTypes.DELETE_SUPPLIER_FIRST, deleteSupplierFunction);
}

export function* watchListingSupplierData() {
    yield takeEvery(SupplierActionTypes.LISTING_SUPPLIER_FIRST, listingSupplierFunction);
}

function* supplierSaga() {
    yield all([
        fork(watchSupplierListData),
        fork(watchCreateSupplierData),
        fork(watchUpdateSupplierData),
        fork(watchDeleteSupplierData),
        fork(watchListingSupplierData),

    ]);
}

export default supplierSaga;


