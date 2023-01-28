document.addEventListener('viewLoaded', function () {
    const usersModalElement = document.querySelector('#users-modal'),
        usersModal = new bootstrap.Modal(usersModalElement, {'backdrop': 'static', 'keyboard': false}),
        usersElement = document.getElementById('users'),
        hideUsersModalOnHidePreventedEvent = function (event) {
            usersModal.hide();
        },
        clickUsersElementEvent = function (event) {
            event.preventDefault();

            usersModal.show();
        };

    usersModalElement.addEventListener('hidePrevented.bs.modal', hideUsersModalOnHidePreventedEvent);

    usersElement.addEventListener('click', clickUsersElementEvent);

    view.addDestroyer(function () {
        usersElement.removeEventListener('click', clickUsersElementEvent);

        usersModal.dispose();

        usersModalElement.remove();

        document.querySelector('script[src$=\'users.js\']').remove();
    });
}, {once: true});
