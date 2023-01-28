document.addEventListener('viewLoaded', function () {
    navigation.build([
        [
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'navbar-dropdown-management'},
                    {'attribute': 'href', 'value': '#'},
                    {'attribute': 'role', 'value': 'button'},
                    {'attribute': 'data-bs-toggle', 'value': 'dropdown'},
                    {'attribute': 'aria-expanded', 'value': 'false'}
                ],
                'classList': ['nav-link', 'dropdown-toggle'],
                'icon': 'bi-briefcase',
                'title': 'Управління'
            },
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'users'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['dropdown-item'],
                'icon': 'bi-people',
                'title': 'Користувачі'
            },
            {
                'attributes': [
                    {'attribute': 'id', 'value': 'orders'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['dropdown-item'],
                'icon': 'bi-list-check',
                'title': 'Замовлення'
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
                    {'attribute': 'id', 'value': 'sign-out'},
                    {'attribute': 'href', 'value': '#'}
                ],
                'classList': ['dropdown-item'],
                'icon': 'bi-box-arrow-left',
                'title': 'Вийти'
            }
        ]
    ]);

    view.addDestroyer(function () {
        navigation.clear();

        document.querySelector('script[src$=\'admin.js\']').remove();
    });
}, {once: true});
