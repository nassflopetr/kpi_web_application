document.addEventListener('viewLoaded', function () {
    const changePasswordModalElement = document.querySelector('#change-password-modal'),
        changePasswordModal = bootstrap.Modal.getOrCreateInstance(changePasswordModalElement, {
            'backdrop': 'static',
            'keyboard': false
        }),
        profileSettingsModalElementExists = document.querySelectorAll('#profile-settings-modal').length === 1
            && document.querySelectorAll('#profile-settings').length === 1,
        profileSettingsElement = (function () {
            if (profileSettingsModalElementExists) {
                return document.getElementById('profile-settings');
            }

            return null;
        })(),
        changePasswordFormElement = changePasswordModalElement.querySelector('form'),
        changePasswordPasswordElement = changePasswordFormElement.querySelector('[name=password]'),
        changePasswordNewPasswordElement = changePasswordFormElement.querySelector('[name=new_password]'),
        iWantToChangeMyProfileSettingsElement = changePasswordFormElement.querySelector('#i-want-to-change-my-profile-settings'),
        changePasswordCloseButtonElement = changePasswordModalElement.querySelector('button.btn-close'),
        changePasswordButtonElement = changePasswordFormElement.querySelector('button'),
        changePasswordButtonIcon = new ButtonIcon(changePasswordButtonElement),
        changePasswordFormValidator = new Validator(changePasswordFormElement, {
            'validators': {
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
                'new_password': {
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
                'confirmation_new_password': {
                    'callback': function (element) {
                        const value = element.value.toString();

                        if (value === '') {
                            return {
                                'valid': false,
                                'message': 'Поле є обов’язковим.'
                            };
                        }

                        if (value !== changePasswordNewPasswordElement.value.toString()) {
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
        hideChangePasswordModalOnHidePreventedEvent = function (event) {
            changePasswordModal.hide();
        },
        preventDefaultIWantToChangeMyProfileElementClickEvent = function (event) {
            event.preventDefault();
        },
        defaultIWantToChangeMyProfileElementClickEvent = function (event) {
            event.preventDefault();

            changePasswordModalElement.addEventListener('hidden.bs.modal', function (event) {
                profileSettingsElement.click();
            }, {once: true});

            changePasswordModal.hide();
        },
        setChangePasswordFormInProgressState = function () {
            changePasswordModalElement.removeEventListener('hidePrevented.bs.modal', hideChangePasswordModalOnHidePreventedEvent);

            changePasswordFormValidator.getElements().forEach(function (element) {
                element.readOnly = true;
            });

            if (profileSettingsModalElementExists) {
                iWantToChangeMyProfileSettingsElement.removeEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
                iWantToChangeMyProfileSettingsElement.addEventListener('click', preventDefaultIWantToChangeMyProfileElementClickEvent);
            }

            changePasswordCloseButtonElement.disabled = true;
            changePasswordButtonIcon.showLoading();
        },
        setChangePasswordFormDefaultState = function () {
            changePasswordButtonIcon.showDefault();
            changePasswordCloseButtonElement.disabled = false;

            if (profileSettingsModalElementExists) {
                iWantToChangeMyProfileSettingsElement.removeEventListener('click', preventDefaultIWantToChangeMyProfileElementClickEvent);
                iWantToChangeMyProfileSettingsElement.addEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
            }

            changePasswordFormValidator.getElements().forEach(function (element) {
                element.readOnly = false;
            });

            changePasswordModalElement.addEventListener('hidePrevented.bs.modal', hideChangePasswordModalOnHidePreventedEvent);
        },
        submitChangePasswordForm = function () {
            const changePasswordFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            changePasswordFormXMLHttpRequest.responseType = 'json';
            changePasswordFormXMLHttpRequest.timeout = 30000;

            changePasswordFormXMLHttpRequest.open('POST', '/change-password');

            setXMLHttpRequestHeaders(changePasswordFormXMLHttpRequest, headers);

            changePasswordFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                setChangePasswordFormInProgressState();
            });

            changePasswordFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            changePasswordFormXMLHttpRequest.addEventListener('abort', function (event) {
                setChangePasswordFormDefaultState();
            });

            changePasswordFormXMLHttpRequest.addEventListener('error', function (event) {
                setChangePasswordFormDefaultState();
            });

            changePasswordFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            changePasswordFormXMLHttpRequest.addEventListener('timeout', function (event) {
                changePasswordFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                setChangePasswordFormDefaultState();
            });

            changePasswordFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (changePasswordFormXMLHttpRequest.readyState === changePasswordFormXMLHttpRequest.DONE) {
                    if (changePasswordFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                        changePasswordButtonIcon.showSuccess();

                        alert.success(changePasswordFormXMLHttpRequest.response.message);

                        changePasswordModalElement.addEventListener('hidden.bs.modal', function (event) {
                            setChangePasswordFormDefaultState();

                            view.get();
                        }, {once: true});

                        document.addEventListener('viewBuilded', function (event) {
                            if (document.querySelectorAll('#sign-in').length === 1) {
                                document.getElementById('sign-in').click();
                            }
                        }, {once: true});

                        changePasswordModal.hide();
                    } else if (changePasswordFormXMLHttpRequest.status === HTTP_RESPONSE_VALIDATION_ERROR) {
                        setChangePasswordFormDefaultState();

                        changePasswordFormValidator.setErrors(changePasswordFormXMLHttpRequest.response.errors);
                        changePasswordFormValidator.setFocusOnFirstInvalidField();
                    } else if (
                        changePasswordFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                        || changePasswordFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                        || changePasswordFormXMLHttpRequest.status === HTTP_RESPONSE_UNAUTHORIZED
                    ) {
                        setChangePasswordFormDefaultState();

                        alert.warning(changePasswordFormXMLHttpRequest.response.message);

                        changePasswordModalElement.addEventListener('hidden.bs.modal', function (event) {
                            setChangePasswordFormDefaultState();

                            view.get();
                        }, {once: true});

                        changePasswordModal.hide();
                    } else {
                        setChangePasswordFormDefaultState();

                        alert.danger(
                            typeof changePasswordFormXMLHttpRequest.response.message === 'string'
                                ? changePasswordFormXMLHttpRequest.response.message
                                : 'Помилка!'
                        );
                    }
                }
            });

            changePasswordFormXMLHttpRequest.send(new FormData(changePasswordFormElement));
        },
        clickChangePasswordButtonElementEvent = function (event) {
            event.preventDefault();

            if (changePasswordFormValidator.isValidForm()) {
                submitChangePasswordForm();
            } else {
                changePasswordFormValidator.setFocusOnFirstInvalidField();
            }
        };

    changePasswordModalElement.addEventListener('hidePrevented.bs.modal', hideChangePasswordModalOnHidePreventedEvent);

    if (profileSettingsModalElementExists) {
        iWantToChangeMyProfileSettingsElement.addEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
    } else {
        iWantToChangeMyProfileSettingsElement.closest('div.row').remove();
    }

    changePasswordButtonElement.addEventListener('click', clickChangePasswordButtonElementEvent);

    changePasswordModalElement.addEventListener('shown.bs.modal', function (event) {
        changePasswordPasswordElement.focus();
    });

    changePasswordModalElement.addEventListener('hidden.bs.modal', function (event) {
        changePasswordFormValidator.getElements().forEach(function (element) {
            element.value = '';
        });

        changePasswordFormValidator.clearFormValidation();
    });

    view.addDestroyer(function () {
        if (profileSettingsModalElementExists) {
            iWantToChangeMyProfileSettingsElement.removeEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
            iWantToChangeMyProfileSettingsElement.removeEventListener('click', preventDefaultIWantToChangeMyProfileElementClickEvent);
        }

        changePasswordButtonElement.removeEventListener('click', clickChangePasswordButtonElementEvent);

        changePasswordFormValidator.destroy();

        changePasswordModal.dispose();

        changePasswordModalElement.remove();

        document.querySelector('script[src$=\'change-password.js\']').remove();
    });
}, {once: true});
