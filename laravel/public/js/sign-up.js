document.addEventListener('viewLoaded', function () {
    const signUpModalElement = document.querySelector('#sign-up-modal'),
        signUpModal = bootstrap.Modal.getOrCreateInstance(signUpModalElement, {'backdrop': 'static', 'keyboard': false}),
        signInModalElementExists = document.querySelectorAll('#sign-in-modal').length === 1,
        signInModalElement = document.querySelector('#sign-in-modal'),
        signInModal = (function () {
            if (signInModalElementExists) {
                return bootstrap.Modal.getOrCreateInstance(signInModalElement, {'backdrop': 'static', 'keyboard': false});
            }

            return null;
        })(),
        signUpFormElement = signUpModalElement.querySelector('form'),
        signInEmailElement = document.querySelector('#sign-in-modal form [name=email]'),
        signInPasswordElement = document.querySelector('#sign-in-modal form [name=password]'),
        iAmRegisteredElement = signUpFormElement.querySelector('#i-am-registered'),
        signUpCloseButtonElement = signUpModalElement.querySelector('button.btn-close'),
        signUpFirstNameElement = signUpFormElement.querySelector('[name=first_name]'),
        signUpEmailElement = signUpFormElement.querySelector('[name=email]'),
        signUpPasswordElement = signUpFormElement.querySelector('[name=password]'),
        signUpPhoneElement = signUpFormElement.querySelector('[name=phone]'),
        signUpButtonElement = signUpFormElement.querySelector('button'),
        signUpButtonIcon = new ButtonIcon(signUpButtonElement),
        signUpFormValidator = new Validator(signUpFormElement, {
            'validators': {
                'first_name': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {
                                'valid': false,
                                'message': 'Поле є обов’язковим.'
                            };
                        }

                        if (value.length > 255) {
                            return {
                                'valid': false,
                                'message': 'Поле не має перевищувати 255 символів.'
                            }
                        }

                        if (
                            (new RegExp(/^[АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯA-Z'’\-]+$/, 'i').test(value))
                        ) {
                            return {'valid': true};
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має містити літери українського та латинського алфавітів та символи \'’-.'
                        };
                    }
                },
                'last_name': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {'valid': true};
                        }

                        if (value.length > 255) {
                            return {
                                'valid': false,
                                'message': 'Поле не має перевищувати 255 символів.'
                            }
                        }

                        if (
                            (new RegExp(/^[АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯA-Z'’\-]+$/, 'i').test(value))
                        ) {
                            return {'valid': true};
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має містити літери українського та латинського алфавітів та символи \'’-.'
                        };
                    }
                },
                'phone': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {'valid': true};
                        }

                        if (value.length > 255) {
                            return {
                                'valid': false,
                                'message': 'Поле не має перевищувати 255 символів.'
                            }
                        }

                        if (
                            (new RegExp(/^(\+380)[0-9]{9}$/).test(value))
                        ) {
                            return {'valid': true};
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має бути дійсним номером телефону.'
                        };
                    }
                },
                'email': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {
                                'valid': false,
                                'message': 'Поле є обов’язковим.'
                            };
                        }

                        if (
                            (new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value))
                        ) {
                            return {'valid': true};
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має бути дійсною електронною адресою.'
                        };
                    }
                },
                'address': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {'valid': true};
                        }

                        if (value.length > 255) {
                            return {
                                'valid': false,
                                'message': 'Поле не має перевищувати 255 символів.'
                            }
                        }

                        if (
                            (new RegExp(/^[АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯA-Z'’\-,\s]+$/, 'i').test(value))
                        ) {
                            return {'valid': true};
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має містити цифри, літери українського та латинського алфавітів та символи \'’-,.'
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
                },
                'confirmation_password': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {
                                'valid': false,
                                'message': 'Поле є обов’язковим.'
                            };
                        }

                        if (value !== signUpPasswordElement.value.toString()) {
                            return {
                                'valid': false,
                                'message': 'Паролі не збігаються.'
                            }
                        }

                        return {'valid': true};
                    }
                }
            }
        }),
        hideSignUpModalOnHidePreventedEvent = function (event) {
            signUpModal.hide();
        },
        preventDefaultIAmRegisteredElementClickEvent = function (event) {
            event.preventDefault();
        },
        defaultIAmRegisteredElementClickEvent = function (event) {
            event.preventDefault();

            signUpModal.hide();
            signInModal.show();
        },
        setSignUpFormInProgressState = function () {
            signUpModalElement.removeEventListener('hidePrevented.bs.modal', hideSignUpModalOnHidePreventedEvent);

            signUpFormValidator.getElements().forEach(function (element) {
                element.readOnly = true;
            });

            if (signInModalElementExists) {
                iAmRegisteredElement.removeEventListener('click', defaultIAmRegisteredElementClickEvent);
                iAmRegisteredElement.addEventListener('click', preventDefaultIAmRegisteredElementClickEvent);
            }

            signUpCloseButtonElement.disabled = true;
            signUpButtonIcon.showLoading();
        },
        setSignUpFormDefaultState = function () {
            signUpButtonIcon.showDefault();
            signUpCloseButtonElement.disabled = false;

            if (signInModalElementExists) {
                iAmRegisteredElement.removeEventListener('click', preventDefaultIAmRegisteredElementClickEvent);
                iAmRegisteredElement.addEventListener('click', defaultIAmRegisteredElementClickEvent);
            }

            signUpFormValidator.getElements().forEach(function (element) {
                element.readOnly = false;
            });

            signUpModalElement.addEventListener('hidePrevented.bs.modal', hideSignUpModalOnHidePreventedEvent);
        },
        submitSignUpForm = function () {
            const signUpFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            signUpFormXMLHttpRequest.responseType = 'json';
            signUpFormXMLHttpRequest.timeout = 30000;

            signUpFormXMLHttpRequest.open('POST', '/sign-up');

            setXMLHttpRequestHeaders(signUpFormXMLHttpRequest, headers);

            signUpFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                setSignUpFormInProgressState();
            });

            signUpFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            signUpFormXMLHttpRequest.addEventListener('abort', function (event) {
                setSignUpFormDefaultState();
            });

            signUpFormXMLHttpRequest.addEventListener('error', function (event) {
                setSignUpFormDefaultState();
            });

            signUpFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            signUpFormXMLHttpRequest.addEventListener('timeout', function (event) {
                signUpFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                setSignUpFormDefaultState();
            });

            signUpFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (signUpFormXMLHttpRequest.readyState === signUpFormXMLHttpRequest.DONE) {
                    if (signUpFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                        signUpButtonIcon.showSuccess();

                        if (signInModalElementExists) {
                            const signUpEmailElementValue = signUpEmailElement.value;

                            signInModalElement.addEventListener('shown.bs.modal', function (event) {
                                signInEmailElement.value = signUpEmailElementValue;
                                signInEmailElement.readOnly = true;
                                signInPasswordElement.focus();
                            }, {once: true});

                            signInModalElement.addEventListener('hidden.bs.modal', function (event) {
                                signInEmailElement.value = '';
                                signInEmailElement.readOnly = false;
                            }, {once: true});

                            signUpModalElement.addEventListener('hidden.bs.modal', function (event) {
                                iAmRegisteredElement.click();
                            }, {once: true});
                        }

                        signUpModalElement.addEventListener('hide.bs.modal', function (event) {
                            setSignUpFormDefaultState();
                        }, {once: true});

                        signUpModal.hide();
                    } else if (signUpFormXMLHttpRequest.status === HTTP_RESPONSE_VALIDATION_ERROR) {
                        setSignUpFormDefaultState();

                        signUpFormValidator.setErrors(signUpFormXMLHttpRequest.response.errors);
                        signUpFormValidator.setFocusOnFirstInvalidField();
                    } else if (
                        signUpFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                        || signUpFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                    ) {
                        signUpModalElement.addEventListener('hide.bs.modal', function (event) {
                            setSignUpFormDefaultState();
                        }, {once: true});

                        signUpModalElement.addEventListener('hidden.bs.modal', function (event) {
                            view.get();
                        }, {once: true});

                        alert.warning(signUpFormXMLHttpRequest.response.message);

                        signUpModal.hide();
                    } else {
                        setSignUpFormDefaultState();

                        alert.danger(
                            typeof signUpFormXMLHttpRequest.response.message === 'string'
                                ? signUpFormXMLHttpRequest.response.message
                                : 'Помилка!'
                        );
                    }
                }
            });

            signUpFormXMLHttpRequest.send(new FormData(signUpFormElement));
        },
        clickSignUpButtonElementEvent = function (event) {
            event.preventDefault();

            if (signUpFormValidator.isValidForm()) {
                submitSignUpForm();
            } else {
                signUpFormValidator.setFocusOnFirstInvalidField();
            }
        },
        signUpPhoneElementFocusEvent = function (event) {
            if (signUpPhoneElement.value.toString() === '') {
                signUpPhoneElement.value = '+380';
            }
        },
        signUpPhoneElementBlurEvent = function (event) {
            if (signUpPhoneElement.value.toString() === '+380') {
                signUpPhoneElement.value = '';

                signUpFormValidator.clearFieldValidation(signUpPhoneElement.getAttribute('name'));
            }
        };

    signUpModalElement.addEventListener('hidePrevented.bs.modal', hideSignUpModalOnHidePreventedEvent);

    if (signInModalElementExists) {
        iAmRegisteredElement.addEventListener('click', defaultIAmRegisteredElementClickEvent);
    } else {
        iAmRegisteredElement.closest('div.row').remove();
    }

    signUpButtonElement.addEventListener('click', clickSignUpButtonElementEvent);

    signUpModalElement.addEventListener('shown.bs.modal', function (event) {
        signUpFirstNameElement.focus();
    });

    signUpModalElement.addEventListener('hidden.bs.modal', function (event) {
        signUpFormValidator.getElements().forEach(function (element) {
            element.value = '';
        });

        signUpFormValidator.clearFormValidation();
    });

    signUpPhoneElement.addEventListener('focus', signUpPhoneElementFocusEvent);

    signUpPhoneElement.addEventListener('blur', signUpPhoneElementBlurEvent);

    view.addDestroyer(function () {
        if (signInModalElementExists) {
            iAmRegisteredElement.removeEventListener('click', defaultIAmRegisteredElementClickEvent);
            iAmRegisteredElement.removeEventListener('click', preventDefaultIAmRegisteredElementClickEvent);
        }

        signUpButtonElement.removeEventListener('click', clickSignUpButtonElementEvent);

        signUpPhoneElement.removeEventListener('focus', signUpPhoneElementFocusEvent);
        signUpPhoneElement.removeEventListener('blur', signUpPhoneElementBlurEvent);

        signUpFormValidator.destroy();

        signUpModal.dispose();

        signUpModalElement.remove();

        document.querySelector('script[src$=\'sign-up.js\']').remove();
    });
}, {once: true});
