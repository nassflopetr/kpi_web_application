document.addEventListener('viewLoaded', function () {
    const signOutElement = document.getElementById('sign-out'),
        submitSignOutForm = function () {
            const signOutFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            signOutFormXMLHttpRequest.responseType = 'json';
            signOutFormXMLHttpRequest.timeout = 30000;

            signOutFormXMLHttpRequest.open('POST', '/sign-out');

            setXMLHttpRequestHeaders(signOutFormXMLHttpRequest, headers);

            signOutFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                spinnerModal.show();
            });

            signOutFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            signOutFormXMLHttpRequest.addEventListener('abort', function (event) {
                //
            });

            signOutFormXMLHttpRequest.addEventListener('error', function (event) {
                //
            });

            signOutFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            signOutFormXMLHttpRequest.addEventListener('timeout', function (event) {
                signOutFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                spinnerModal.hide();
            });

            signOutFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (signOutFormXMLHttpRequest.readyState === signOutFormXMLHttpRequest.DONE) {
                    if (signOutFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                        view.get();
                    } else if (
                        signOutFormXMLHttpRequest.status === HTTP_RESPONSE_UNAUTHORIZED
                        || signOutFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                        || signOutFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                    ) {
                        alert.warning(signOutFormXMLHttpRequest.response.message);

                        view.get();
                    } else {
                        alert.danger(
                            typeof signOutFormXMLHttpRequest.response.message === 'string'
                                ? signOutFormXMLHttpRequest.response.message
                                : 'Помилка!'
                        );

                        spinnerModal.hide();
                    }
                }
            });

            signOutFormXMLHttpRequest.send();
        },
        clickSignOutElementEvent = function (event) {
            event.preventDefault();

            submitSignOutForm();
        };

    signOutElement.addEventListener('click', clickSignOutElementEvent);

    view.addDestroyer(function () {
        signOutElement.removeEventListener('click', clickSignOutElementEvent);

        document.querySelector('script[src$=\'sign-out.js\']').remove();
    });
}, {once: true});
