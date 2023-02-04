@include('templates.profile-settings')
@include('templates.profile-password-change')
@include('templates.about-us')
@include('templates.cart')
@include('templates.orders')
@include('templates.profile-delete')

<script id="user">
    view.loadScripts([
        '{{ asset('js/user.js') }}',
        '{{ asset('js/sign-out.js') }}',
        '{{ asset('js/profile-settings.js') }}',
        '{{ asset('js/profile-password-change.js') }}',
        '{{ asset('js/about-us.js') }}',
        '{{ asset('js/cart.js') }}',
        '{{ asset('js/orders.js') }}',
        '{{ asset('js/profile-delete.js') }}'
    ]);

    document.getElementById('user').remove();
</script>
