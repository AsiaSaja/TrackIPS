<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Config;

class AdminAuthController extends Controller
{
    public function showLogin()
    {
        if (Auth::check() && Auth::user()->status === 'Admin') {
            return redirect('/admin');
        }
        
        return Inertia::render('Admin/Login', [
            'error' => Session::get('error'),
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        // dd($request);
        // First check if the user is an admin
        if (Auth::validate($credentials)) {
            $user = Auth::getLastAttempted();
            
            if ($user->status === 'Admin') {
                // Extend session lifetime to 24 hours
                Config::set('session.lifetime', 1440);
                
                // Log in using both guards
                Auth::guard('web')->login($user, $request->filled('remember'));
                Auth::guard('filament')->login($user, $request->filled('remember'));
                
                $request->session()->regenerate();
                
                // Redirect to Filament dashboard with success message
                return redirect('/admin')->with('success', 'Login berhasil! Selamat datang, Admin.');
            } else {
                return back()->withErrors([
                    'email' => 'You do not have admin privileges.',
                ])->onlyInput('email');
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
}
