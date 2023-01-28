document.addEventListener('viewLoaded', function () {
    navigation.build([
        [
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'about-us'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['nav-link'],
                'icon': 'bi-info-circle',
                'title': 'Про нас'
            }
        ],
        [
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'navbar-dropdown-profile'},
                    {'attribute': 'href', 'value': '#'},
                    {'attribute': 'role', 'value': 'button'},
                    {'attribute': 'data-bs-toggle', 'value': 'dropdown'},
                    {'attribute': 'aria-expanded', 'value': 'false'}
                ],
                'classList': ['nav-link', 'dropdown-toggle'],
                'icon': 'bi-person',
                'title': 'Профіль'
            },
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'profile-settings'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['dropdown-item'],
                'icon': 'bi-person-gear',
                'title': 'Налаштування'
            },
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'orders'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['dropdown-item'],
                'icon': 'bi-list-check',
                'title': 'Замовлення'
            },
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'sign-out'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['dropdown-item'],
                'icon': 'bi-box-arrow-left',
                'title': 'Вийти'
            }
        ],
        [
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'cart'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['nav-link'],
                'icon': 'bi-cart4',
                'title': 'Корзина'
            }
        ]
    ]);

    view.addDestroyer(function () {
        navigation.clear();

        document.querySelector('script[src$=\'user.js\']').remove();
    });
}, {once: true});
