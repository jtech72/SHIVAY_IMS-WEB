//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { WarehouseActionTypes } from './constants';


// warehouse 

export const createWarehouseActions = (data) => ({
    type: WarehouseActionTypes.CREATE_WAREHOUSE_FIRST,
    data
});

export const getWarehouseActions = (data) => ({
    type: WarehouseActionTypes.GET_WAREHOUSE_FIRST,
    data
});

export const updateWarehouseActions = (data) => ({
    type: WarehouseActionTypes.UPDATE_WAREHOUSE_FIRST,
    data
});

export const deleteWarehouseActions = (data) => ({
    type: WarehouseActionTypes.DELETE_WAREHOUSE_FIRST,
    data
});

export const getWarehouseListActions = (data) => ({
    type: WarehouseActionTypes.SEARCH_WAREHOUSE_FIRST,
    data
});

