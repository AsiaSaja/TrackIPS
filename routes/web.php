<?php

use Illuminate\Support\Facades\Route;
use App\Models\Jurusan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/tes', function () {
    return dd(Jurusan::find(1));
});
