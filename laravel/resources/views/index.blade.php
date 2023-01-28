<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Donuts</title>

    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="{{ asset('css/bootstrap-5.2.2-dist/css/bootstrap.css') }}" rel="stylesheet">
    <link href="{{ asset('icons/bootstrap-icons-1.10.2/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
@include('templates.alert')
@include('templates.spinner')
@include('templates.navigation')
@include('templates.donuts')

<script src="{{ asset('js/bootstrap-5.2.2-dist/js/bootstrap.bundle.js') }}" rel="script"></script>
<script src="{{ asset('js/app.js') }}" rel="script"></script>
</body>
</html>
