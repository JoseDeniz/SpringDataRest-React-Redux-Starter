const unauthorizedCode = '401';

export function isNotAuthorized(error){
    if (!error || !(typeof (error.toString) === 'function')) return false;
    return error.toString().toLowerCase().indexOf(unauthorizedCode) >= 0;
}

export function handleUnauthorizedResponse(response, storage) {
    if (response.status === unauthorizedCode) {
        storage.resetAuthToken();
    }
}

export function handleSuccessfulResponse(response, storage) {
    if (response.access_token) {
        storage.setAuthToken(response.access_token);
    }
}

export function generateServerError(response) {
    return new Error(response.statusText + '(' + response.status + ')');
}

export function isInvalidLogin(error) {
    return error && error.toString().indexOf('400') >= 0;
}
