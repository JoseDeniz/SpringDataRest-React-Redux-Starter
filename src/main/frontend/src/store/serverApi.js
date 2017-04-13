import 'whatwg-fetch';
import storageWrapper from '../utils/localStorageWrapper';
import * as apiRoutes from '../constants/apiRoutes';
import * as security from '../utils/security';

export function mockServerApi() {
    let stubEmployees;
    return {
        stubEmployees: (stub) => {
            stubEmployees = stub;
        },
        loadEmployees: () => {
            return Promise.resolve(stubEmployees);
        }
    };
}

export default function serverApi(storage = storageWrapper()) {
    function doGet(url) {
        return doRequest('GET', url);
    }

    function doPost(url, content) {
        return doRequest('POST', url, content);
    }

    function parseStatusCode(response) {
        let successStatusCodes = [200, 203];

        if (successStatusCodes.includes(response.status)) {
            return Promise.resolve(response);
        } else {
            let error = security.generateServerError(response);
            security.handleUnauthorizedResponse(response, storage);
            return Promise.reject(error);
        }
    }

    function parseJsonResponse(response) {
        try {
            return Promise.resolve(response.json());
        } catch (exception) {
            let message = 'Are you sure you are running the backend?';
            /* eslint-disable */
            console.error(message);
            /* eslint-enable */
            return Promise.reject({message});
        }
    }

    function doRequest(method, url, content = undefined) {
        return fetch(url, {
            method: method,
            headers: headers(),
            body: JSON.stringify(content)
        })
            .catch((error) => {
                return Promise.reject({message: 'Network problem:' + error.toString()});
            })
            .then(parseStatusCode)
            .then(parseJsonResponse);
    }

    function headers() {
        let token = storage.getAuthToken();
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }

    return {
        doLogin: (credentials) => {
            let url = `${window.oauthUrl}&username=${credentials.user}&password=${credentials.password}`;

            return doGet(url).then((response) => {
                security.handleSuccessfulResponse(response, storage);
                return Promise.resolve(response);
            }, (error) => {
                let message = 'Invalid Credentials';
                if (security.isInvalidLogin(error)) {
                    return Promise.reject({message});
                }
                return Promise.reject(error);
            });
        },
        loadEmployees: () => {
            return doGet(apiRoutes.LOAD_EMPLOYEES);
        },
        saveEmployee: (employee) => {
            return doPost(apiRoutes.SAVE_EMPLOYEE, employee);
        }
    };
}
