//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { UsersActionTypes } from './constants';

import { createUsersApi, deleteUsersApi, getUsersListApi, listingUsersApi, updateUsersApi } from './api';
import ToastContainer from '../../helpers/toast/ToastContainer';




function* getUserListFunction(data) {
    try {
        yield put({
            type: UsersActionTypes.USERS_LIST_LOADING,
            payload: {},
        });
        const response = yield call(getUsersListApi, data);
        if (response?.status === 200) {
            yield put({
                type: UsersActionTypes.USERS_LIST_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: UsersActionTypes.USERS_LIST_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: UsersActionTypes.USERS_LIST_ERROR,
            payload: error,
        });
    }
}

function* createUsersFunction(data) {
    try {
        yield put({
            type: UsersActionTypes.CREATE_USERS_LOADING,
            payload: {},
        });
        const response = yield call(createUsersApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: UsersActionTypes.CREATE_USERS_SUCCESS,
                payload: response.data,
            });
            yield put({
                type: UsersActionTypes.CREATE_USERS_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: UsersActionTypes.CREATE_USERS_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: UsersActionTypes.CREATE_USERS_ERROR,
            payload: error,
        });
    }
}

function* updateUsersFunction(data) {
    try {
        yield put({
            type: UsersActionTypes.UPDATE_USERS_LOADING,
            payload: {},
        });
        const response = yield call(updateUsersApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'success')
            yield put({
                type: UsersActionTypes.UPDATE_USERS_SUCCESS,
                payload: response.data,
            });
            yield put({
                type: UsersActionTypes.UPDATE_USERS_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: UsersActionTypes.UPDATE_USERS_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        ToastContainer(error, 'danger')
        yield put({
            type: UsersActionTypes.UPDATE_USERS_ERROR,
            payload: error,
        });
    }
}

function* deleteUsersFunction(data) {
    try {
        yield put({
            type: UsersActionTypes.DELETE_USERS_LOADING,
            payload: {},
        });
        const response = yield call(deleteUsersApi, data);
        if (response?.status === 200) {
            ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: UsersActionTypes.DELETE_USERS_SUCCESS,
                payload: response.data,
            });
            yield put({
                type: UsersActionTypes.DELETE_USERS_RESET,
                payload: {},
            });
        } else {
            yield put({
                type: UsersActionTypes.DELETE_USERS_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: UsersActionTypes.DELETE_USERS_ERROR,
            payload: error,
        });
    }
}

function* listingUsersFunction(data) {
    try {
        yield put({
            type: UsersActionTypes.LISTING_USERS_LOADING,
            payload: {},
        });
        const response = yield call(listingUsersApi, data);
        if (response?.status === 200) {
            // ToastContainer(response?.data?.message, 'danger')
            yield put({
                type: UsersActionTypes.LISTING_USERS_SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: UsersActionTypes.LISTING_USERS_ERROR,
                payload: response.data,
            });
        }
    } catch (error) {
        yield put({
            type: UsersActionTypes.LISTING_USERS_ERROR,
            payload: error,
        });
    }
}

export function* watchUserListData() {
    yield takeEvery(UsersActionTypes.USERS_LIST_FIRST, getUserListFunction);
}

export function* watchCreateUsersData() {
    yield takeEvery(UsersActionTypes.CREATE_USERS_FIRST, createUsersFunction);
}

export function* watchUpdateUsersData() {
    yield takeEvery(UsersActionTypes.UPDATE_USERS_FIRST, updateUsersFunction);
}

export function* watchDeleteUsersData() {
    yield takeEvery(UsersActionTypes.DELETE_USERS_FIRST, deleteUsersFunction);
}

export function* watchListingUsersData() {
    yield takeEvery(UsersActionTypes.LISTING_USERS_FIRST, listingUsersFunction);
}

function* userSaga() {
    yield all([
        fork(watchUserListData),
        fork(watchCreateUsersData),
        fork(watchUpdateUsersData),
        fork(watchDeleteUsersData),
        fork(watchListingUsersData),

    ]);
}

export default userSaga;


