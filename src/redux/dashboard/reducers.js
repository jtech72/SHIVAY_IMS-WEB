//------------------------------------R E D U C E R S-------------------------------------------------
import { DashboardActionTypes } from "./constants"

const DASHBOARD_DATA_INITIAL_STATE = {
    dashboardData: [],
    loading: false
}

const dashboardDataReducer = (state = DASHBOARD_DATA_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.DASHBOARD_DATA_LOADING:
            return {
                dashboardData: state.dashboardData,
                loading: true
            }
        case DashboardActionTypes.DASHBOARD_DATA_SUCCESS:
            return {
                dashboardData: action.payload,
                loading: false
            }
        case DashboardActionTypes.DASHBOARD_DATA_ERROR:
            return {
                dashboardData: action.payload,
                loading: false
            }
        default: return state
    }
}

const STOCKIN_LIST_INITIAL_STATE = {
    stockinList: [],
    loading: false
}

const stockinTransListReducer = (state = STOCKIN_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.STOCKIN_TRANS_LIST_LOADING:
            return {
                stockinList: state.stockinList,
                loading: true
            }
        case DashboardActionTypes.STOCKIN_TRANS_LIST_SUCCESS:
            return {
                stockinList: action.payload,
                loading: false
            }
        case DashboardActionTypes.STOCKIN_TRANS_LIST_ERROR:
            return {
                stockinList: action.payload,
                loading: false
            }
        default: return state
    }
}

const DISPATCH_LIST_INITIAL_STATE = {
    dispatchList: [],
    loading: false
}

const dispatchListReducer = (state = DISPATCH_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DashboardActionTypes.DISPATCH_LIST_LOADING:
            return {
                dispatchList: state.dispatchList,
                loading: true
            }
        case DashboardActionTypes.DISPATCH_LIST_SUCCESS:
            return {
                dispatchList: action.payload,
                loading: false
            }
        case DashboardActionTypes.DISPATCH_LIST_ERROR:
            return {
                dispatchList: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    dashboardDataReducer,
    stockinTransListReducer,
    dispatchListReducer,
}