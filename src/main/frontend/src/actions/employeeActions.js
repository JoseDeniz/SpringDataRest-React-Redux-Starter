import * as types from '../constants/actionTypes';

export function loadEmployees(serverApi) {
    return (dispatch) => {
        return serverApi.loadEmployees().then((json) => {
            return dispatch({
                type: types.LOAD_EMPLOYEES,
                employees: json._embedded.employees
            });
        });
    };
}

export function saveEmployee(employee, serverApi) {
    return serverApi.saveEmployee(employee).then((json) => {
        return json;
    });
}
