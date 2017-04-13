import vex from 'vex-js';

/*
 vex-js wrapper
 */
export default function notifier(showAlert, doClose){
    let currentPopup = null;
    let isLoading = false;
    let loadingPopup = null;
    let tooSlowLoading = 1000; //milliseconds
    const LoadingPleaseWait = 'Loading...';
    const CloseButtonText = 'OK';
    const VexCloseClass = 'vex-close';
    const CloseHandler = `document.getElementsByClassName('${VexCloseClass}')[0].click();`;
    vex.defaultOptions.contentClassName = 'vex-custom-content';

    function setLoadWaitingTime(ms){
        tooSlowLoading = ms;
    }

    function dialogWithCloseButton(text) {
        let dialogMarkup = `<div class="dialog-content">${text} 
                                <div class="dialog-ok-button">
                                   <input type="submit" 
                                           value="${CloseButtonText}"
                                           onclick="${CloseHandler}"/>
                                </div>
                            </div>`;
        return dialogMarkup;
    }

    function dialogWithSpinner(text) {
        let dialogMarkup = `<div class="dialog-content">${text} 
                                <div class="dialog-spinner">
                                   
                                </div>
                            </div>`;
        return dialogMarkup;
    }

    function alert(text){
        let dialogMarkup = dialogWithCloseButton(text);
        return alertWith({
            unsafeContent: dialogMarkup,
            showCloseButton: true});
    }
    function alertWithSpinner(text){
        let dialogMarkup = dialogWithSpinner(text);
        return alertWith({
            unsafeContent: dialogMarkup,
            showCloseButton: true});
    }
    function alertWith(options){
        showAlert = showAlert || vex.open;
        currentPopup = showAlert(options);
        return currentPopup;
    }
    function close(popUp = currentPopup){
        doClose = doClose || vex.close;
        if (popUp) {
            doClose(popUp);
        }
        if (popUp === loadingPopup){
            loadingPopup = null;
        }
        if (popUp === currentPopup){
            currentPopup = null;
        }
    }
    function startLoad(dialogHandler = null) {
        if (isLoading) return;

        isLoading = true;
        if (tooSlowLoading > 0) {
            setTimeout(() => {
                showLoadingAlert(dialogHandler);
            }, tooSlowLoading);
        }
        else{
            showLoadingAlert(dialogHandler);
        }
    }
    function showLoadingAlert(dialogHandler) {
        if (isLoading) {
            alertWithSpinner(LoadingPleaseWait);
            loadingPopup = currentPopup;
            if (dialogHandler !== null) {
                dialogHandler.id = loadingPopup.id;
            }
        }
    }
    function stopLoad(handler = null){
        if (!handler || !handler.id){
            handler = loadingPopup;
        }
        isLoading = false;
        close(handler);
    }

    return {
        alert,
        close,
        startLoad,
        stopLoad,
        setLoadWaitingTime
    };
}
