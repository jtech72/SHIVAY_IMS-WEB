//------------------------------------R E D U C E R S-------------------------------------------------
import { RoleActionTypes } from "./constants"

const ROLES_LIST_INITIAL_STATE = {
    rolesList: [],
    loading: false
}

const rolesListReducer = (state = ROLES_LIST_INITIAL_STATE, action) => {
    switch (action.type) {
        case RoleActionTypes.ROLES_LIST_LOADING:
            return {
                rolesList: state.rolesList,
                loading: true
            }
        case RoleActionTypes.ROLES_LIST_SUCCESS:
            return {
                rolesList: action.payload,
                loading: false
            }
        case RoleActionTypes.ROLES_LIST_ERROR:
            return {
                rolesList: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    rolesListReducer
}