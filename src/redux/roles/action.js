//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { RoleActionTypes } from './constants';


export const getRolesListActions = (data) => ({
    type: RoleActionTypes.ROLES_LIST_FIRST,
    data
});

