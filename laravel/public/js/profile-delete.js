document.addEventListener('viewLoaded', function () {
    const profileDeleteModalElement = document.querySelector('#profile-delete-modal'),
        profileDeleteModal = bootstrap.Modal.getOrCreateInstance(profileDeleteModalElement, {
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
        profileDeleteFormElement = profileDeleteModalElement.querySelector('form'),
        profileDeletePasswordElement = profileDeleteFormElement.querySelector('[name=password]'),
        iWantToGoBackToMyProfileSettingsElement = profileDeleteFormElement.querySelector('#i-want-to-go-back-to-my-profile-settings'),
        profileDeleteCloseButtonElement = profileDeleteModalElement.querySelector('button.btn-close'),
        profileDeleteButtonElement = profileDeleteFormElement.querySelector('button'),
        profileDeleteButtonIcon = new ButtonIcon(profileDeleteButtonElement),
        profileDeleteFormValidator = new Validator(profileDeleteFormElement, {
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
                            const profileDeleteConfirmationPasswordElement = this.getElement('confirmation_password'),
                                confirmationPasswordValue = profileDeleteConfirmationPasswordElement.value.toString();

                            if (confirmationPasswordValue !== '') {
                                if (value !== confirmationPasswordValue) {
                                    return {
                                        'valid': false,
                                        'message': 'Паролі не збігаються.'
                                    };
                                } else {
                                    this._setValid(profileDeleteConfirmationPasswordElement);

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
                'confirmation_password': {
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
                            const profileDeletePasswordElement = this.getElement('password'),
                                passwordValue = profileDeletePasswordElement.value.toString();

                            if (passwordValue !== '') {
                                if (value !== passwordValue) {
                                    return {
                                        'valid': false,
                                        'message': 'Паролі не збігаються.'
                                    };
                                } else {
                                    this._setValid(profileDeletePasswordElement);

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
        hideProfileDeleteModalOnHidePreventedEvent = function (event) {
            profileDeleteModal.hide();
        },
        preventDefaultIWantToGoBackToMyProfileElementClickEvent = function (event) {
            event.preventDefault();
        },
        defaultIWantToGoBackToMyProfileElementClickEvent = function (event) {
            event.preventDefault();

            profileDeleteModalElement.addEventListener('hidden.bs.modal', function (event) {
                profileSettingsElement.click();
            }, {once: true});

            profileDeleteModal.hide();
        },
        setProfileDeleteFormInProgressState = function () {
            profileDeleteModalElement.removeEventListener('hidePrevented.bs.modal', hideProfileDeleteModalOnHidePreventedEvent);

            profileDeleteFormValidator.getElements().forEach(function (element) {
                element.readOnly = true;
            });

            if (profileSettingsModalElementExists) {
                iWantToGoBackToMyProfileSettingsElement.removeEventListener('click', defaultIWantToGoBackToMyProfileElementClickEvent);
                iWantToGoBackToMyProfileSettingsElement.addEventListener('click', preventDefaultIWantToGoBackToMyProfileElementClickEvent);
            }

            profileDeleteCloseButtonElement.disabled = true;
            profileDeleteButtonIcon.showLoading();
        },
        setProfileDeleteFormDefaultState = function () {
            profileDeleteButtonIcon.showDefault();
            profileDeleteCloseButtonElement.disabled = false;

            if (profileSettingsModalElementExists) {
                iWantToGoBackToMyProfileSettingsElement.removeEventListener('click', preventDefaultIWantToGoBackToMyProfileElementClickEvent);
                iWantToGoBackToMyProfileSettingsElement.addEventListener('click', defaultIWantToGoBackToMyProfileElementClickEvent);
            }

            profileDeleteFormValidator.getElements().forEach(function (element) {
                element.readOnly = false;
            });

            profileDeleteModalElement.addEventListener('hidePrevented.bs.modal', hideProfileDeleteModalOnHidePreventedEvent);
        },
        submitProfileDeleteForm = function () {
            const profileDeleteFormXMLHttpRequest = new XMLHttpRequest(),
                headers = {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
                };

            profileDeleteFormXMLHttpRequest.responseType = 'json';
            profileDeleteFormXMLHttpRequest.timeout = 30000;

            profileDeleteFormXMLHttpRequest.open('POST', '/profile-delete');

            setXMLHttpRequestHeaders(profileDeleteFormXMLHttpRequest, headers);

            profileDeleteFormXMLHttpRequest.addEventListener('loadstart', function (event) {
                setProfileDeleteFormInProgressState();
            });

            profileDeleteFormXMLHttpRequest.addEventListener('progress', function (event) {
                //
            });

            profileDeleteFormXMLHttpRequest.addEventListener('abort', function (event) {
                setProfileDeleteFormDefaultState();
            });

            profileDeleteFormXMLHttpRequest.addEventListener('error', function (event) {
                setProfileDeleteFormDefaultState();
            });

            profileDeleteFormXMLHttpRequest.addEventListener('load', function (event) {
                //
            });

            profileDeleteFormXMLHttpRequest.addEventListener('timeout', function (event) {
                profileDeleteFormXMLHttpRequest.abort();

                alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');

                setProfileDeleteFormDefaultState();
            });

            profileDeleteFormXMLHttpRequest.addEventListener('loadend', function (event) {
                if (profileDeleteFormXMLHttpRequest.readyState === profileDeleteFormXMLHttpRequest.DONE) {
                    if (profileDeleteFormXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                        profileDeleteButtonIcon.showSuccess();

                        alert.success(profileDeleteFormXMLHttpRequest.response.message);

                        profileDeleteModalElement.addEventListener('hidden.bs.modal', function (event) {
                            setProfileDeleteFormDefaultState();

                            view.get();
                        }, {once: true});

                        profileDeleteModal.hide();
                    } else if (profileDeleteFormXMLHttpRequest.status === HTTP_RESPONSE_VALIDATION_ERROR) {
                        setProfileDeleteFormDefaultState();

                        profileDeleteFormValidator.setErrors(profileDeleteFormXMLHttpRequest.response.errors);
                        profileDeleteFormValidator.setFocusOnFirstInvalidField();
                    } else if (
                        profileDeleteFormXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                        || profileDeleteFormXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                        || profileDeleteFormXMLHttpRequest.status === HTTP_RESPONSE_UNAUTHORIZED
                    ) {
                        setProfileDeleteFormDefaultState();

                        alert.warning(profileDeleteFormXMLHttpRequest.response.message);

                        profileDeleteModalElement.addEventListener('hidden.bs.modal', function (event) {
                            setProfileDeleteFormDefaultState();

                            view.get();
                        }, {once: true});

                        profileDeleteModal.hide();
                    } else {
                        setProfileDeleteFormDefaultState();

                        alert.danger(
                            typeof profileDeleteFormXMLHttpRequest.response.message === 'string'
                                ? profileDeleteFormXMLHttpRequest.response.message
                                : 'Помилка!'
                        );
                    }
                }
            });

            profileDeleteFormXMLHttpRequest.send(new FormData(profileDeleteFormElement));
        },
        clickProfileDeleteButtonElementEvent = function (event) {
            event.preventDefault();

            if (profileDeleteFormValidator.isValidForm()) {
                submitProfileDeleteForm();
            } else {
                profileDeleteFormValidator.setFocusOnFirstInvalidField();
            }
        };

    profileDeleteModalElement.addEventListener('hidePrevented.bs.modal', hideProfileDeleteModalOnHidePreventedEvent);

    if (profileSettingsModalElementExists) {
        iWantToGoBackToMyProfileSettingsElement.addEventListener('click', defaultIWantToGoBackToMyProfileElementClickEvent);
    } else {
        iWantToGoBackToMyProfileSettingsElement.closest('div.row').remove();
    }

    profileDeleteButtonElement.addEventListener('click', clickProfileDeleteButtonElementEvent);

    profileDeleteModalElement.addEventListener('shown.bs.modal', function (event) {
        profileDeletePasswordElement.focus();
    });

    profileDeleteModalElement.addEventListener('hidden.bs.modal', function (event) {
        profileDeleteFormValidator.getElements().forEach(function (element) {
            element.value = '';
        });

        profileDeleteFormValidator.clearFormValidation();
    });

    view.addDestroyer(function () {
        if (profileSettingsModalElementExists) {
            iWantToGoBackToMyProfileSettingsElement.removeEventListener('click', defaultIWantToGoBackToMyProfileElementClickEvent);
            iWantToGoBackToMyProfileSettingsElement.removeEventListener('click', preventDefaultIWantToGoBackToMyProfileElementClickEvent);
        }

        profileDeleteButtonElement.removeEventListener('click', clickProfileDeleteButtonElementEvent);

        profileDeleteFormValidator.destroy();

        profileDeleteModal.dispose();

        profileDeleteModalElement.remove();

        document.querySelector('script[src$=\'profile-delete.js\']').remove();
    });
}, {once: true});
