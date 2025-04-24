//------------------------------------R E D U C E R S-------------------------------------------------
import { ReportActionTypes } from "./constants"

const REPORT_INITIAL_STATE = {
    report: [],
    loading: false
}

const reportReducer = (state = REPORT_INITIAL_STATE, action) => {
    switch (action.type) {
        case ReportActionTypes.REPORT_LOADING:
            return {
                report: state.report,
                loading: true
            }
        case ReportActionTypes.REPORT_SUCCESS:
            return {
                report: action.payload,
                loading: false
            }
        case ReportActionTypes.REPORT_ERROR:
            return {
                report: action.payload,
                loading: false
            }
        default: return state
    }
}

export {
    reportReducer
}