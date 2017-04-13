import * as types from '../constants/actionTypes';

export function doLogin(credentials, serverApi) {
    return serverApi.doLogin(credentials);
}

export function doLogout(){
    return {
        type: types.DO_LOGOUT
    };
}

export function loginError(error){
    return {
        type: types.LOGIN_ERROR,
        error: error
    };
}
