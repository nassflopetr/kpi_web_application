document.addEventListener('viewLoaded', function () {
    const profilePasswordChangeModalElement = document.querySelector('#profile-password-change-modal'),
        profilePasswordChangeModal = bootstrap.Modal.getOrCreateInstance(profilePasswordChangeModalElement, {
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
        profilePasswordChangeFormElement = profilePasswordChangeModalElement.querySelector('form'),
        profilePasswordChangePasswordElement = profilePasswordChangeFormElement.querySelector('[name=password]'),
        iWantToChangeMyProfileSettingsElement = profilePasswordChangeFormElement.querySelector('#i-want-to-change-my-profile-settings'),
        profilePasswordChangeCloseButtonElement = profilePasswordChangeModalElement.querySelector('button.btn-close'),
        profilePasswordChangeButtonElement = profilePasswordChangeFormElement.querySelector('button'),
        profilePasswordChangeButtonIcon = new ButtonIcon(profilePasswordChangeButtonElement),
        profilePasswordChangeFormValidator = new Validator(profilePasswordChangeFormElement, {
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
                            const profilePasswordChangeConfirmationNewPasswordElement = this.getElement('confirmation_new_password'),
                                confirmationNewPasswordValue = profilePasswordChangeConfirmationNewPasswordElement.value.toString();

                            if (confirmationNewPasswordValue !== '') {
                                if (value !== confirmationNewPasswordValue) {
                                    return {
                                        'valid': false,
                                        'message': 'Паролі не збігаються.'
                                    };
                                } else {
                                    this._setValid(profilePasswordChangeConfirmationNewPasswordElement);

                                    return {'valid': true};
                                }
                            } else {
                                return {'valid': true};
                            }
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має містити принаймні одну велику та малу літери, одну цифру та символ.'
                        };
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
                            const profilePasswordChangeNewPasswordElement = this.getElement('new_password'),
                                newPasswordValue = profilePasswordChangeNewPasswordElement.value.toString();

                            if (newPasswordValue !== '') {
                                if (value !== newPasswordValue) {
                                    return {
                                        'valid': false,
                                        'message': 'Паролі не збігаються.'
                                    };
                                } else {
                                    this._setValid(profilePasswordChangeNewPasswordElement);

                                    return {'valid': true};
                                }
                            } else {
                                return {'valid': true};
                            }
                        }

                        return {
                            'valid': false,
                            'message': 'Поле має містити принаймні одну велику та малу літери, одну цифру та символ.'
                        };
                    }
                }
            }
        }),
        hideProfilePasswordChangeModalOnHidePreventedEvent = function (event) {
            profilePasswordChangeModal.hide();
        },
        preventDefaultIWantToChangeMyProfileElementClickEvent = function (event) {
            event.preventDefault();
        },
        defaultIWantToChangeMyProfileElementClickEvent = function (event) {
            event.preventDefault();

            profilePasswordChangeModalElement.addEventListener('hidden.bs.modal', function (event) {
                profileSettingsElement.click();
            }, {once: true});

            profilePasswordChangeModal.hide();
        },
        setProfilePasswordChangeFormInProgressState = function () {
            profilePasswordChangeModalElement.removeEventListener('hidePrevented.bs.modal', hideProfilePasswordChangeModalOnHidePreventedEvent);

            profilePasswordChangeFormValidator.getElements().forEach(function (element) {
                element.readOnly = true;
            });

            if (profileSettingsModalElementExists) {
                iWantToChangeMyProfileSettingsElement.removeEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
                iWantToChangeMyProfileSettingsElement.addEventListener('click', preventDefaultIWantToChangeMyProfileElementClickEvent);
            }

            profilePasswordChangeCloseButtonElement.disabled = true;
            profilePasswordChangeButtonIcon.showLoading();
        },
        setProfilePasswordChangeFormDefaultState = function () {
            profilePasswordChangeButtonIcon.showDefault();
            profilePasswordChangeCloseButtonElement.disabled = false;

            if (profileSettingsModalElementExists) {
                iWantToChangeMyProfileSettingsElement.removeEventListener('click', preventDefaultIWantToChangeMyProfileElementClickEvent);
                iWantToChangeMyProfileSettingsElement.addEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
            }

            profilePasswordChangeFormValidator.getElements().forEach(function (element) {
                element.readOnly = false;
            });

            profilePasswordChangeModalElement.addEventListener('hidePrevented.bs.modal', hideProfilePasswordChangeModalOnHidePreventedEvent);
        },
        submitProfilePasswordChangeForm = function () {
            const profilePasswordChangeFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            profilePasswordChangeFormXMLHttpRequest.responseType = 'json';
            profilePasswordChangeFormXMLHttpRequest.timeout = 30000;

            profilePasswordChangeFormXMLHttpRequest.open('POST', '/profile-password-change');

            setXMLHttpRequestHeaders(profilePasswordChangeFormXMLHttpRequest, headers);

            profilePasswordChangeFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                setProfilePasswordChangeFormInProgressState();
            });

            profilePasswordChangeFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            profilePasswordChangeFormXMLHttpRequest.addEventListener('abort', function (event) {
                setProfilePasswordChangeFormDefaultState();
            });

            profilePasswordChangeFormXMLHttpRequest.addEventListener('error', function (event) {
                setProfilePasswordChangeFormDefaultState();
            });

            profilePasswordChangeFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            profilePasswordChangeFormXMLHttpRequest.addEventListener('timeout', function (event) {
                profilePasswordChangeFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                setProfilePasswordChangeFormDefaultState();
            });

            profilePasswordChangeFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (profilePasswordChangeFormXMLHttpRequest.readyState === profilePasswordChangeFormXMLHttpRequest.DONE) {
                    if (profilePasswordChangeFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                        profilePasswordChangeButtonIcon.showSuccess();

                        alert.success(profilePasswordChangeFormXMLHttpRequest.response.message);

                        profilePasswordChangeModalElement.addEventListener('hidden.bs.modal', function (event) {
                            setProfilePasswordChangeFormDefaultState();

                            view.get();
                        }, {once: true});

                        document.addEventListener('viewBuilded', function (event) {
                            if (document.querySelectorAll('#sign-in').length === 1) {
                                document.getElementById('sign-in').click();
                            }
                        }, {once: true});

                        profilePasswordChangeModal.hide();
                    } else if (profilePasswordChangeFormXMLHttpRequest.status === HTTP_RESPONSE_VALIDATION_ERROR) {
                        setProfilePasswordChangeFormDefaultState();

                        profilePasswordChangeFormValidator.setErrors(profilePasswordChangeFormXMLHttpRequest.response.errors);
                        profilePasswordChangeFormValidator.setFocusOnFirstInvalidField();
                    } else if (
                        profilePasswordChangeFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                        || profilePasswordChangeFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                        || profilePasswordChangeFormXMLHttpRequest.status === HTTP_RESPONSE_UNAUTHORIZED
                    ) {
                        setProfilePasswordChangeFormDefaultState();

                        alert.warning(profilePasswordChangeFormXMLHttpRequest.response.message);

                        profilePasswordChangeModalElement.addEventListener('hidden.bs.modal', function (event) {
                            setProfilePasswordChangeFormDefaultState();

                            view.get();
                        }, {once: true});

                        profilePasswordChangeModal.hide();
                    } else {
                        setProfilePasswordChangeFormDefaultState();

                        alert.danger(
                            typeof profilePasswordChangeFormXMLHttpRequest.response.message === 'string'
                                ? profilePasswordChangeFormXMLHttpRequest.response.message
                                : 'Помилка!'
                        );
                    }
                }
            });

            profilePasswordChangeFormXMLHttpRequest.send(new FormData(profilePasswordChangeFormElement));
        },
        clickProfilePasswordChangeButtonElementEvent = function (event) {
            event.preventDefault();

            if (profilePasswordChangeFormValidator.isValidForm()) {
                submitProfilePasswordChangeForm();
            } else {
                profilePasswordChangeFormValidator.setFocusOnFirstInvalidField();
            }
        };

    profilePasswordChangeModalElement.addEventListener('hidePrevented.bs.modal', hideProfilePasswordChangeModalOnHidePreventedEvent);

    if (profileSettingsModalElementExists) {
        iWantToChangeMyProfileSettingsElement.addEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
    } else {
        iWantToChangeMyProfileSettingsElement.closest('div.row').remove();
    }

    profilePasswordChangeButtonElement.addEventListener('click', clickProfilePasswordChangeButtonElementEvent);

    profilePasswordChangeModalElement.addEventListener('shown.bs.modal', function (event) {
        profilePasswordChangePasswordElement.focus();
    });

    profilePasswordChangeModalElement.addEventListener('hidden.bs.modal', function (event) {
        profilePasswordChangeFormValidator.getElements().forEach(function (element) {
            element.value = '';
        });

        profilePasswordChangeFormValidator.clearFormValidation();
    });

    view.addDestroyer(function () {
        if (profileSettingsModalElementExists) {
            iWantToChangeMyProfileSettingsElement.removeEventListener('click', defaultIWantToChangeMyProfileElementClickEvent);
            iWantToChangeMyProfileSettingsElement.removeEventListener('click', preventDefaultIWantToChangeMyProfileElementClickEvent);
        }

        profilePasswordChangeButtonElement.removeEventListener('click', clickProfilePasswordChangeButtonElementEvent);

        profilePasswordChangeFormValidator.destroy();

        profilePasswordChangeModal.dispose();

        profilePasswordChangeModalElement.remove();

        document.querySelector('script[src$=\'profile-password-change.js\']').remove();
    });
}, {once: true});
