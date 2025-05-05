//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getNotificationApi(params) {
    const { userId, limit, page } = params?.data
    return api.get(`${URL.GET_NOTIFICATION}?userId=${userId}&limit=${limit}&page=${page}`);
}

// function createNotificationApi(params: any): any {
//     const { data } = params;
//     return api.create(URL.CREATE_NOTIFICATION, data);
// }
// function updateNotificationApi(params: any): any {
//     const { data } = params;
//     return api.update(URL.UPDATE_NOTIFICATION, data);
// }

export { getNotificationApi };