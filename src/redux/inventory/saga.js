//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { InventoryActionTypes } from './constants';

import { createProductApi, deleteProductApi, getProductListApi, searchProductApi, updateProductApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';




function* getProductListFunction(data) {
    try {
        yield put({
            type: InventoryActionTypes.PRODUCT_LIST_LOADING,
            payload: {},
        });
        const response = yield call(getProductListApi, data);
        if (response?.status === 200) {
            yield put({
                type: InventoryActionTypes.PRODUCT_LIST_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: InventoryActionTypes.PRODUCT_LIST_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: InventoryActionTypes.PRODUCT_LIST_ERROR,
            payload: error,
        });
    }
}

function* createProductFunction(data) {
    try {
        yield put({
            type: InventoryActionTypes.CREATE_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(createProductApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: InventoryActionTypes.CREATE_PRODUCT_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: InventoryActionTypes.CREATE_PRODUCT_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: InventoryActionTypes.CREATE_PRODUCT_ERROR,
            payload: error,
        });
    }
}

function* updateProductFunction(data) {
    try {
        yield put({
            type: InventoryActionTypes.UPDATE_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(updateProductApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: InventoryActionTypes.UPDATE_PRODUCT_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: InventoryActionTypes.UPDATE_PRODUCT_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: InventoryActionTypes.UPDATE_PRODUCT_ERROR,
            payload: error,
        });
    }
}

function* deleteProductFunction(data) {
    try {
        yield put({
            type: InventoryActionTypes.DELETE_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(deleteProductApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: InventoryActionTypes.DELETE_PRODUCT_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: InventoryActionTypes.DELETE_PRODUCT_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: InventoryActionTypes.DELETE_PRODUCT_ERROR,
            payload: error,
        });
    }
}

function* searchProductFunction(data) {
    try {
        yield put({
            type: InventoryActionTypes.SEARCH_PRODUCT_LOADING,
            payload: {},
        });
        const response = yield call(searchProductApi, data);
        if (response?.status === 200) {
            // ToastContainer(response?.data?.message, 'success')
            yield put({
                type: InventoryActionTypes.SEARCH_PRODUCT_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: InventoryActionTypes.SEARCH_PRODUCT_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: InventoryActionTypes.SEARCH_PRODUCT_ERROR,
            payload: error,
        });
    }
}

export function* watchProductListData() {
    yield takeEvery(InventoryActionTypes.PRODUCT_LIST_FIRST, getProductListFunction);
}

export function* watchCreateProductData() {
    yield takeEvery(InventoryActionTypes.CREATE_PRODUCT_FIRST, createProductFunction);
}

export function* watchUpdateProductData() {
    yield takeEvery(InventoryActionTypes.UPDATE_PRODUCT_FIRST, updateProductFunction);
}

export function* watchDeleteProductData() {
    yield takeEvery(InventoryActionTypes.DELETE_PRODUCT_FIRST, deleteProductFunction);
}

export function* watchSearchProductData() {
    yield takeEvery(InventoryActionTypes.SEARCH_PRODUCT_FIRST, searchProductFunction);
}

function* inventorySaga() {
    yield all([
        fork(watchProductListData),
        fork(watchCreateProductData),
        fork(watchUpdateProductData),
        fork(watchDeleteProductData),
        fork(watchSearchProductData),

    ]);
}

export default inventorySaga;


