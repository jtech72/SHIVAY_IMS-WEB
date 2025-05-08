//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getProductListApi(params) {
    const { search, page, limit } = params?.data
    return api.get(`${URL.GET_PRODUCT_LIST}?search=${search}&page=${page}&limit=${limit}`);
}

function createProductApi(params) {
    const { data } = params
    return api.create(URL.CREATE_PRODUCT, data);
}

function updateProductApi(params) {
    const { data } = params
    return api.update(URL.UPDATE_PRODUCT, data);
}

function deleteProductApi(params) {
    const { data } = params
    return api.create(URL.DELETE_PRODUCT, data);
}

function searchProductApi(params) {
    const { data } = params
    return api.create(URL.SEARCH_PRODUCT, data);
}

function viewProductApi(params) {
    const { productId, page, limit, startDate, endDate, warehouseId } = params?.data
    return api.get(`${URL.VIEW_PRODUCT}?productId=${productId}&page=${page}&limit=${limit}&warehouseId=${warehouseId}&startDate=${startDate}&endDate=${endDate}`);
}

export {
    getProductListApi,
    createProductApi,
    updateProductApi,
    deleteProductApi,
    searchProductApi,
    viewProductApi,
};