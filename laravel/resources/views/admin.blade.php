@include('templates.profile-settings')
@include('templates.profile-password-change')
@include('templates.users')
@include('templates.orders')
@include('templates.profile-delete')

<script id="admin">
    view.loadScripts([
        '{{ asset('js/admin.js') }}',
        '{{ asset('js/sign-out.js') }}',
        '{{ asset('js/profile-settings.js') }}',
        '{{ asset('js/profile-password-change.js') }}',
        '{{ asset('js/users.js') }}',
        '{{ asset('js/orders.js') }}',
        '{{ asset('js/profile-delete.js') }}'
    ]);

    document.getElementById('admin').remove();
</script>
