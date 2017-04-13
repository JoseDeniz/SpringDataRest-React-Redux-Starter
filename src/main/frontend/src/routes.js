import React from 'react';
import {IndexRoute, Route} from 'react-router';
import App from './components/App';
import Authenticated from './components/commons/Authenticated';
import NotFoundPage from './components/NotFoundPage';
import * as routePaths from './constants/routePaths';
import {EmployeesPage, LoginPage, LogoutPage} from './factory'; // eslint-disable-line import/no-named-as-default

export default (
    <Route path={routePaths.INDEX_ROUTE} component={App}>
        <IndexRoute component={LoginPage}/>
        <Route path={routePaths.LOGIN_ROUTE} component={LoginPage}/>
        <Route component={Authenticated}>
            <Route path={routePaths.EMPLOYEES_ROUTE} component={EmployeesPage}/>
        </Route>
        <Route path={routePaths.LOGOUT_ROUTE}  component={LogoutPage}/>
        <Route path="/*" component={NotFoundPage}/>
    </Route>
);
