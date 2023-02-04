'use strict';

/**
 * HTTP Response codes
 * @type {number}
 */
const HTTP_RESPONSE_OK = 200,
    HTTP_RESPONSE_UNAUTHORIZED = 401,
    HTTP_RESPONSE_FORBIDDEN = 403,
    HTTP_RESPONSE_CSRF_TOKEN_MISMATCH = 419,
    HTTP_RESPONSE_VALIDATION_ERROR = 422;

class Donuts {
    constructor() {
        this._element = document.querySelector('main > div > div');

        this._submitEvent = function (event) {
            this._submit(event.target);
        }.bind(this);
    }

    get() {
        document.addEventListener('donutsDestroyed', function (event) {
            this._load();
        }.bind(this), {once: true});

        this.destroy();
    }

    destroy() {
        while (this._element.childNodes.length > 0) {
            this._element.lastChild.removeEventListener('click', this._submitEvent);

            this._element.removeChild(this._element.lastChild);
        }

        document.dispatchEvent(new CustomEvent('donutsDestroyed'));
    }

    _load() {
        const donutsXMLHttpRequest = new XMLHttpRequest(),
            headers = {
                'Accept': 'text/html',
                'X-Requested-With': 'XMLHttpRequest'
            };

        donutsXMLHttpRequest.responseType = 'json';
        donutsXMLHttpRequest.timeout = 30000;

        donutsXMLHttpRequest.open('GET', '/donuts');

        setXMLHttpRequestHeaders(donutsXMLHttpRequest, headers);

        donutsXMLHttpRequest.addEventListener('loadstart', function (event) {
            //
        });

        donutsXMLHttpRequest.addEventListener('progress', function (event) {
            //
        });

        donutsXMLHttpRequest.addEventListener('abort', function (event) {
            //
        });

        donutsXMLHttpRequest.addEventListener('error', function (event) {
            //
        });

        donutsXMLHttpRequest.addEventListener('load', function (event) {
            //
        });

        donutsXMLHttpRequest.addEventListener('timeout', function (event) {
            //
        });

        donutsXMLHttpRequest.addEventListener('loadend', function (event) {
            if (donutsXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                this._build(donutsXMLHttpRequest.response);
            } else {
                alert.danger('Помилка');
            }
        }.bind(this));

        donutsXMLHttpRequest.send();
    }

    _build(donuts) {
        for (let i = donuts.length - 1; i >= 0; i--) {
            const colElement = this._getColElement(donuts[i].id),
                cardElement = this._getCardElement(),
                cardBodyElement = this._getCardBodyElement(),
                buttonElement = this._getButtonElement();

            buttonElement.addEventListener('click', this._submitEvent);

            cardBodyElement.append(this._getPriceElement(donuts[i].price));
            cardBodyElement.append(this._getTitleElement(donuts[i].title));
            cardBodyElement.append(this._getDescriptionElement(donuts[i].description));
            cardBodyElement.append(buttonElement);

            cardElement.append(this._getImageElement(donuts[i].src));
            cardElement.append(cardBodyElement);
            colElement.append(cardElement);

            this._element.append(colElement);
        }

        document.dispatchEvent(new CustomEvent('donutsBuilded'));
    }

    _submit(element) {
        const addToCartXMLHttpRequest = new XMLHttpRequest(),
            headers = {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': cookie.get('XSRF-TOKEN')
            };

        addToCartXMLHttpRequest.responseType = 'json';
        addToCartXMLHttpRequest.timeout = 30000;

        addToCartXMLHttpRequest.open('POST', '/add-to-cart');

        setXMLHttpRequestHeaders(addToCartXMLHttpRequest, headers);

        addToCartXMLHttpRequest.addEventListener('loadstart', function (event) {
            //
        });

        addToCartXMLHttpRequest.addEventListener('progress', function (event) {
            //
        });

        addToCartXMLHttpRequest.addEventListener('abort', function (event) {
            //
        });

        addToCartXMLHttpRequest.addEventListener('error', function (event) {
            //
        });

        addToCartXMLHttpRequest.addEventListener('load', function (event) {
            //
        });

        addToCartXMLHttpRequest.addEventListener('timeout', function (event) {
            addToCartXMLHttpRequest.abort();

            alert.warning('Час очікування відповіді вичерпано. Спробуйте будь ласка, ще раз.');
        });

        addToCartXMLHttpRequest.addEventListener('loadend', function (event) {
            if (addToCartXMLHttpRequest.readyState === addToCartXMLHttpRequest.DONE) {
                if (addToCartXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                    alert.success(addToCartXMLHttpRequest.response.message);
                } else if (
                    addToCartXMLHttpRequest.status === HTTP_RESPONSE_VALIDATION_ERROR
                    || addToCartXMLHttpRequest.status === HTTP_RESPONSE_FORBIDDEN
                    || addToCartXMLHttpRequest.status === HTTP_RESPONSE_CSRF_TOKEN_MISMATCH
                    || addToCartXMLHttpRequest.status === HTTP_RESPONSE_UNAUTHORIZED
                ) {
                    alert.warning(addToCartXMLHttpRequest.response.message);
                } else {
                    alert.danger(
                        typeof addToCartXMLHttpRequest.response.message === 'string'
                            ? addToCartXMLHttpRequest.response.message
                            : 'Помилка!'
                    );
                }
            }
        });

        const formData = new FormData();

        formData.append('id', element.closest('div[data-donut-id]').getAttribute('data-donut-id'));

        addToCartXMLHttpRequest.send(formData);
    }

