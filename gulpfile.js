var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix
        .less('app.less')
        .coffee();

    mix.styles([
        'vendor/normalize.css',
        'vendor/foundation.css',
        'app.css'
    ], null, 'public/css');

    mix.scripts([
        'vendor/mqtt.js',
        'vendor/modernizr.js',
        'vendor/jquery.js',
        'vendor/foundation.min.js',
        'app.js'
    ], null, 'public/js');

    mix.version(['public/css/all.css', 'public/js/all.js']);
});
