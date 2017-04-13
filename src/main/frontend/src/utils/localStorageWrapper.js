export default function storageWrapper() {
    const authTokenKey = 'authToken';
    return {
        setAuthToken: (token) => {
            localStorage.setItem(authTokenKey, token);
        },
        getAuthToken: () => {
            return localStorage.getItem(authTokenKey);
        },
        resetAuthToken: () => {
            localStorage.removeItem(authTokenKey);
        }
    };
}
