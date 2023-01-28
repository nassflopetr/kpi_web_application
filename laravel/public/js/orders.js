document.addEventListener('viewLoaded', function () {
    const ordersModalElement = document.querySelector('#orders-modal'),
        ordersModal = new bootstrap.Modal(ordersModalElement, {'backdrop': 'static', 'keyboard': false}),
        ordersElement = document.getElementById('orders'),
        hideOrdersModalOnHidePreventedEvent = function (event) {
            ordersModal.hide();
        },
        clickOrdersElementEvent = function (event) {
            event.preventDefault();

            ordersModal.show();
        };

    ordersModalElement.addEventListener('hidePrevented.bs.modal', hideOrdersModalOnHidePreventedEvent);

    ordersElement.addEventListener('click', clickOrdersElementEvent);

    view.addDestroyer(function () {
        ordersElement.removeEventListener('click', clickOrdersElementEvent);

        ordersModal.dispose();

        ordersModalElement.remove();

        document.querySelector('script[src$=\'orders.js\']').remove();
    });
}, {once: true});
