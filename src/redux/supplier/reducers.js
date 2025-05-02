//------------------------------------R E D U C E R S-------------------------------------------------
import { SupplierActionTypes } from "./constants"

const SUPPLIER_LIST_INITIAL_STATE = {
    supplierList: [],
    loading: false
}

const supplierListReducer = (state = SUPPLIER_LIST_INITIAL_STATE, action) => {

    switch (action.type) {
        case SupplierActionTypes.SUPPLIER_LIST_LOADING:
            return {
                supplierList: state.supplierList,
                loading: true
            }
        case SupplierActionTypes.SUPPLIER_LIST_SUCCESS:
            return {
                supplierList: action.payload,
                loading: false
            }
        case SupplierActionTypes.SUPPLIER_LIST_ERROR:
            return {
                supplierList: action.payload,
                loading: false
            }
        default: return state
    }
}

const CREATE_SUPPLIER_INITIAL_STATE = {
    createSupplier: [],
    loading: false
}

const createSupplierReducer = (state = CREATE_SUPPLIER_INITIAL_STATE, action) => {

    switch (action.type) {
        case SupplierActionTypes.CREATE_SUPPLIER_LOADING:
            return {
                createSupplier: state.createSupplier,
                loading: true
            }
        case SupplierActionTypes.CREATE_SUPPLIER_SUCCESS:
            return {
                createSupplier: action.payload,
                loading: false
            }
        case SupplierActionTypes.CREATE_SUPPLIER_RESET:
            return {
                createSupplier: [],
                loading: false,
            };
        case SupplierActionTypes.CREATE_SUPPLIER_ERROR:
            return {
                createSupplier: action.payload,
                loading: false
            }
        default: return state
    }
}

const UPDATE_SUPPLIER_INITIAL_STATE = {
    updateSupplier: [],
    loading: false
}

const updateSupplierReducer = (state = UPDATE_SUPPLIER_INITIAL_STATE, action) => {

    switch (action.type) {
        case SupplierActionTypes.UPDATE_SUPPLIER_LOADING:
            return {
                updateSupplier: state.updateSupplier,
                loading: true
            }
        case SupplierActionTypes.UPDATE_SUPPLIER_SUCCESS:
            return {
                updateSupplier: action.payload,
                loading: false
            }
        case SupplierActionTypes.UPDATE_SUPPLIER_RESET:
            return {
                updateSupplier: [],
                loading: false,
            };
        case SupplierActionTypes.UPDATE_SUPPLIER_ERROR:
            return {
                updateSupplier: action.payload,
                loading: false
            }
        default: return state
    }
}

const DELETE_SUPPLIER_INITIAL_STATE = {
    deleteSupplier: [],
    loading: false
}

const deleteSupplierReducer = (state = DELETE_SUPPLIER_INITIAL_STATE, action) => {

    switch (action.type) {
        case SupplierActionTypes.DELETE_SUPPLIER_LOADING:
            return {
                deleteSupplier: state.deleteSupplier,
                loading: true
            }
        case SupplierActionTypes.DELETE_SUPPLIER_SUCCESS:
            return {
                deleteSupplier: action.payload,
                loading: false
            }
        case SupplierActionTypes.DELETE_SUPPLIER_ERROR:
            return {
                deleteSupplier: action.payload,
                loading: false
            }
        case SupplierActionTypes.DELETE_SUPPLIER_RESET:
            return {
                deleteSupplier: [],
                loading: false
            }
        default: return state
    }
}

const LISTING_SUPPLIER_INITIAL_STATE = {
    listingSupplier: [],
    loading: false
}

const listingSupplierReducer = (state = LISTING_SUPPLIER_INITIAL_STATE, action) => {

    switch (action.type) {
        case SupplierActionTypes.LISTING_SUPPLIER_LOADING:
            return {
                listingSupplier: state.listingSupplier,
                loading: true
            }
        case SupplierActionTypes.LISTING_SUPPLIER_SUCCESS:
            return {
                listingSupplier: action.payload,
                loading: false
            }
        case SupplierActionTypes.LISTING_SUPPLIER_ERROR:
            return {
                listingSupplier: action.payload,
                loading: false
            }
        default: return state
    }
}
export {
    supplierListReducer,
    createSupplierReducer,
    updateSupplierReducer,
    deleteSupplierReducer,
    listingSupplierReducer,
}