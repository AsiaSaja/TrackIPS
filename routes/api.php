<?php

use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum','ability:access-api'])->group(function () {
    // Route::get('/login', [AuthController::class, 'showLogin'])->name('login'); 
});

Route::prefix('user')->group(function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::get('/refresh-token', [UserController::class, 'refreshToken'])
        ->middleware(['auth:sanctum','ability:issue-access-token']);
    Route::get('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
});
