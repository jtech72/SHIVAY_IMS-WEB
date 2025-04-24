//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { NotificationActionTypes } from './constants';

export const getNotificationActions = (data) => ({
    type: NotificationActionTypes.GET_NOTIFICATION_FIRST,
    data
});
export const createNotificationActions = (data) => ({
    type: NotificationActionTypes.CREATE_NOTIFICATION_FIRST,
    data
});

export const updateNotificationActions = (data) => ({
    type: NotificationActionTypes.UPDATE_NOTIFICATION_DATA_FIRST,
    data
});

