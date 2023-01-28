document.addEventListener('viewLoaded', function () {
    const signInModalElement = document.querySelector('#sign-in-modal'),
        signUpModalElementExists = document.querySelectorAll('#sign-up-modal').length === 1,
        signUpModalElement = document.querySelector('#sign-up-modal'),
        signInModal = new bootstrap.Modal(signInModalElement, {'backdrop': 'static', 'keyboard': false}),
        signUpModal = (function () {
            if (signUpModalElementExists) {
                return bootstrap.Modal.getOrCreateInstance(
                    signUpModalElement,
                    {'backdrop': 'static', 'keyboard': false}
                );
            }

            return null;
        })(),
        signInFormElement = signInModalElement.querySelector('form'),
        signInEmailElement = signInFormElement.querySelector('[name=email]'),
        iAmNotRegisteredElement = signInFormElement.querySelector('#i-am-not-registered'),
        signInButtonElement = signInFormElement.querySelector('button'),
        signInCloseButtonElement = signInModalElement.querySelector('button.btn-close'),
        signInButtonIcon = new ButtonIcon(signInButtonElement),
        signInFormValidator = new Validator(signInFormElement, {
            'validators': {
                'email': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {
                                'valid': false,
                                'message': 'Поле є обов’язковим.'
                            };
                        }

                        if ((new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value))) {
                            return {'valid': true};
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має бути дійсною електронною адресою.'
                        };
                    }
                },
                'password': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {
                                'valid': false,
                                'message': 'Поле є обов’язковим.'
                            };
                        }

                        if (value.length < 8) {
                            return {
                                'valid': false,
                                'message': 'Поле має містити принаймні 8 символів.'
                            }
                        }

                        if (value.length > 30) {
                            return {
                                'valid': false,
                                'message': 'Поле не має перевищувати 30 символів.'
                            }
                        }

                        if ((new RegExp(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*;_])[a-zA-Z0-9!@#$%^&*;_]{8,30}$/)).test(value)) {
                            return {'valid': true};
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має містити принаймні одну велику та малу літери, одну цифру та символ.'
                        }
                    }
                }
            }
        }),
        signInElement = document.getElementById('sign-in'),
        hideSignInModalOnHidePreventedEvent = function (event) {
            signInModal.hide();
        },
        preventDefaultIAmNotRegisteredElementClickEvent = function (event) {
            event.preventDefault();
        },
        defaultIAmNotRegisteredElementClickEvent = function (event) {
            event.preventDefault();

            signInModal.hide();
            signUpModal.show();
        },
        setSignInFormInProgressState = function () {
            signInModalElement.removeEventListener('hidePrevented.bs.modal', hideSignInModalOnHidePreventedEvent);

            signInFormValidator.getElements().forEach(function (element) {
                element.readOnly = true;
            });

            if (signUpModalElementExists) {
                iAmNotRegisteredElement.removeEventListener('click', defaultIAmNotRegisteredElementClickEvent);
                iAmNotRegisteredElement.addEventListener('click', preventDefaultIAmNotRegisteredElementClickEvent);
            }

            signInCloseButtonElement.disabled = true;
            signInButtonIcon.showLoading();
        },
        setSignInFormDefaultState = function () {
            signInButtonIcon.showDefault();
            signInCloseButtonElement.disabled = false;

            if (signUpModalElementExists) {
                iAmNotRegisteredElement.removeEventListener('click', preventDefaultIAmNotRegisteredElementClickEvent);
                iAmNotRegisteredElement.addEventListener('click', defaultIAmNotRegisteredElementClickEvent);
            }

            signInFormValidator.getElements().forEach(function (element) {
                element.readOnly = false;
            });

            signInModalElement.addEventListener('hidePrevented.bs.modal', hideSignInModalOnHidePreventedEvent);
        },
        submitSignInForm = function () {
            const signInFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            signInFormXMLHttpRequest.responseType = 'json';
            signInFormXMLHttpRequest.timeout = 30000;

            signInFormXMLHttpRequest.open('POST', '/sign-in');

            setXMLHttpRequestHeaders(signInFormXMLHttpRequest, headers);

            signInFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                setSignInFormInProgressState();
            });

            signInFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            signInFormXMLHttpRequest.addEventListener('abort', function (event) {
                setSignInFormDefaultState();
            });

            signInFormXMLHttpRequest.addEventListener('error', function (event) {
                setSignInFormDefaultState();
            });

            signInFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            signInFormXMLHttpRequest.addEventListener('timeout', function (event) {
                signInFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                setSignInFormDefaultState();
            });

            signInFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (signInFormXMLHttpRequest.readyState === signInFormXMLHttpRequest.DONE) {
                    if (signInFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                        signInButtonIcon.showSuccess();

                        signInModalElement.addEventListener('hide.bs.modal', function (event) {
                            setSignInFormDefaultState();
                        }, {once: true});

                        signInModalElement.addEventListener('hidden.bs.modal', function (event) {
                            view.get();
                        }, {once: true});

                        signInModal.hide();
                    } else if (signInFormXMLHttpRequest.status === HTTP_RESPONSE_VALIDATION_ERROR) {
                        setSignInFormDefaultState();

                        signInFormValidator.setErrors(signInFormXMLHttpRequest.response.errors);
                        signInFormValidator.setFocusOnFirstInvalidField();
                    } else if (
                        signInFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                        || signInFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                    ) {
                        signInModalElement.addEventListener('hide.bs.modal', function (event) {
                            setSignInFormDefaultState();
                        }, {once: true});

                        signInModalElement.addEventListener('hidden.bs.modal', function (event) {
                            view.get();
                        }, {once: true});

                        alert.warning(signInFormXMLHttpRequest.response.message);

                        signInModal.hide();
                    } else {
                        setSignInFormDefaultState();

                        alert.danger(
                            typeof signInFormXMLHttpRequest.response.message === 'string'
                                ? signInFormXMLHttpRequest.response.message
                                : 'Помилка!'
                        );
                    }
                }
            });

            signInFormXMLHttpRequest.send(new FormData(signInFormElement));
        },
        clickSignInButtonElementEvent = function (event) {
            event.preventDefault();

            if (signInFormValidator.isValidForm()) {
                submitSignInForm();
            } else {
                signInFormValidator.setFocusOnFirstInvalidField();
            }
        },
        clickSignInElementEvent = function (event) {
            event.preventDefault();

            signInModal.show();
        };

    signInButtonElement.addEventListener('click', clickSignInButtonElementEvent);

    signInModalElement.addEventListener('shown.bs.modal', function (event) {
        signInEmailElement.focus();
    });

    signInModalElement.addEventListener('hidden.bs.modal', function (event) {
        signInFormValidator.getElements().forEach(function (element) {
            element.value = '';
        });

        signInFormValidator.clearFormValidation();
    });

    signInModalElement.addEventListener('hidePrevented.bs.modal', hideSignInModalOnHidePreventedEvent);

    if (signUpModalElementExists) {
        iAmNotRegisteredElement.addEventListener('click', defaultIAmNotRegisteredElementClickEvent);
    } else {
        iAmNotRegisteredElement.closest('div.row').remove();
    }

    signInElement.addEventListener('click', clickSignInElementEvent);

    view.addDestroyer(function () {
        if (signUpModalElementExists) {
            iAmNotRegisteredElement.removeEventListener('click', defaultIAmNotRegisteredElementClickEvent);
            iAmNotRegisteredElement.removeEventListener('click', preventDefaultIAmNotRegisteredElementClickEvent);
        }

        signInButtonElement.removeEventListener('click', clickSignInButtonElementEvent);

        signInElement.removeEventListener('click', clickSignInElementEvent);

        signInFormValidator.destroy();

        signInModal.dispose();

        signInModalElement.remove();

        document.querySelector('script[src$=\'sign-in.js\']').remove();
    });
}, {once: true});
