//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { CustomerActionTypes } from './constants';


export const getCustomerListActions = (data) => ({
    type: CustomerActionTypes.CUSTOMER_LIST_FIRST,
    data
});

export const createCustomerActions = (data) => ({
    type: CustomerActionTypes.CREATE_CUSTOMER_FIRST,
    data
});

export const updateCustomerActions = (data) => ({
    type: CustomerActionTypes.UPDATE_CUSTOMER_FIRST,
    data
});

export const deleteCustomerActions = (data) => ({
    type: CustomerActionTypes.DELETE_CUSTOMER_FIRST,
    data
});

export const listingCustomerActions = (data) => ({
    type: CustomerActionTypes.LISTING_CUSTOMER_FIRST,
    data
});