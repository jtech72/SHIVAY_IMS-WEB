//------------------------------------R E D U C E R S-------------------------------------------------
import { DispatchActionTypes } from "./constants"

const DISPATCH_LIST_INITIAL_STATE = {
    dispatchList: [],
    loading: false
}

const getDispatchDataReducer = (state = DISPATCH_LIST_INITIAL_STATE, action) => {

    switch (action.type) {
        case DispatchActionTypes.GET_DISPATCH_LIST_LOADING:
            return {
                dispatchList: state.dispatchList,
                loading: true
            }
        case DispatchActionTypes.GET_DISPATCH_LIST_SUCCESS:
            return {
                dispatchList: action.payload,
                loading: false
            }
        case DispatchActionTypes.GET_DISPATCH_LIST_ERROR:
            return {
                dispatchList: action.payload,
                loading: false
            }
        default: return state
    }
}

const CREATE_DISPATCH_INITIAL_STATE = {
    createDispatch: [],
    loading: false
}

const createDispatchReducer = (state = CREATE_DISPATCH_INITIAL_STATE, action) => {

    switch (action.type) {
        case DispatchActionTypes.CREATE_DISPATCH_LOADING:
            return {
                createDispatch: state.createDispatch,
                loading: true
            }
        case DispatchActionTypes.CREATE_DISPATCH_SUCCESS:
            return {
                createDispatch: action.payload,
                loading: false
            }
        case DispatchActionTypes.CREATE_DISPATCH_RESET:
            return {
                createDispatch: [],
                loading: false,
            };
        case DispatchActionTypes.CREATE_DISPATCH_ERROR:
            return {
                createDispatch: action.payload,
                loading: false
            }
        default: return state
    }
}

const UPDATE_DISPATCH_INITIAL_STATE = {
    updateDispatch: [],
    loading: false
}

const updateDispatchReducer = (state = UPDATE_DISPATCH_INITIAL_STATE, action) => {

    switch (action.type) {
        case DispatchActionTypes.UPDATE_DISPATCH_LOADING:
            return {
                updateDispatch: state.updateDispatch,
                loading: true
            }
        case DispatchActionTypes.UPDATE_DISPATCH_SUCCESS:
            return {
                updateDispatch: action.payload,
                loading: false
            }
        case DispatchActionTypes.UPDATE_DISPATCH_RESET:
            return {
                updateDispatch: [],
                loading: false,
            };
        case DispatchActionTypes.UPDATE_DISPATCH_ERROR:
            return {
                updateDispatch: action.payload,
                loading: false
            }
        default: return state
    }
}

const DELETE_DISPATCH_INITIAL_STATE = {
    deleteDispatch: [],
    loading: false
}

const deleteDispatchReducer = (state = DELETE_DISPATCH_INITIAL_STATE, action) => {

    switch (action.type) {
        case DispatchActionTypes.DELETE_DISPATCH_LOADING:
            return {
                deleteDispatch: state.deleteDispatch,
                loading: true
            }
        case DispatchActionTypes.DELETE_DISPATCH_SUCCESS:
            return {
                deleteDispatch: action.payload,
                loading: false
            }
        case DispatchActionTypes.DELETE_DISPATCH_ERROR:
            return {
                deleteDispatch: action.payload,
                loading: false
            }
        case DispatchActionTypes.DELETE_DISPATCH_RESET:
            return {
                deleteDispatch: [],
                loading: false
            }
        default: return state
    }
}

const CREATE_STOCK_CHECK_INITIAL_STATE = {
    createStockCheck: [],
    loading: false
}

const createStockCheckReducer = (state = CREATE_STOCK_CHECK_INITIAL_STATE, action) => {

    switch (action.type) {
        case DispatchActionTypes.CREATE_STOCK_CHECK_LOADING:
            return {
                createStockCheck: state.createStockCheck,
                loading: true
            }
        case DispatchActionTypes.CREATE_STOCK_CHECK_SUCCESS:
            return {
                createStockCheck: action.payload,
                loading: false
            }
        case DispatchActionTypes.CREATE_STOCK_CHECK_ERROR:
            return {
                createStockCheck: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    getDispatchDataReducer,
    createDispatchReducer,
    updateDispatchReducer,
    deleteDispatchReducer,
    createStockCheckReducer,
}