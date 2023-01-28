document.addEventListener('viewLoaded', function () {
    navigation.build([
        [{
            'attributes': [
                {'attribute': 'id', 'value': 'about-us'},
                {'attribute': 'href', 'value': '#'}
            ],
            'classList': ['nav-link'],
            'icon': 'bi-info-circle',
            'title': 'Про нас'
        }],
        [{
            'attributes': [
                {'attribute': 'id', 'value': 'sign-in'},
                {'attribute': 'href', 'value': '#'}
            ],
            'classList': ['nav-link'],
            'icon': 'bi-box-arrow-in-right',
            'title': 'Увійти'
        }]
    ]);

    view.addDestroyer(function () {
        navigation.clear();

        document.querySelector('script[src$=\'guest.js\']').remove();
    });
}, {once: true});
