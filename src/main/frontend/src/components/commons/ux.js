import {isNotAuthorized} from "../../utils/security";
import * as routePaths from "../../constants/routePaths";

function getMessage(obj) {
    if (!obj) return '';

    if (!obj.message) return '';

    let msg = obj.message;
    if (obj.additionalMessage) {
        msg += '<br/>' + obj.additionalMessage;
    }
    return msg;
}

export function handleAsyncAction(promise, notifier, router) {
    if (!promise || typeof(promise.then) !== 'function') {
        throw new Error('Invalid argument, expecting a Promise but was: ' + typeof(promise));
    }
    let handler = {id: null};
    notifier.startLoad(handler);
    promise.then(
        (success) => {
            notifier.stopLoad(handler);
            let message = getMessage(success);
            if (message) {
                notifier.alert(message);
            }
        },
        (error) => {
            notifier.stopLoad(handler);
            if (!isNotAuthorized(error)) {
                let message = getMessage(error);
                if (message) {
                    notifier.alert(message);
                }
            }
            else {
                router.push(routePaths.LOGIN_ROUTE);
            }
        }
    );
}
