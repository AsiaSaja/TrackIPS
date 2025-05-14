<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'TrackIPS') }}</title>
    <!-- Load assets with Vite -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
  </head>
  <body>
    <div id="app" data-page="{{ json_encode($page) }}"></div>
  </body>
</html>