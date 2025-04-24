//------------------------------------S A G A---------------------------------------------------------------
import { all, fork, put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { NotificationActionTypes } from './constants';

import {
    createNotificationApi, updateNotificationApi,
    getNotificationApi
} from './api';
// import ToastContainer from '../../helpers/toast/ToastContainer';
/**
 * Login the user
 * @param {*} payload - username and password
 */



function* getNotificationFunction(data) {
    try {
        yield put({
            type: NotificationActionTypes.GET_NOTIFICATION_LOADING,
            payload: {},
        });
        const response = yield call(getNotificationApi, data);
        if (response.data.status) {
            yield put({
                type: NotificationActionTypes.GET_NOTIFICATION_SUCCESS,
                payload: { ...response.data },
            });
        } else {
            yield put({
                type: NotificationActionTypes.GET_NOTIFICATION_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: NotificationActionTypes.GET_NOTIFICATION_ERROR,
            payload: error,
        });
    }
};

function* createNotificationFunction(data) {
    try {
        yield put({
            type: NotificationActionTypes.CREATE_NOTIFICATION_LOADING,
            payload: {},
        });
        const response = yield call(createNotificationApi, data);
        console.log({response})
        if (response.data.status) {
            yield put({
                type: NotificationActionTypes.CREATE_NOTIFICATION_SUCCESS,
                payload: { ...response.data },
            });
            // ToastContainer(response?.data?.data?.message, 'success')

        } else {
            yield put({
                type: NotificationActionTypes.CREATE_NOTIFICATION_ERROR,
                payload: { ...response.data },
            });
        }
    } catch (error) {
        yield put({
            type: NotificationActionTypes.CREATE_NOTIFICATION_ERROR,
            payload: error,
        });
    }
};

function* updateNotificationFunction(payload) {
    try {
        yield put({
            type: NotificationActionTypes.UPDATE_NOTIFICATION_DATA_LOADING,
        });

        const response = yield call(updateNotificationApi, payload);
        console.log({ response })

        if (response && response.data) {
            yield put({
                type: NotificationActionTypes.UPDATE_NOTIFICATION_DATA_SUCCESS,
                payload: response.data,
            });

            // ToastContainer(response?.data?.message, 'success')

        } else {
            yield put({
                type: NotificationActionTypes.UPDATE_NOTIFICATION_DATA_ERROR,
                payload: response.data,
            });
            // ToastContainer(response.data.message, 'danger')
        }
    } catch (error) {
        console.log({ error })
        yield put({
            type: NotificationActionTypes.UPDATE_NOTIFICATION_DATA_ERROR,
            payload: { message: error },
        });
        // ToastContainer(error, 'danger')

    }
};



export function* watchNotificationData() {
    yield takeEvery(NotificationActionTypes.GET_NOTIFICATION_FIRST, getNotificationFunction);
    yield takeEvery(NotificationActionTypes.CREATE_NOTIFICATION_FIRST, createNotificationFunction);
    yield takeLatest(NotificationActionTypes.UPDATE_NOTIFICATION_DATA_FIRST, updateNotificationFunction);
}

function* notificationSaga() {
    yield all([
        fork(watchNotificationData)
    ]);
}

export default notificationSaga;


