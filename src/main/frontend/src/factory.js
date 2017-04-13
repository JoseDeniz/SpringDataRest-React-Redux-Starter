import {LoginPage as OriginalLoginPage} from './containers/LoginPage';
import {LogoutPage as OriginalLogoutPage} from './containers/LogoutPage';
import {EmployeesPage as OriginalEmployeesPage} from './containers/EmployeesPage';
import createServerApi from './store/serverApi';
import {connect} from 'react-redux';
import * as employeeActions from './actions/employeeActions';
import * as loginActions from './actions/loginActions';
import storageWrapper from './utils/localStorageWrapper';
import notifier from './utils/notifications';

export const createEmployeesPage = (serverApi, notifier) => {
    return connect(
        (state) => ({
            employees: state.employees,
            notifier: notifier
        }),
        (dispatch) => ({
            actions: {
                loadEmployees: () => {
                    return dispatch(employeeActions.loadEmployees(serverApi));
                },
                saveEmployee: (employee) => {
                    return employeeActions.saveEmployee(employee, serverApi);
                },
            }
        })
    )(OriginalEmployeesPage);
};

export const createLoginPage = (serverApi) => {
    return connect(
        (state) => {
            return {
                errors: state.validationErrors,
            };
        },
        (dispatch) => ({
            actions: {
                doLogin: (credentials) => {
                    return loginActions.doLogin(credentials, serverApi);
                },
                loginError: (error) => {
                    return dispatch(loginActions.loginError(error));
                }
            }
        })
    )(OriginalLoginPage);
};

export const createLogoutPage = (storageWrapper) => {
    return connect(
        () => {
            return {
                storageWrapper: storageWrapper
            };
        },
        (dispatch) => ({
            actions: {
                doLogout: () => {
                    return dispatch(loginActions.doLogout());
                }
            }
        })
    )(OriginalLogoutPage);
};

export const EmployeesPage = createEmployeesPage(createServerApi(), notifier());
export const LogoutPage = createLogoutPage(storageWrapper());
export const LoginPage = createLoginPage(createServerApi());
