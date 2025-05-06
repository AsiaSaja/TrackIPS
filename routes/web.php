<?php

use Illuminate\Support\Facades\Route;
use App\Models\Jurusan;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;

Route::prefix('dashboard')->group(function () {
    Route::get('/home', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/settings', [DashboardController::class, 'settings'])->name('dashboard.settings');
});

Route::get('/tes', function () {
    return dd(Jurusan::find(1));
});


Route::get('/', function () {
    return Inertia::render('Home');
});
// Route::get('/home', [PageController::class, 'home']);
