<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;

class SessionController extends Controller
{
    /**
     * Extend session lifetime to 24 hours (1440 minutes)
     * This helps prevent frequent session expiration issues
     */
    public function extendSessionLifetime(Request $request)
    {
        // Set session lifetime to 24 hours
        Config::set('session.lifetime', 1440);
        
        // Regenerate session to apply changes
        $request->session()->regenerate();
        
        // Redirect back to previous page
        return back()->with('success', 'Session lifetime extended successfully');
    }
    
    /**
     * Reset session lifetime to default (120 minutes)
     */
    public function resetSessionLifetime(Request $request)
    {
        // Reset session to default lifetime
        Config::set('session.lifetime', 120);
        
        // Regenerate session to apply changes
        $request->session()->regenerate();
        
        // Redirect back to previous page
        return back()->with('success', 'Session lifetime reset to default');
    }
}
