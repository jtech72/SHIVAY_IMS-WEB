//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { SupplierActionTypes } from './constants';


export const getSupplierListActions = (data) => ({
    type: SupplierActionTypes.SUPPLIER_LIST_FIRST,
    data
});

export const createSupplierActions = (data) => ({
    type: SupplierActionTypes.CREATE_SUPPLIER_FIRST,
    data
});


export const updateSupplierActions = (data) => ({
    type: SupplierActionTypes.UPDATE_SUPPLIER_FIRST,
    data
});

export const deleteSupplierActions = (data) => ({
    type: SupplierActionTypes.DELETE_SUPPLIER_FIRST,
    data
});

export const listingSupplierActions = (data) => ({
    type: SupplierActionTypes.LISTING_SUPPLIER_FIRST,
    data
});