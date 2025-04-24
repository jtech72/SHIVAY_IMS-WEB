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
