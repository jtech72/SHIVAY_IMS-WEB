//------------------------------------R E D U C E R S-------------------------------------------------
import { LocationActionTypes } from "./constants"

const LOCATION_INITIAL_STATE = {
    location: [],
    loading: false
}

const locationReducer = (state = LOCATION_INITIAL_STATE, action) => {
    switch (action.type) {
        case LocationActionTypes.LOCATION_LOADING:
            return {
                location: state.location,
                loading: true
            }
        case LocationActionTypes.LOCATION_SUCCESS:
            return {
                location: action.payload,
                loading: false
            }
        case LocationActionTypes.LOCATION_ERROR:
            return {
                location: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    locationReducer
}