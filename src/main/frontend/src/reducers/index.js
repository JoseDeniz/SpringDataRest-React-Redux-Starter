import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import validationErrors from './validationErrorsReducer';
import employees from './employeesReducer';
import * as types from '../constants/actionTypes';

const appReducer = combineReducers({
    employees,
    validationErrors,
    routing: routerReducer
});

const rootReducer = (state, action) => {
    if (action.type === types.DO_LOGOUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
