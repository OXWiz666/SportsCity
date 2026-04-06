<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Determine the project base path
|--------------------------------------------------------------------------
| Supports two directory structures:
|   Local dev:  public/ sits inside the project  -> base is ../
|   Hostinger:  public_html/ is separate         -> base is ../sportscity/
*/
$basePath = match (true) {
    file_exists(__DIR__.'/../sportscity/vendor/autoload.php') => __DIR__.'/../sportscity',
    default => __DIR__.'/..',
};

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $basePath.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require $basePath.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once $basePath.'/bootstrap/app.php')
    ->handleRequest(Request::capture());
