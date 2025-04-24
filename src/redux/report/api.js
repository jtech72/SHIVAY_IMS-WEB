//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getReportApi(params) {
    const { search, page, limit, type , stockFilter, warehouseId } = params?.data
    return api.get(`${URL.GET_REPORT}?search=${search}&page=${page}&limit=${limit}&type=${type}&stockFilter=${stockFilter}&warehouseId=${warehouseId}`);
}

export {
    getReportApi
};