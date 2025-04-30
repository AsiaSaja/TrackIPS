<!DOCTYPE html>
<html>
  <head>
    <!-- Load assets with Vite -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])
  </head>
  <body>
    <div id="app" data-page="{{ json_encode($page) }}"></div>
  </body>
</html>