    _getColElement(id) {
        const element = document.createElement('div');

        element.classList.add('col-xl-3', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-12', 'p-4');

        element.setAttribute('data-donut-id', id);

        return element;
    }

    _getCardElement() {
        const element = document.createElement('div');

        element.classList.add('card', 'bg-light', 'border-light', 'text-center', 'h-100');

        return element;
    }

    _getImageElement(src) {
        const element = document.createElement('img');

        element.classList.add('card-img-top');

        element.setAttribute('alt', '...');

        element.setAttribute('src', src);

        return element;
    }

    _getCardBodyElement() {
        const element = document.createElement('div');

        element.classList.add('card-body', 'd-flex', 'flex-column');

        return element;
    }

    _getPriceElement(price) {
        const element = document.createElement('p');

        element.classList.add('card-text', 'mb-2', 'fs-3', 'fw-bold');

        element.append(document.createTextNode(price));

        element.innerHTML += "&#8372;";

        return element;
    }

    _getTitleElement(title) {
        const element = document.createElement('h5');

        element.classList.add('card-title', 'fw-bold', 'text-uppercase');

        element.append(document.createTextNode(title));

        return element;
    }

    _getDescriptionElement(description) {
        const element = document.createElement('p');

        element.classList.add('card-subtitle', 'mb-3', 'text-muted', 'fs-6');

        element.append(document.createTextNode(description));

        return element;
    }

    _getButtonElement() {
        const buttonElement = document.createElement('button'),
            iconElement = document.createElement('i'),
            spanElement = document.createElement('span');

        buttonElement.setAttribute('type', 'button');

        buttonElement.classList.add('btn', 'btn-success', 'w-100', 'mt-auto');

        iconElement.classList.add('bi', 'bi-cart4', 'me-1', 'fs-4', 'align-middle');

        spanElement.classList.add('align-middle');

        spanElement.append(document.createTextNode('Купити'));

        buttonElement.append(iconElement);
        buttonElement.append(spanElement);

        return buttonElement;
    }
}

class Navigation {
    constructor() {
        this._element = document.querySelector('#navbar > ul');

        document.querySelector('nav a.navbar-brand').addEventListener('click', function (event) {
           event.preventDefault();

           spinnerModal.show();

            document.addEventListener('donutsBuilded', function (event) {
                spinnerModal.hide();
            }, {once: true});

           donuts.get();
        });
    }

    build(map) {
        for (let i = 0; i < map.length; i++) {
            const items = map[i],
                sectionElement = document.createElement('li');

            sectionElement.classList.add('nav-item');

            const linkElement = this._getLinkElement({
                'attributes': items[0]['attributes'],
                'classList': items[0]['classList']
            });

            linkElement.append(this._getIconElement(items[0]['icon']));
            linkElement.append(this._getTitleElement(items[0]['title']));

            sectionElement.append(linkElement);

            if (items.length > 1) {
                const idAttribute = (function () {
                    let id = '';

                    items[0]['attributes'].forEach(function (item) {
                       if (item.attribute === 'id') {
                           id = item.value;

                           return false;
                       }
                    });

                    return id;
                })();

                sectionElement.classList.add('dropdown');

                const dropdownElement = document.createElement('ul');

                dropdownElement.classList.add('dropdown-menu');

                dropdownElement.setAttribute('aria-labelledby', idAttribute);

                for (let i = 1; i < items.length; i++) {
                    const dropdownSectionElement = document.createElement('li'),
                        linkElement = this._getLinkElement({
                            'attributes': items[i]['attributes'],
                            'classList': items[i]['classList']
                        });

                    linkElement.append(this._getIconElement(items[i]['icon']));
                    linkElement.append(this._getTitleElement(items[i]['title']));

                    dropdownSectionElement.append(linkElement);
                    dropdownElement.append(dropdownSectionElement);
                }

                sectionElement.append(dropdownElement);
            }

            this._element.append(sectionElement);
        }

        window.dispatchEvent(new CustomEvent('resize'));
    }

