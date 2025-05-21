<?php

use App\Http\Controllers\API\MapController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum','ability:access-api'])->group(function () {
    Route::get('/map/{floor}', [MapController::class, 'map']); 
    // Route::get('/user-resources/{room}', [MapController::class, 'userResources']); 
    Route::get('/user-detail/{id}', [MapController::class, 'userDetail']); 
    Route::get('/user-search/{name}', [MapController::class, 'search']); 
    Route::get('/user-room/{room}', [MapController::class, 'userInRoom']); 
    Route::post('/user-update-location/{wifi}', [MapController::class, 'changeLocation']); 
});

Route::prefix('user')->group(function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::get('/refresh-token', [UserController::class, 'refreshToken'])
        ->middleware(['auth:sanctum','ability:issue-access-token']);
    Route::get('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
});
