document.addEventListener('viewLoaded', function () {
    const cartModalElement = document.querySelector('#cart-modal'),
        cartModal = new bootstrap.Modal(cartModalElement, {'backdrop': 'static', 'keyboard': false}),
        cartElement = document.getElementById('cart'),
        hideCartModalOnHidePreventedEvent = function (event) {
            cartModal.hide();
        },
        clickCartElementEvent = function (event) {
            event.preventDefault();

            cartModal.show();
        };

    cartModalElement.addEventListener('hidePrevented.bs.modal', hideCartModalOnHidePreventedEvent);

    cartElement.addEventListener('click', clickCartElementEvent);

    view.addDestroyer(function () {
        cartElement.removeEventListener('click', clickCartElementEvent);

        cartModal.dispose();

        cartModalElement.remove();

        document.querySelector('script[src$=\'cart.js\']').remove();
    });
}, {once: true});
