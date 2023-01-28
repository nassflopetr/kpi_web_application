document.addEventListener('viewLoaded', function () {
    const profileSettingsModalElement = document.querySelector('#profile-settings-modal'),
        profileSettingsModal = bootstrap.Modal.getOrCreateInstance(profileSettingsModalElement, {
            'backdrop': 'static',
            'keyboard': false
        }),
        changePasswordModalElementExists = document.querySelectorAll('#change-password-modal').length === 1,
        changePasswordModal = (function () {
            if (changePasswordModalElementExists) {
                return bootstrap.Modal.getOrCreateInstance(
                    document.querySelector('#change-password-modal'), {'backdrop': 'static', 'keyboard': false}
                );
            }

            return null;
        })(),
        profileSettingsFormElement = profileSettingsModalElement.querySelector('form'),
        iWantToChangeMyPasswordElement = profileSettingsFormElement.querySelector('#i-want-to-change-my-password'),
        profileSettingsCloseButtonElement = profileSettingsModalElement.querySelector('button.btn-close'),
        profileSettingsFirstNameElement = profileSettingsFormElement.querySelector('[name=first_name]'),
        profileSettingsPhoneElement = profileSettingsFormElement.querySelector('[name=phone]'),
        profileSettingsButtonElement = profileSettingsFormElement.querySelector('button'),
        profileSettingsButtonIcon = new ButtonIcon(profileSettingsButtonElement),
        profileSettingsFormValidator = new Validator(profileSettingsFormElement, {
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
                }
            }
        }),
        profileSettingsElement = document.getElementById('profile-settings'),
        hideProfileSettingsModalOnHidePreventedEvent = function (event) {
            profileSettingsModal.hide();
        },
        preventDefaultIWantToChangeMyPasswordElementClickEvent = function (event) {
            event.preventDefault();
        },
        defaultIWantToChangeMyPasswordElementClickEvent = function (event) {
            event.preventDefault();

            profileSettingsModalElement.addEventListener('hidden.bs.modal', function (event) {
                changePasswordModal.show();
            }, {once: true});

            profileSettingsModal.hide();
        },
        setProfileSettingsFormInProgressState = function () {
            profileSettingsModalElement.removeEventListener('hidePrevented.bs.modal', hideProfileSettingsModalOnHidePreventedEvent);

            profileSettingsFormValidator.getElements().forEach(function (element) {
                element.readOnly = true;
            });

            if (changePasswordModalElementExists) {
                iWantToChangeMyPasswordElement.removeEventListener('click', defaultIWantToChangeMyPasswordElementClickEvent);
                iWantToChangeMyPasswordElement.addEventListener('click', preventDefaultIWantToChangeMyPasswordElementClickEvent);
            }

            profileSettingsCloseButtonElement.disabled = true;
            profileSettingsButtonIcon.showLoading();
        },
        setProfileSettingsFormDefaultState = function () {
            profileSettingsButtonIcon.showDefault();
            profileSettingsCloseButtonElement.disabled = false;

            if (changePasswordModalElementExists) {
                iWantToChangeMyPasswordElement.removeEventListener('click', preventDefaultIWantToChangeMyPasswordElementClickEvent);
                iWantToChangeMyPasswordElement.addEventListener('click', defaultIWantToChangeMyPasswordElementClickEvent);
            }

            profileSettingsFormValidator.getElements().forEach(function (element) {
                element.readOnly = false;
            });

            profileSettingsModalElement.addEventListener('hidePrevented.bs.modal', hideProfileSettingsModalOnHidePreventedEvent);
        },
        submitProfileSettingsForm = function () {
            const profileSettingsFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            profileSettingsFormXMLHttpRequest.responseType = 'json';
            profileSettingsFormXMLHttpRequest.timeout = 30000;

            profileSettingsFormXMLHttpRequest.open('POST', '/profile-change');

            setXMLHttpRequestHeaders(profileSettingsFormXMLHttpRequest, headers);

            profileSettingsFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                setProfileSettingsFormInProgressState();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            profileSettingsFormXMLHttpRequest.addEventListener('abort', function (event) {
                setProfileSettingsFormDefaultState();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('error', function (event) {
                setProfileSettingsFormDefaultState();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            profileSettingsFormXMLHttpRequest.addEventListener('timeout', function (event) {
                profileSettingsFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                setProfileSettingsFormDefaultState();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (profileSettingsFormXMLHttpRequest.readyState === profileSettingsFormXMLHttpRequest.DONE) {
                    if (profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                        profileSettingsButtonIcon.showSuccess();

                        alert.success(profileSettingsFormXMLHttpRequest.response.message);

                        setProfileSettingsFormDefaultState();
                    } else if (profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_VALIDATION_ERROR) {
                        setProfileSettingsFormDefaultState();

                        profileSettingsFormValidator.setErrors(profileSettingsFormXMLHttpRequest.response.errors);
                        profileSettingsFormValidator.setFocusOnFirstInvalidField();
                    } else if (
                        profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                        || profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                        || profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_UNAUTHORIZED
                    ) {
                        profileSettingsModalElement.addEventListener('hide.bs.modal', function (event) {
                            setProfileSettingsFormDefaultState();
                        }, {once: true});

                        profileSettingsModalElement.addEventListener('hidden.bs.modal', function (event) {
                            view.get();
                        }, {once: true});

                        alert.warning(profileSettingsFormXMLHttpRequest.response.message);

                        profileSettingsModal.hide();
                    } else {
                        setProfileSettingsFormDefaultState();

                        alert.danger(
                            typeof profileSettingsFormXMLHttpRequest.response.message === 'string'
                                ? profileSettingsFormXMLHttpRequest.response.message
                                : 'Помилка!'
                        );
                    }
                }
            });

            profileSettingsFormXMLHttpRequest.send(new FormData(profileSettingsFormElement));
        },
        clickProfileSettingsButtonElementEvent = function (event) {
            event.preventDefault();

            if (profileSettingsFormValidator.isValidForm()) {
                submitProfileSettingsForm();
            } else {
                profileSettingsFormValidator.setFocusOnFirstInvalidField();
            }
        },
        profileSettingsPhoneElementFocusEvent = function (event) {
            if (profileSettingsPhoneElement.value.toString() === '') {
                profileSettingsPhoneElement.value = '+380';
            }
        },
        profileSettingsPhoneElementBlurEvent = function (event) {
            if (profileSettingsPhoneElement.value.toString() === '+380') {
                profileSettingsPhoneElement.value = '';

                profileSettingsFormValidator.clearFieldValidation(profileSettingsPhoneElement.getAttribute('name'));
            }
        },
        clickProfileSettingsElementEvent = function (event) {
            event.preventDefault();

            const profileSettingsFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            profileSettingsFormXMLHttpRequest.responseType = 'json';
            profileSettingsFormXMLHttpRequest.timeout = 30000;

            profileSettingsFormXMLHttpRequest.open('POST', '/profile');

            setXMLHttpRequestHeaders(profileSettingsFormXMLHttpRequest, headers);

            profileSettingsFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                spinnerModal.show();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            profileSettingsFormXMLHttpRequest.addEventListener('abort', function (event) {
                spinnerModal.hide();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('error', function (event) {
                spinnerModal.hide();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            profileSettingsFormXMLHttpRequest.addEventListener('timeout', function (event) {
                profileSettingsFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                spinnerModal.hide();
            });

            profileSettingsFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                    const profile = profileSettingsFormXMLHttpRequest.response.user;

                    profileSettingsModalElement.addEventListener('show.bs.modal', function (event) {
                        profileSettingsFormValidator.getElements().forEach(function (element) {
                            if (typeof profile[element.getAttribute('name')] === 'string') {
                                element.value = profile[element.getAttribute('name')];
                            }
                        });
                    }, {once: true});

                    spinnerModal.hide();

                    profileSettingsModal.show();
                } else if (
                    profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_UNAUTHORIZED
                    || profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                    || profileSettingsFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                ) {
                    alert.warning(profileSettingsFormXMLHttpRequest.response.message);

                    view.get();
                } else {
                    spinnerModal.hide();

                    alert.danger(
                        typeof profileSettingsFormXMLHttpRequest.response.message === 'string'
                            ? profileSettingsFormXMLHttpRequest.response.message
                            : 'Помилка!'
                    );
                }
            });

            profileSettingsFormXMLHttpRequest.send();
        };

    profileSettingsModalElement.addEventListener('hidePrevented.bs.modal', hideProfileSettingsModalOnHidePreventedEvent);

    if (changePasswordModalElementExists) {
        iWantToChangeMyPasswordElement.addEventListener('click', defaultIWantToChangeMyPasswordElementClickEvent);
    } else {
        iWantToChangeMyPasswordElement.closest('div.row').remove();
    }

    profileSettingsButtonElement.addEventListener('click', clickProfileSettingsButtonElementEvent);

    profileSettingsModalElement.addEventListener('shown.bs.modal', function (event) {
        if (profileSettingsFormValidator.isValidForm()) {
            profileSettingsFirstNameElement.focus();
        } else {
            profileSettingsFormValidator.setFocusOnFirstInvalidField();
        }
    });

    profileSettingsModalElement.addEventListener('hidden.bs.modal', function (event) {
        profileSettingsFormValidator.getElements().forEach(function (element) {
            element.value = '';
        });

        profileSettingsFormValidator.clearFormValidation();
    });

    profileSettingsPhoneElement.addEventListener('focus', profileSettingsPhoneElementFocusEvent);

    profileSettingsPhoneElement.addEventListener('blur', profileSettingsPhoneElementBlurEvent);

    profileSettingsElement.addEventListener('click', clickProfileSettingsElementEvent);

    view.addDestroyer(function () {
        if (changePasswordModalElementExists) {
            iWantToChangeMyPasswordElement.removeEventListener('click', defaultIWantToChangeMyPasswordElementClickEvent);
            iWantToChangeMyPasswordElement.removeEventListener('click', preventDefaultIWantToChangeMyPasswordElementClickEvent);
        }

        profileSettingsButtonElement.removeEventListener('click', clickProfileSettingsButtonElementEvent);

        profileSettingsPhoneElement.removeEventListener('focus', profileSettingsPhoneElementFocusEvent);
        profileSettingsPhoneElement.removeEventListener('blur', profileSettingsPhoneElementBlurEvent);

        profileSettingsElement.removeEventListener('click', clickProfileSettingsElementEvent);

        profileSettingsFormValidator.destroy();

        profileSettingsModal.dispose();

        profileSettingsModalElement.remove();

        document.querySelector('script[src$=\'profile-settings.js\']').remove();
    });
}, {once: true});