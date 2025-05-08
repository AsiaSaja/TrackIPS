<?php

namespace App\Http\Controllers;

use Filament\Pages\Dashboard;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'users' => User::with('prodi')->where('status', 'Mhs')->get(),
            'stats' => [
                'total' => User::count(),
                'online' => User::whereNotNull('nearest_wifi')->count()
            ]
            ]);
    }

    public function settings()
    {
        return Inertia::render('Dashboard/Settings', [
            'title' => 'Settings'
        ]);
    }
}
