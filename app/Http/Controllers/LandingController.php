<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        Log::info('Landing page index method called');
        
        // If user is authenticated, add user data to the props
        if (Auth::check()) {
            Log::info('User is authenticated: ' . Auth::user()->name);
            return Inertia::render('Landing/Index', [
                'auth' => [
                    'user' => Auth::user(),
                ]
            ]);
        }
        
        // Otherwise just render the landing page
        Log::info('No authenticated user, rendering landing page without auth');
        return Inertia::render('Landing/Index');
    }

    public function features()
    {
        return Inertia::render('Features/Index', [
            'auth' => Auth::check() ? ['user' => Auth::user()] : null
        ]);
    }

    public function about()
    {
        return Inertia::render('About/Index', [
            'auth' => Auth::check() ? ['user' => Auth::user()] : null
        ]);
    }
} 