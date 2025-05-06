<?php

namespace App\Http\Controllers;

use Filament\Pages\Dashboard;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index');
    }

    public function settings()
    {
        return Inertia::render('Dashboard/Settings', [
            'title' => 'Settings'
        ]);
    }
}