    clear() {
        while (this._element.childNodes.length > 0) {
            this._element.removeChild(this._element.lastChild);
        }
    }

    _getLinkElement(properties) {
        const linkElement = document.createElement('a');

        properties.attributes.forEach(function (item) {
            linkElement.setAttribute(item.attribute, item.value);
        });

        properties.classList.forEach(function (className) {
            linkElement.classList.add(className);
        });

        return linkElement;
    }

    _getIconElement(iconClassName) {
        const iconElement = document.createElement('i');

        iconElement.classList.add('bi', iconClassName, 'me-1', 'align-middle', 'fs-3');

        return iconElement;
    }

    _getTitleElement(title) {
        const titleElement = document.createElement('span');


        titleElement.classList.add('align-middle');

        titleElement.append(document.createTextNode(title));

        return titleElement;
    }
}

class Cookie {
    get(key) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + key + ')=([^;]*)'));

        return match ? decodeURIComponent(match[3]) : '';
    }
}

class Validator {
    constructor(formElement, options) {
        if (typeof options === 'undefined') {
            // Default options
            options = {};
        }

        this._formElement = formElement;
        this._validators = typeof options.validators !== 'undefined' ? options.validators : {};

        this._inputEvent = function (event) {
            this._validateElement(event.target);
        }.bind(this);

        const elements = this.getElements();

        for (let i = 0; i < elements.length; i++) {
            elements.item(i).addEventListener('input', this._inputEvent);
        }
    }

    /**
     * Remove all validation event listeners, on form elements
     */
    destroy() {
        const elements = this.getElements();

        for (let i = 0; i < elements.length; i++) {
            elements.item(i).removeEventListener('input', this._inputEvent);
        }
    }

    setFocusOnFirstInvalidField() {
        const elements = this.getElements();

        for (let i = 0; i < elements.length; i++) {
            if (this._isInvalid(elements.item(i))) {
                elements.item(i).focus();

                return;
            }
        }
    }

    /**
     * Set errors
     * @param errors
     */
    setErrors(errors) {
        for (let name in errors) {
            if (errors.hasOwnProperty(name)) {
                for (let i = 0; i < errors[name].length; i++) {
                    this.setInvalidField(name, errors[name][i]);
                }
            }
        }
    }

    /**
     * Validate form
     */
    validateForm() {
        const elements = this.getElements();

        for (let i = 0; i < elements.length; i++) {
            this._validateElement(elements.item(i));
        }
    }

    /**
     * Validate form field
     * @param name
     */
    validateField(name) {
        const element = this.getElement(name);

        this._validateElement(element);
    }

