//------------------------------------R E D U C E R S-------------------------------------------------
import { UsersActionTypes } from "./constants"

const USERS_LIST_INITIAL_STATE = {
    userList: [],
    loading: false
}

const userListReducer = (state = USERS_LIST_INITIAL_STATE, action) => {

    switch (action.type) {
        case UsersActionTypes.USERS_LIST_LOADING:
            return {
                userList: state.userList,
                loading: true
            }
        case UsersActionTypes.USERS_LIST_SUCCESS:
            return {
                userList: action.payload,
                loading: false
            }
        case UsersActionTypes.USERS_LIST_ERROR:
            return {
                userList: action.payload,
                loading: false
            }
        default: return state
    }
}

const CREATE_USERS_INITIAL_STATE = {
    createUsers: [],
    loading: false
}

const createUsersReducer = (state = CREATE_USERS_INITIAL_STATE, action) => {

    switch (action.type) {
        case UsersActionTypes.CREATE_USERS_LOADING:
            return {
                createUsers: state.createUsers,
                loading: true
            }
        case UsersActionTypes.CREATE_USERS_SUCCESS:
            return {
                createUsers: action.payload,
                loading: false
            }
        case UsersActionTypes.CREATE_USERS_RESET:
            return {
                createUsers: [],
                loading: false,
            };
        case UsersActionTypes.CREATE_USERS_ERROR:
            return {
                createUsers: action.payload,
                loading: false
            }
        default: return state
    }
}

const UPDATE_USERS_INITIAL_STATE = {
    updateUsers: [],
    loading: false
}

const updateUsersReducer = (state = UPDATE_USERS_INITIAL_STATE, action) => {

    switch (action.type) {
        case UsersActionTypes.UPDATE_USERS_LOADING:
            return {
                updateUsers: state.updateUsers,
                loading: true
            }
        case UsersActionTypes.UPDATE_USERS_SUCCESS:
            return {
                updateUsers: action.payload,
                loading: false
            }
        case UsersActionTypes.UPDATE_USERS_RESET:
            return {
                updateUsers: [],
                loading: false,
            };
        case UsersActionTypes.UPDATE_USERS_ERROR:
            return {
                updateUsers: action.payload,
                loading: false
            }
        default: return state
    }
}

const DELETE_USERS_INITIAL_STATE = {
    deleteUsers: [],
    loading: false
}

const deleteUsersReducer = (state = DELETE_USERS_INITIAL_STATE, action) => {

    switch (action.type) {
        case UsersActionTypes.DELETE_USERS_LOADING:
            return {
                deleteUsers: state.deleteUsers,
                loading: true
            }
        case UsersActionTypes.DELETE_USERS_SUCCESS:
            return {
                deleteUsers: action.payload,
                loading: false
            }
        case UsersActionTypes.DELETE_USERS_ERROR:
            return {
                deleteUsers: action.payload,
                loading: false
            }
        case UsersActionTypes.USERS_DATA_RESET:
            return {
                deleteUsers: [],
                loading: false
            }
        default: return state
    }
}

const LISTING_USERS_INITIAL_STATE = {
    listingUsers: [],
    loading: false
}

const listingUsersReducer = (state = LISTING_USERS_INITIAL_STATE, action) => {

    switch (action.type) {
        case UsersActionTypes.LISTING_USERS_LOADING:
            return {
                listingUsers: state.listingUsers,
                loading: true
            }
        case UsersActionTypes.LISTING_USERS_SUCCESS:
            return {
                listingUsers: action.payload,
                loading: false
            }
        case UsersActionTypes.LISTING_USERS_ERROR:
            return {
                listingUsers: action.payload,
                loading: false
            }
        default: return state
    }
}
export {
    userListReducer,
    createUsersReducer,
    updateUsersReducer,
    deleteUsersReducer,
    listingUsersReducer,
}