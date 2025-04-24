//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { StockActionTypes } from './constants';


export const getStockListActions = (data) => ({
    type: StockActionTypes.STOCK_LIST_FIRST,
    data
});

export const createStockActions = (data) => ({
    type: StockActionTypes.CREATE_STOCK_FIRST,
    data
});


export const updateStockActions = (data) => ({
    type: StockActionTypes.UPDATE_STOCK_FIRST,
    data
});

