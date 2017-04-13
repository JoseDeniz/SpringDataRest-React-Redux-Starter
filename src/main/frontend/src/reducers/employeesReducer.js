import * as actionTypes from '../constants/actionTypes';
import initialState from './initialState';

export default function employeesReducer(employees = initialState.employees, action) {
    if (action.type === actionTypes.LOAD_EMPLOYEES) {
        return [...action.employees];
    }
    return employees;
}
