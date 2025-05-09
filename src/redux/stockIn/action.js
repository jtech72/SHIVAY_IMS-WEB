//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { StockInActionTypes } from './constants';


export const getStockInListActions = (data) => ({
    type: StockInActionTypes.STOCKIN_LIST_FIRST,
    data
});

export const createStockInActions = (data) => ({
    type: StockInActionTypes.CREATE_STOCKIN_FIRST,
    data
});


export const updateStockInActions = (data) => ({
    type: StockInActionTypes.UPDATE_STOCKIN_FIRST,
    data
});

export const deleteStockInActions = (data) => ({
    type: StockInActionTypes.DELETE_STOCKIN_FIRST,
    data
});

export const getStockInByIdActions = (data) => ({
    type: StockInActionTypes.GET_STOCKIN_FIRST,
    data
});

export const updateStockInProductActions = (data) => ({
    type: StockInActionTypes.UPDATE_STOCKIN_PRODUCT_FIRST,
    data
});

export const deleteStockInProductActions = (data) => ({
    type: StockInActionTypes.DELETE_STOCKIN_PRODUCT_FIRST,
    data
});