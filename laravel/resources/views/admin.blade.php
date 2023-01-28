@include('templates.profile-settings')
@include('templates.change-password')
@include('templates.users')
@include('templates.orders')

<script id="admin">
    view.loadScripts([
        '{{ asset('js/admin.js') }}',
        '{{ asset('js/sign-out.js') }}',
        '{{ asset('js/profile-settings.js') }}',
        '{{ asset('js/change-password.js') }}',
        '{{ asset('js/users.js') }}',
        '{{ asset('js/orders.js') }}'
    ]);

    document.getElementById('admin').remove();
</script>
