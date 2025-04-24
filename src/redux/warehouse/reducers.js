//------------------------------------R E D U C E R S-------------------------------------------------
import { WarehouseActionTypes } from "./constants"

const CRATE_WAREHOUSE_INITIAL_STATE = {
    warehouseData: [],
    loading: false
}

const createWarehouseReducer = (state = CRATE_WAREHOUSE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WarehouseActionTypes.CREATE_WAREHOUSE_LOADING:
            return {
                warehouseData: state.warehouseData,
                loading: true
            }
        case WarehouseActionTypes.CREATE_WAREHOUSE_SUCCESS:
            return {
                warehouseData: action.payload,
                loading: false
            }
        case WarehouseActionTypes.CREATE_WAREHOUSE_ERROR:
            return {
                warehouseData: action.payload,
                loading: false
            }
        default: return state
    }
}

const GET_WAREHOUSE_INITIAL_STATE = {
    warehouseList: [],
    loading: false
}

const getWarehouseReducer = (state = GET_WAREHOUSE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WarehouseActionTypes.GET_WAREHOUSE_LOADING:
            return {
                warehouseList: state.warehouseList,
                loading: true
            }
        case WarehouseActionTypes.GET_WAREHOUSE_SUCCESS:
            return {
                warehouseList: action.payload,
                loading: false
            }
        case WarehouseActionTypes.GET_WAREHOUSE_ERROR:
            return {
                warehouseList: action.payload,
                loading: false
            }
        default: return state
    }
}

const UPDATE_WAREHOUSE_INITIAL_STATE = {
    warehouseUpdate: [],
    loading: false
}

const updateWarehouseReducer = (state = UPDATE_WAREHOUSE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WarehouseActionTypes.UPDATE_WAREHOUSE_LOADING:
            return {
                warehouseUpdate: state.warehouseUpdate,
                loading: true
            }
        case WarehouseActionTypes.UPDATE_WAREHOUSE_SUCCESS:
            return {
                warehouseUpdate: action.payload,
                loading: false
            }
        case WarehouseActionTypes.UPDATE_WAREHOUSE_ERROR:
            return {
                warehouseUpdate: action.payload,
                loading: false
            }
        default: return state
    }
}
const DELETE_WAREHOUSE_INITIAL_STATE = {
    warehouseDelete: [],
    loading: false
}
const deleteWarehouseReducer = (state = DELETE_WAREHOUSE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WarehouseActionTypes.DELETE_WAREHOUSE_LOADING:
            return {
                warehouseDelete: state.warehouseDelete,
                loading: true
            }
        case WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESS:
            return {
                warehouseDelete: action.payload,
                loading: false
            }
        case WarehouseActionTypes.DELETE_WAREHOUSE_ERROR:
            return {
                warehouseDelete: action.payload,
                loading: false
            }
        default: return state
    }
}

const SEARCH_WAREHOUSE_INITIAL_STATE = {
    searchWarehouse: [],
    loading: false
}

const getWarehouseListReducer = (state = SEARCH_WAREHOUSE_INITIAL_STATE, action) => {
    switch (action.type) {
        case WarehouseActionTypes.SEARCH_WAREHOUSE_LOADING:
            return {
                searchWarehouse: state.searchWarehouse,
                loading: true
            }
        case WarehouseActionTypes.SEARCH_WAREHOUSE_SUCCESS:
            return {
                searchWarehouse: action.payload,
                loading: false
            }
        case WarehouseActionTypes.SEARCH_WAREHOUSE_ERROR:
            return {
                searchWarehouse: action.payload,
                loading: false
            }
        default: return state
    }
}


export {
    createWarehouseReducer,
    getWarehouseReducer,
    updateWarehouseReducer,
    deleteWarehouseReducer,
    getWarehouseListReducer
}