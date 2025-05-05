//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();

//products
function getDashboardApi(params) {
    return api.get(`${URL.GET_DASHBOARD_DATA}`);
}

function getStockinApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_STOCKIN_LIST}?search=${search}&page=${page}&limit=${limit}`);
}

function getDispatchApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_DISPATCH_TRANS_LIST}?search=${search}&page=${page}&limit=${limit}`);
}

function getStockReportApi(params) {
    const { warehouseId, startDate, endDate, stockFilter, search, page, limit } = params?.data
    return api.get(`${URL.GET_STOCK_REPORT}?warehouseId=${warehouseId}&startDate=${startDate}&stockFilter=${stockFilter}&endDate=${endDate}&search=${search}&page=${page}&limit=${limit}`);
}

function getRecentTransactionApi(params) {
    const { warehouseId, startDate, endDate, stockFilter, search, page, limit } = params?.data
    return api.get(`${URL.GET_RECENT_TRANSACTION}?warehouseId=${warehouseId}&startDate=${startDate}&endDate=${endDate}&stockFilter=${stockFilter}&search=${search}&page=${page}&limit=${limit}`);
}

function getLowStockApi(params) {
    const { warehouseId, stockFilter, search, page, limit } = params?.data
    return api.get(`${URL.GET_LOW_STOCK}?warehouseId=${warehouseId}&stockFilter=${stockFilter}&search=${search}&page=${page}&limit=${limit}`);
}

export {
    getDashboardApi,
    getStockinApi,
    getDispatchApi,
    getStockReportApi,
    getRecentTransactionApi,
    getLowStockApi,
};

