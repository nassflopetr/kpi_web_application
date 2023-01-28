@include('templates.sign-in')
@include('templates.sign-up')
@include('templates.about-us')

<script id="guest">
    view.loadScripts([
        '{{ asset('js/guest.js') }}',
        '{{ asset('js/sign-in.js') }}',
        '{{ asset('js/sign-up.js') }}',
        '{{ asset('js/about-us.js') }}',
    ]);

    document.getElementById('guest').remove();
</script>
