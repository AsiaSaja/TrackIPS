<?php

use Illuminate\Support\Facades\Route;
use App\Models\Jurusan;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\AuthController;
use App\Models\Room;
use Inertia\Inertia;

// Authentication routes for guests only
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    
    // Redirect unauthenticated users to login page
    Route::get('/', function () {
        return redirect()->route('login');
    });
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Protected routes - only accessible when authenticated
Route::middleware('auth')->group(function () {
    // Landing pages
    Route::get('/home', [LandingController::class, 'index'])->name('home');
    Route::get('/features', [LandingController::class, 'features'])->name('features');
    Route::get('/about', [LandingController::class, 'about'])->name('about');
    
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Test route
Route::get('/tes', function () {
    return dd(Room::where('floor',1)->first()->wifis);
});