    /**
     * Check if form is valid
     * @returns {boolean}
     */
    isValidForm() {
        if (!this.isValidatedForm()) {
            this.validateForm();
        }

        const elements = this.getElements();

        for (let i = 0; i < elements.length; i++) {
            if (!elements.item(i).classList.contains('is-valid')) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if field of form is valid
     * @param name
     * @returns {boolean}
     */
    isValidField(name) {
        if (!this.isValidatedField(name)) {
            this.validateField(name);
        }

        return this.getElement(name).classList.contains('is-valid');
    }

    /**
     * Check if form was validated
     * @returns {boolean}
     */
    isValidatedForm() {
        const elements = this.getElements();

        for (let i = 0; i < elements.length; i++) {
            if (!this._isValidated(elements.item(i))) {
                return false;
            }
        }

        return true;
    }

    /**
     * Check if field of form was validated
     * @param name
     * @returns {boolean}
     */
    isValidatedField(name) {
        return this._isValidated(this.getElement(name));
    }

    /**
     * Set field of form as valid
     * @param name
     * @param message
     */
    setValidField(name, message) {
        if (this.isValidField(name)) {
            this._setValid(this.getElement(name), message);
        }
    }

    /**
     * Set field of form as invalid
     * @param name
     * @param message
     */
    setInvalidField(name, message) {
        this._setInvalid(this.getElement(name), message);
    }

    /**
     * Clear all validation on field of form
     * @param name
     */
    clearFieldValidation(name) {
        this._clearValidation(this.getElement(name));
    }

    /**
     * Get form elements for validation
     * @returns {NodeListOf<HTMLElementTagNameMap[string]> | NodeListOf<Element> | NodeListOf<SVGElementTagNameMap[string]>}
     */
    getElements() {
        const supportedElements = [
            'input.form-control',
            'textarea.form-control',
            'select.form-select'
        ];

        return this._formElement.querySelectorAll(supportedElements.join(','));
    }

    /**
     * Clear validation on all elements of form
     */
    clearFormValidation() {
        const elements = this.getElements();

        for (let i = 0; i < elements.length; i++) {
            this._clearValidation(elements.item(i));
        }
    }

    /**
     * Get element of form by name
     * @param name
     * @returns {any}
     */
    getElement(name) {
        return this._formElement.querySelector('[name=' + name + ']');
    }

    _isValidated(element) {
        if (!this._isValid(element) && !this._isInvalid(element)) {
            return false;
        }

        return true;
    }

    _isInvalid(element) {
        return element.classList.contains('is-invalid');
    }

    _isValid(element) {
        return element.classList.contains('is-valid');
    }

    /**
     * Check element of form for validness
     * @param element
     * @private
     */
    _validateElement(element) {
        const validators = this._getElementValidators(element);

        let valid = true,
            message = '';

        for (let validator in validators) {
            if (!validators.hasOwnProperty(validator)) {
                continue;
            }

            if (typeof validators[validator] === 'function') {
                let result = (validators[validator].bind(this))(element);

                valid = typeof result.valid === 'boolean' ? result.valid : true;
                message = typeof result.message === 'string' ? result.message : '';

                if (!valid) {
                    // Exit after first validation error
                    break;
                }
            }
        }

        valid ? this._setValid(element, message) : this._setInvalid(element, message);
    }

    /**
     * Get element of form validators
     * @param element
     * @returns {{callback: (function(*): {valid: boolean, message: string})}|*}
     * @private
     */
    _getElementValidators(element) {
        const elementNameAttribute = element.getAttribute('name');

        if (typeof this._validators[elementNameAttribute] !== 'undefined') {
            return this._validators[elementNameAttribute];
        } else {
            // Default validator
            return {
                'callback': function (element) {
                    return {
                        'valid': true,
                        'message': ''
                    };
                }
            };
        }
    }

    /**
     * Set element of form as valid
     * @param element
     * @param message
     * @private
     */
    _setValid(element, message) {
        this._clearValidation(element);

        element.classList.add('is-valid');
        element.after(this._getValidFeedbackElement(message));
    }

    /**
     * Set element of form as invalid
     * @param element
     * @param message
     * @private
     */
    _setInvalid(element, message) {
        this._clearValidation(element);

        element.classList.add('is-invalid');
        element.after(this._getInvalidFeedbackElement(message));
    }

    /**
     * Clear all validation on element of form
     * @param element
     * @private
     */
    _clearValidation(element) {
        element.classList.remove('is-invalid', 'is-valid');

        const feedbacks = element.closest('div')
            .querySelectorAll('div.invalid-feedback, div.valid-feedback');

        for (let i = 0; i < feedbacks.length; i++) {
            feedbacks.item(i).remove();
        }
    }

    /**
     * Get validation valid feedback element
     * @param message
     * @returns {HTMLDivElement}
     * @private
     */
    _getValidFeedbackElement(message) {
        return this._getFeedbackElement(true, message);
    }

    /**
     * Get validation invalid feedback element
     * @param message
     * @returns {HTMLDivElement}
     * @private
     */
    _getInvalidFeedbackElement(message) {
        return this._getFeedbackElement(false, message);
    }

    /**
     * Get validation feedback element
     * @param isValid
     * @param message
     * @returns {HTMLDivElement}
     * @private
     */
    _getFeedbackElement(isValid, message) {
        if (typeof isValid !== 'boolean') {
            isValid = true;
        }

        const element = document.createElement('div');

        element.classList.add(isValid ? 'valid-feedback' : 'invalid-feedback');

        if (typeof message === 'string' && message !== '') {
            element.append(document.createTextNode(message));
        }

        return element;
    }
}

class ButtonIcon {
    constructor(element) {
        this._element = element;
    }

    showDefault() {
        this._element.disabled = false;

        this._element.querySelectorAll(
            [
                'i[data-button-icon=\'default\']',
                'span[data-button-text=\'default\']'
            ].join(',')
        ).forEach(function (element) {
            element.classList.remove('d-none');
        });

        this._element.querySelectorAll(
            [
                'i[data-button-icon=\'loading\']',
                'span[data-button-text=\'loading\']',
                'i[data-button-icon=\'success\']',
                'span[data-button-text=\'success\']'
            ].join(',')
        ).forEach(function (element) {
            element.classList.add('d-none');
        });
    }

    showLoading() {
        this._element.disabled = true;

        this._element.querySelectorAll(
            [
                'i[data-button-icon=\'loading\']',
                'span[data-button-text=\'loading\']'
            ].join(',')
        ).forEach(function (element) {
            element.classList.remove('d-none');
        });

        this._element.querySelectorAll(
            [
                'i[data-button-icon=\'default\']',
                'span[data-button-text=\'default\']',
                'i[data-button-icon=\'success\']',
                'span[data-button-text=\'success\']'
            ].join(',')
        ).forEach(function (element) {
            element.classList.add('d-none');
        });
    }

    showSuccess() {
        this._element.disabled = true;

        this._element.querySelectorAll(
            [
                'i[data-button-icon=\'success\']',
                'span[data-button-text=\'success\']'
            ].join(',')
        ).forEach(function (element) {
            element.classList.remove('d-none');
        });

        this._element.querySelectorAll(
            [
                'i[data-button-icon=\'default\']',
                'span[data-button-text=\'default\']',
                'i[data-button-icon=\'loading\']',
                'span[data-button-text=\'loading\']'
            ].join(',')
        ).forEach(function (element) {
            element.classList.add('d-none');
        });
    }
}

class Alert {
    success(message) {
        this._show('success', message);
    }

    warning(message) {
        this._show('warning', message);
    }

    danger(message) {
        this._show('danger', message);
    }

    _show(level, message) {
        const alertElement = this._getAlertElement(level);

        alertElement.append(this._getIconElement(level));
        alertElement.append(this._getMessageElement(message));
        alertElement.append(this._getCloseButtonElement());

        document.querySelector('#alert-container').append(alertElement);

        setTimeout(function (alertElement) {
            alertElement.querySelector('button[data-bs-dismiss=\'alert\']').click();
        }, 10000, alertElement);
    }

    _getIconElement(level) {
        const iconElement = document.createElement('i');
        let iconClassName = '';

        switch (level) {
            case 'success':
                iconClassName = 'bi-check-square';
                break;

            case 'warning':
                iconClassName = 'bi-info-square';
                break;

            case 'danger':
                iconClassName = 'bi-exclamation-square';
                break;
        }

        iconElement.classList.add('bi', iconClassName, 'me-2', 'align-middle', 'fs-3');

        return iconElement;
    }

    _getMessageElement(message) {
        const messageElement = document.createElement('span');

        messageElement.classList.add('align-middle');

        messageElement.append(document.createTextNode(message));

        return messageElement;
    }

    _getCloseButtonElement() {
        const buttonElement = document.createElement('button');

        buttonElement.setAttribute('type', 'button');
        buttonElement.setAttribute('data-bs-dismiss', 'alert');
        buttonElement.setAttribute('aria-label', 'Close');

        buttonElement.classList.add('btn-close');

        return buttonElement;
    }

    _getAlertElement(level) {
        const alertElement = document.createElement('div');

        alertElement.setAttribute('role', 'alert');

        alertElement.classList.add('alert', 'alert-' + level, 'alert-dismissible', 'mt-2', 'me-2');

        return alertElement;
    }
}

class View {
    constructor() {
        this._destroyers = [];

        document.addEventListener('viewLoaded', function (view, event) {
            view.destroy();
        }.bind(document, this));

        document.addEventListener('viewBuilded', function (event) {
            spinnerModal.hide();
        });
    }

    get() {
        const viewXMLHttpRequest = new XMLHttpRequest(),
            headers = {
                'Accept': 'text/html',
                'X-Requested-With': 'XMLHttpRequest'
            };

        viewXMLHttpRequest.responseType = 'text';
        viewXMLHttpRequest.timeout = 30000;

        viewXMLHttpRequest.open('GET', '/view');

        setXMLHttpRequestHeaders(viewXMLHttpRequest, headers);

        viewXMLHttpRequest.addEventListener('loadstart', function (event) {
            spinnerModal.show();
        });

        viewXMLHttpRequest.addEventListener('progress', function (event) {
            //
        });

        viewXMLHttpRequest.addEventListener('abort', function (event) {
            //
        });

        viewXMLHttpRequest.addEventListener('error', function (event) {
            //
        });

        viewXMLHttpRequest.addEventListener('load', function (event) {
            //
        });

        viewXMLHttpRequest.addEventListener('timeout', function (event) {
            //
        });

        viewXMLHttpRequest.addEventListener('loadend', function (event) {
            if (viewXMLHttpRequest.status === HTTP_RESPONSE_OK) {
                document.querySelector('body')
                    .append(document.createRange().createContextualFragment(viewXMLHttpRequest.responseText));
            } else {
                alert.danger('Помилка');
            }
        });

        viewXMLHttpRequest.send();
    }

    destroy() {
        for (let i = this._destroyers.length - 1; i >= 0; i--) {
            this._destroyers[i]();
        }

        this._destroyers = [];

        document.dispatchEvent(new CustomEvent('viewDestroyed'));
    }

    loadScripts(scripts) {
        Promise.all((function () {
            let promises = [];

            scripts.forEach(function(script) {
                promises.push((function () {
                    return new Promise(function (resolve, reject) {
                        let scriptElement = document.createElement('script');

                        scriptElement.async = false;

                        scriptElement.setAttribute('src', script);

                        scriptElement.addEventListener('load', function (event) {
                            resolve(script);
                        });
                        scriptElement.addEventListener('error', function (event) {
                            reject(script);
                        });

                        document.querySelector('body').appendChild(scriptElement);
                    });
                })());
            });

            return promises;
        })()).then(function() {
            document.addEventListener('viewLoaded', function (event) {
                document.dispatchEvent(new CustomEvent('viewBuilded'));
            }, {once: true});

            // document.addEventListener('viewDestroyed', function (event) {
            //     this.addDestroyer(function () {
            //         scripts.forEach(function(script) {
            //             document.querySelector('script[src=' + script + ']').remove();
            //         });
            //     });
            // }.bind(this), {once: true});

            document.dispatchEvent(new CustomEvent('viewLoaded'));
        }).catch(function(script) {
            console.log(script + ' failed to load!');
        });
    }

    addDestroyer(destroyer) {
        if (typeof destroyer === 'function') {
            this._destroyers.push(destroyer);
        }
    }
}

const cookie = new Cookie(),
    alert = new Alert(),
    view = new View(),
    navigation = new Navigation(),
    donuts = new Donuts(),
    spinnerModal = new bootstrap.Modal(document.getElementById('spinner-modal'), {
        'backdrop': 'static',
        'keyboard': false
    }),
    resize = function () {
        const navbarElement = document.getElementById('navbar');

        if (navbarElement.classList.contains('show')) {
            navbarElement.addEventListener('hidden.bs.collapse', function (event) {
                resize();
            }, {once: true});

            (bootstrap.Collapse.getOrCreateInstance(navbarElement)).hide();
        } else {
            const mainElement = document.getElementsByTagName('main').item(0),
                headerHeight = document.getElementsByTagName('nav').item(0).offsetHeight;

            mainElement.style.marginTop = headerHeight + 'px';
            mainElement.style.maxHeight = (window.innerHeight - headerHeight) + 'px';
        }
    },
    /**
     * Reload page
     */
    reload = function () {
        const link = document.createElement('a');

        link.setAttribute('href', '/');

        link.click();
    },
    setXMLHttpRequestHeaders = function (XMLHttpRequest, headers) {
        for (let headerName in headers) {
            if (headers.hasOwnProperty(headerName)) {
                XMLHttpRequest.setRequestHeader(headerName, headers[headerName]);
            }
        }
    };

document.addEventListener('DOMContentLoaded', function () {
    spinnerModal.show();

    window.addEventListener('resize', resize);

    resize();

    donuts.get();
    view.get();
});
