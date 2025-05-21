<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Developer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Config;

class DeveloperPanelController extends Controller
{
    public function dashboard()
    {
        $developer = Auth::guard('developer')->user();
        
        return Inertia::render('Developer/Dashboard', [
            'developer' => $developer->only(['name', 'email', 'api_key']),
            'api_docs' => $this->getApiDocs()
        ]);
    }

    public function generateApiKey(Request $request)
    {
        $developer = Auth::guard('developer')->user();
        
        try {
            $apiKey = $developer->generateApiKey();
            return redirect()->back()->with('success', 'API Key berhasil dibuat: '.$apiKey);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal membuat API Key: '.$e->getMessage());
        }
    }

    public function showLoginForm()
    {
        return Inertia::render('Developer/Login');
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
            
            if (Auth::guard('developer')->attempt($credentials)) {
                // Extend session lifetime to 24 hours
                Config::set('session.lifetime', 1440);
                
                
                $request->session()->regenerate();
                $developer = Auth::guard('developer')->user();
                // dd($developer);
                return redirect()->intended(route('developer.dashboard'))
                    ->with('success', 'Login berhasil! Selamat datang, ' . $developer->name . '.');


            }

            // Kredensial tidak valid, kirim error
            return back()
                ->withInput($request->only('email', 'remember'))
                ->withErrors([
                    'email' => 'Email atau password yang Anda masukkan salah.',
                ]);
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            return back()
                ->withInput($request->only('email', 'remember'))
                ->with('error', 'Terjadi kesalahan saat login: ' . $e->getMessage());
        }
    }

    public function showRegisterForm()
    {
        return Inertia::render('Developer/Register');
    }

    public function register(Request $request)
    {
        try {
            // Log registration attempt
            Log::info('Developer registration attempt', ['email' => $request->email]);
            
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:developers',
                'phone_num' => 'required|string|max:20',
                'password' => 'required|string|min:8|confirmed',
            ]);

            $developer = Developer::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone_num' => $validated['phone_num'],
                'password' => Hash::make($validated['password']),
                'api_key' => Str::random(60),
            ]);

            Log::info('Developer created successfully', ['id' => $developer->id, 'email' => $developer->email]);
            
            Auth::guard('developer')->login($developer);

            return redirect()->route('developer.dashboard')
                ->with('success', 'Registrasi berhasil! Selamat datang di Developer Dashboard');

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Tangani kesalahan validasi
            Log::error('Developer registration validation error', ['errors' => $e->errors()]);
            return back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            // Tangani kesalahan lainnya
            Log::error('Developer registration error', ['error' => $e->getMessage()]);
            return back()
                ->withInput()
                ->with('error', 'Gagal registrasi: ' . $e->getMessage());
        }
    }

    public function logout(Request $request)
    {
        $developer = Auth::guard('developer')->user();
        if ($developer) {
            Log::info('Developer logout: ' . $developer->email);
        }
        
        Auth::guard('developer')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('developer.login')->with('success', 'Anda berhasil logout dari akun developer.');
    }

    private function getApiDocs()
    {
        return [
            'endpoints' => [
                [
                    'method' => 'GET',
                    'url' => '/api/v1/locations',
                    'description' => 'Get all tracked locations',
                    'auth' => 'API Key required'
                ],
                [
                    'method' => 'POST',
                    'url' => '/api/v1/authenticate',
                    'description' => 'Get access token',
                    'params' => ['api_key' => 'string']
                ]
            ]
        ];
    }
}