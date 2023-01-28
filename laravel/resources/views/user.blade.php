@include('templates.profile-settings')
@include('templates.change-password')
@include('templates.about-us')
@include('templates.cart')
@include('templates.orders')

<script id="user">
    view.loadScripts([
        '{{ asset('js/user.js') }}',
        '{{ asset('js/sign-out.js') }}',
        '{{ asset('js/profile-settings.js') }}',
        '{{ asset('js/change-password.js') }}',
        '{{ asset('js/about-us.js') }}',
        '{{ asset('js/cart.js') }}',
        '{{ asset('js/orders.js') }}',
    ]);

    document.getElementById('user').remove();
</script>
