//------------------------------------R E D U C E R S-------------------------------------------------
import { CustomerActionTypes } from "./constants"

const CUSTOMER_LIST_INITIAL_STATE = {
    customerList: [],
    loading: false
}

const customerListReducer = (state = CUSTOMER_LIST_INITIAL_STATE, action) => {

    switch (action.type) {
        case CustomerActionTypes.CUSTOMER_LIST_LOADING:
            return {
                customerList: state.customerList,
                loading: true
            }
        case CustomerActionTypes.CUSTOMER_LIST_SUCCESS:
            return {
                customerList: action.payload,
                loading: false
            }
        case CustomerActionTypes.CUSTOMER_LIST_ERROR:
            return {
                customerList: action.payload,
                loading: false
            }
        default: return state
    }
}

const CREATE_CUSTOMER_INITIAL_STATE = {
    createCustomer: [],
    loading: false
}

const createCustomerReducer = (state = CREATE_CUSTOMER_INITIAL_STATE, action) => {

    switch (action.type) {
        case CustomerActionTypes.CREATE_CUSTOMER_LOADING:
            return {
                createCustomer: state.createUsers,
                loading: true
            }
        case CustomerActionTypes.CREATE_CUSTOMER_SUCCESS:
            return {
                createCustomer: action.payload,
                loading: false
            }
        case CustomerActionTypes.CREATE_CUSTOMER_RESET:
            return {
                createCustomer: [],
                loading: false,
            };
        case CustomerActionTypes.CREATE_CUSTOMER_ERROR:
            return {
                createCustomer: action.payload,
                loading: false
            }
        default: return state
    }
}

const UPDATE_CUSTOMER_INITIAL_STATE = {
    updateCustomer: [],
    loading: false
}

const updateCustomerReducer = (state = UPDATE_CUSTOMER_INITIAL_STATE, action) => {

    switch (action.type) {
        case CustomerActionTypes.UPDATE_CUSTOMER_LOADING:
            return {
                updateCustomer: state.updateCustomer,
                loading: true
            }
        case CustomerActionTypes.UPDATE_CUSTOMER_SUCCESS:
            return {
                updateCustomer: action.payload,
                loading: false
            }
        case CustomerActionTypes.UPDATE_CUSTOMER_RESET:
            return {
                updateCustomer: [],
                loading: false,
            };
        case CustomerActionTypes.UPDATE_CUSTOMER_ERROR:
            return {
                updateCustomer: action.payload,
                loading: false
            }
        default: return state
    }
}

const DELETE_CUSTOMER_INITIAL_STATE = {
    deleteCustomer: [],
    loading: false
}

const deleteCustomerReducer = (state = DELETE_CUSTOMER_INITIAL_STATE, action) => {

    switch (action.type) {
        case CustomerActionTypes.DELETE_CUSTOMER_LOADING:
            return {
                deleteCustomer: state.deleteCustomer,
                loading: true
            }
        case CustomerActionTypes.DELETE_CUSTOMER_SUCCESS:
            return {
                deleteCustomer: action.payload,
                loading: false
            }
        case CustomerActionTypes.DELETE_CUSTOMER_ERROR:
            return {
                deleteCustomer: action.payload,
                loading: false
            }
        case CustomerActionTypes.DELETE_CUSTOMER_RESET:
            return {
                deleteCustomer: [],
                loading: false
            }
        default: return state
    }
}

const LISTING_CUSTOMER_INITIAL_STATE = {
    listingCustomer: [],
    loading: false
}

const listingCustomerReducer = (state = LISTING_CUSTOMER_INITIAL_STATE, action) => {

    switch (action.type) {
        case CustomerActionTypes.LISTING_CUSTOMER_LOADING:
            return {
                listingCustomer: state.listingCustomer,
                loading: true
            }
        case CustomerActionTypes.LISTING_CUSTOMER_SUCCESS:
            return {
                listingCustomer: action.payload,
                loading: false
            }
        case CustomerActionTypes.LISTING_CUSTOMER_ERROR:
            return {
                listingCustomer: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    customerListReducer,
    createCustomerReducer,
    updateCustomerReducer,
    deleteCustomerReducer,
    listingCustomerReducer

}