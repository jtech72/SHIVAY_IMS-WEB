//------------------------------------R E D U C E R S-------------------------------------------------
import { StockActionTypes } from "./constants"

const STOCK_LIST_INITIAL_STATE = {
    stockList: [],
    loading: false
}

const stockListReducer = (state = STOCK_LIST_INITIAL_STATE, action) => {
    
    switch (action.type) {
        case StockActionTypes.STOCK_LIST_LOADING:
            return {
                stockList: state.stockList,
                loading: true
            }
        case StockActionTypes.STOCK_LIST_SUCCESS:
            return {
                stockList: action.payload,
                loading: false
            }
        case StockActionTypes.STOCK_LIST_ERROR:
            return {
                stockList: action.payload,
                loading: false
            }
        default: return state
    }
}

const CREATE_STOCK_INITIAL_STATE = {
    createStock: [],
    loading: false
}

const createStockReducer = (state = CREATE_STOCK_INITIAL_STATE, action) => {
    
    switch (action.type) {
        case StockActionTypes.CREATE_STOCK_LOADING:
            return {
                createStock: state.createStock,
                loading: true
            }
        case StockActionTypes.CREATE_STOCK_SUCCESS:
            return {
                createStock: action.payload,
                loading: false
            }
        case StockActionTypes.CREATE_STOCK_ERROR:
            return {
                createStock: action.payload,
                loading: false
            }
        default: return state
    }
}

const UPDATE_STOCK_INITIAL_STATE = {
    updateStock: [],
    loading: false
}

const updateStockReducer = (state = UPDATE_STOCK_INITIAL_STATE, action) => {
    
    switch (action.type) {
        case StockActionTypes.UPDATE_STOCK_LOADING:
            return {
                updateStock: state.updateStock,
                loading: true
            }
        case StockActionTypes.UPDATE_STOCK_SUCCESS:
            return {
                updateStock: action.payload,
                loading: false
            }
        case StockActionTypes.UPDATE_STOCK_ERROR:
            return {
                updateStock: action.payload,
                loading: false
            }
        default: return state
    }
}


export {
    stockListReducer,
    createStockReducer,
    updateStockReducer,
}