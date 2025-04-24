//------------------------------------R E D U C E R S-------------------------------------------------
import { NotificationActionTypes } from "./constants"

const NOTIFICATION_DATA_INITIAL_STATE = {
    notificationData: [],
    loading: false
}


const getNotificationDataReducer = (state = NOTIFICATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case NotificationActionTypes.GET_NOTIFICATION_LOADING:
            return {
                notificationData: state.notificationData,
                loading: true
            }
        case NotificationActionTypes.GET_NOTIFICATION_SUCCESS:
            return {
                notificationData: action.payload,
                loading: false
            }
        case NotificationActionTypes.GET_NOTIFICATION_ERROR:
            return {
                notificationData: action.payload,
                loading: false
            }
        case NotificationActionTypes.STATE_EMPTY_SUCCESS:
            return NOTIFICATION_DATA_INITIAL_STATE
        default: return state
    }
}

const createNotificationDataReducer = (state = NOTIFICATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case NotificationActionTypes.CREATE_NOTIFICATION_LOADING:
            return {
                notificationData: state.notificationData,
                loading: true
            }
        case NotificationActionTypes.CREATE_NOTIFICATION_SUCCESS:
            return {
                notificationData: action.payload,
                loading: false
            }
        case NotificationActionTypes.CREATE_NOTIFICATION_ERROR:
            return {
                notificationData: action.payload,
                loading: false
            }
        case NotificationActionTypes.STATE_EMPTY_SUCCESS:
            return NOTIFICATION_DATA_INITIAL_STATE
        default: return state
    }
}

const updateNotificationDataReducer = (state = NOTIFICATION_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case NotificationActionTypes.UPDATE_NOTIFICATION_DATA_LOADING:
            return {
                ...state,
                loading: true,
            };
        case NotificationActionTypes.UPDATE_NOTIFICATION_DATA_SUCCESS:
            return {
                ...state,
                notificationData: action.payload,
                loading: false,
            };
        case NotificationActionTypes.UPDATE_NOTIFICATION_DATA_ERROR:
            return {
                ...state,
                notificationData: null,
                error: action.payload,
                loading: false,
            };
        case NotificationActionTypes.STATE_EMPTY_SUCCESS:
            return NOTIFICATION_DATA_INITIAL_STATE
        default:
            return state;
    }
};


export { getNotificationDataReducer, createNotificationDataReducer, updateNotificationDataReducer }