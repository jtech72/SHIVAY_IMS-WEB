//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { InventoryActionTypes } from './constants';


export const getProductListActions = (data) => ({
    type: InventoryActionTypes.PRODUCT_LIST_FIRST,
    data
});

export const createProductActions = (data) => ({
    type: InventoryActionTypes.CREATE_PRODUCT_FIRST,
    data
});


export const updateProductActions = (data) => ({
    type: InventoryActionTypes.UPDATE_PRODUCT_FIRST,
    data
});

export const deleteProductActions = (data) => ({
    type: InventoryActionTypes.DELETE_PRODUCT_FIRST,
    data
});

export const searchProductActions = (data) => ({
    type: InventoryActionTypes.SEARCH_PRODUCT_FIRST,
    data
});

