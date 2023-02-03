@include('templates.profile-settings')
@include('templates.change-password')
@include('templates.users')
@include('templates.orders')
@include('templates.profile-delete')

<script id="admin">
    view.loadScripts([
        '{{ asset('js/admin.js') }}',
        '{{ asset('js/sign-out.js') }}',
        '{{ asset('js/profile-settings.js') }}',
        '{{ asset('js/change-password.js') }}',
        '{{ asset('js/users.js') }}',
        '{{ asset('js/orders.js') }}',
        '{{ asset('js/profile-delete.js') }}'
    ]);

    document.getElementById('admin').remove();
</script>
