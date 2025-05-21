<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Gunakan middleware Sanctum untuk autentikasi channel private/presence
        Broadcast::routes(['middleware' => ['auth:sanctum']]);

        // Load channel definitions
        require base_path('routes/channels.php');
    }
}
