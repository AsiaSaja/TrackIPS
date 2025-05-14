<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminAccessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated with the filament guard and has Admin status
        if (!Auth::guard('filament')->check()) {
            // If not logged in with filament guard, redirect to admin login
            return redirect()->route('admin.login');
        }
        
        if (Auth::guard('filament')->user()->status !== 'Admin') {
            // If not an admin, log them out of all guards
            Auth::guard('web')->logout();
            Auth::guard('filament')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            
            return redirect()->route('admin.login')->with('error', 'You do not have admin privileges.');
        }

        return $next($request);
    }
}
