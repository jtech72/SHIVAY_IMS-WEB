//------------------------------------R E D U C E R S-------------------------------------------------
import { StockInActionTypes } from "./constants"

const STOCKIN_LIST_INITIAL_STATE = {
    stockInList: [],
    loading: false
}

const stockInListReducer = (state = STOCKIN_LIST_INITIAL_STATE, action) => {
    
    switch (action.type) {
        case StockInActionTypes.STOCKIN_LIST_LOADING:
            return {
                stockInList: state.stockInList,
                loading: true
            }
        case StockInActionTypes.STOCKIN_LIST_SUCCESS:
            return {
                stockInList: action.payload,
                loading: false
            }
        case StockInActionTypes.STOCKIN_LIST_ERROR:
            return {
                stockInList: action.payload,
                loading: false
            }
        default: return state
    }
}

const CREATE_STOCKIN_INITIAL_STATE = {
    createStockIn: [],
    loading: false
}

const createStockInReducer = (state = CREATE_STOCKIN_INITIAL_STATE, action) => {
    
    switch (action.type) {
        case StockInActionTypes.CREATE_STOCKIN_LOADING:
            return {
                createStockIn: state.createStockIn,
                loading: true
            }
        case StockInActionTypes.CREATE_STOCKIN_SUCCESS:
            return {
                createStockIn: action.payload,
                loading: false
            }
        case StockInActionTypes.CREATE_STOCKIN_ERROR:
            return {
                createStockIn: action.payload,
                loading: false
            }
        default: return state
    }
}

const UPDATE_STOCKIN_INITIAL_STATE = {
    updateStockIn: [],
    loading: false
}

const updateStockInReducer = (state = UPDATE_STOCKIN_INITIAL_STATE, action) => {
    
    switch (action.type) {
        case StockInActionTypes.UPDATE_STOCKIN_LOADING:
            return {
                updateStockIn: state.updateStockIn,
                loading: true
            }
        case StockInActionTypes.UPDATE_STOCKIN_SUCCESS:
            return {
                updateStockIn: action.payload,
                loading: false
            }
        case StockInActionTypes.UPDATE_STOCKIN_ERROR:
            return {
                updateStockIn: action.payload,
                loading: false
            }
        default: return state
    }
}

const DELETE_STOCKIN_INITIAL_STATE = {
    deleteStockIn: [],
    loading: false
}

const deleteStockInReducer = (state = DELETE_STOCKIN_INITIAL_STATE, action) => {
    
    switch (action.type) {
        case StockInActionTypes.DELETE_STOCKIN_LOADING:
            return {
                deleteStockIn: state.deleteStockIn,
                loading: true
            }
        case StockInActionTypes.DELETE_STOCKIN_SUCCESS:
            return {
                deleteStockIn: action.payload,
                loading: false
            }
        case StockInActionTypes.DELETE_STOCKIN_ERROR:
            return {
                deleteStockIn: action.payload,
                loading: false
            }
        default: return state
    }
}
export {
    stockInListReducer,
    createStockInReducer,
    updateStockInReducer,
    deleteStockInReducer,
}