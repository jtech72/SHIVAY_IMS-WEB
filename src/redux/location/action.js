//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { LocationActionTypes } from './constants';


export const getLocationActions = (data) => ({
    type: LocationActionTypes.LOCATION_FIRST,
    data
});

