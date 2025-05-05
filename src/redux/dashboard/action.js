//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { DashboardActionTypes } from './constants';


export const getDashboardActions = (data) => ({
    type: DashboardActionTypes.DASHBOARD_DATA_FIRST,
    data
});

export const getStockinActions = (data) => ({
    type: DashboardActionTypes.STOCKIN_TRANS_LIST_FIRST,
    data
});

export const getDispatchActions = (data) => ({
    type: DashboardActionTypes.DISPATCH_LIST_FIRST,
    data
});

export const getStockReportActions = (data) => ({
    type: DashboardActionTypes.GET_STOCK_REPORT_FIRST,
    data
});

export const getRecentTransactionActions = (data) => ({
    type: DashboardActionTypes.GET_RECENT_TRANS_FIRST,
    data
});

export const getLowStockActions = (data) => ({
    type: DashboardActionTypes.GET_LOW_STOCK_FIRST,
    data
});
