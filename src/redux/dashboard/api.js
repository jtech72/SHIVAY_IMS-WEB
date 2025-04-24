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

export {
    getDashboardApi, getStockinApi, getDispatchApi,
};

