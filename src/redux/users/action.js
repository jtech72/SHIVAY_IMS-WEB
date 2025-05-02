//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { UsersActionTypes } from './constants';


export const getUsersListActions = (data) => ({
    type: UsersActionTypes.USERS_LIST_FIRST,
    data
});

export const createUsersActions = (data) => ({
    type: UsersActionTypes.CREATE_USERS_FIRST,
    data
});


export const updateUsersActions = (data) => ({
    type: UsersActionTypes.UPDATE_USERS_FIRST,
    data
});

export const deleteUsersActions = (data) => ({
    type: UsersActionTypes.DELETE_USERS_FIRST,
    data
});

export const listingUsersActions = (data) => ({
    type: UsersActionTypes.LISTING_USERS_FIRST,
    data
});

export const UsersStateEmptyActions = (data) => ({
    type: UsersActionTypes.USERS_DATA_RESET,
    data
});