document.addEventListener('viewLoaded', function () {
    const aboutUsModalElement = document.querySelector('#about-us-modal'),
        aboutUsModal = new bootstrap.Modal(aboutUsModalElement, {'backdrop': 'static', 'keyboard': false}),
        aboutUsElement = document.getElementById('about-us'),
        hideAboutUsModalOnHidePreventedEvent = function (event) {
            aboutUsModal.hide();
        },
        clickAboutUsElementEvent = function (event) {
            event.preventDefault();

            aboutUsModal.show();
        };

    aboutUsModalElement.addEventListener('hidePrevented.bs.modal', hideAboutUsModalOnHidePreventedEvent);

    aboutUsElement.addEventListener('click', clickAboutUsElementEvent);

    view.addDestroyer(function () {
        aboutUsElement.removeEventListener('click', clickAboutUsElementEvent);

        aboutUsModal.dispose();

        aboutUsModalElement.remove();

        document.querySelector('script[src$=\'about-us.js\']').remove();
    });
}, {once: true});
