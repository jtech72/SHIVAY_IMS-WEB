//------------------------------------A P I-----------------------------------------------------------------
import { APICore } from '../../helpers/api/apiCore';
import * as URL from '../../helpers/api/apiEndPoint';

const api = new APICore();


function getLocationApi(params) {
    return api.get(`${URL.GET_LOCATION}`);
}

export {
    getLocationApi
};