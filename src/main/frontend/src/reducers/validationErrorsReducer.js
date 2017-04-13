import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';

export default function validationErrorsReducer(errors = initialState.validationErrors, action) {
    if (action.type === actionTypes.LOGIN_ERROR) {
        return Object.assign({}, errors, {loginError: action.error});
    }
    return errors;
}
