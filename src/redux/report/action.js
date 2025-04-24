//------------------------------------A C T I O N S----------------------------------------------------
// @flow
import { ReportActionTypes } from './constants';


export const getReportActions = (data) => ({
    type: ReportActionTypes.REPORT_FIRST,
    data
});

