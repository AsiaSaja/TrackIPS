<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Attempt debugging - log the authentication attempt
        Log::info('Login attempt for email: ' . $credentials['email']);

        // Check if the email exists
        $user = \App\Models\User::where('email', $credentials['email'])->first();
        
        if (!$user) {
            Log::info('Authentication failed: Email not found');
            return back()->withErrors([
                'email' => 'No account found with this email address.',
            ])->onlyInput('email');
        }

        // Now attempt authentication
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();
            Log::info('User authenticated successfully: ' . $user->name . ' with status: ' . $user->status);
            
            // Redirect based on user status
            if ($user->status === 'Admin') {
                Log::info('Redirecting admin to /admin');
                return redirect('/admin'); // Redirect to Filament dashboard
            } else {
                Log::info('Redirecting regular user to /home');
                return redirect()->intended('/home'); // Regular users go to home/landing page
            }
        }

        // If we got here, the password was incorrect
        Log::info('Authentication failed: Invalid password');
        return back()->withErrors([
            'password' => 'The password you entered is incorrect.',
        ])->onlyInput('email');
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        // Log the registration attempt with full request data
        Log::info('Registration request received: ' . json_encode([
            'method' => $request->method(),
            'url' => $request->url(),
            'data' => $request->all(),
            'headers' => $request->header(),
            'ajax' => $request->ajax(),
            'wantsJson' => $request->wantsJson()
        ]));
        
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            ], [
                'password.min' => 'Password must be at least 8 characters',
                'password.regex' => 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            ]);
            
            Log::info('Validation passed for data: ' . json_encode($request->only(['name', 'email'])));
            
            // Start a transaction
            DB::beginTransaction();
            
            try {
                // Use Hash facade directly instead of bcrypt helper
                $hashedPassword = Hash::make($validated['password']);
                Log::info('Password hashed successfully');
                
                $userData = [
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => $hashedPassword,
                    'status' => 'Mahasiswa',
                ];
                
                Log::info('Attempting to create user with data: ' . json_encode(array_merge(
                    array_diff_key($userData, ['password' => '']), 
                    ['password' => '[HIDDEN]']
                )));
                
                $user = User::create($userData);
                
                // Check if user was actually created
                if ($user && $user->exists) {
                    Log::info('User created successfully: ID=' . $user->id . ', Email=' . $user->email);
                    
                    // Verify the user exists in the database
                    $userCheck = User::find($user->id);
                    if ($userCheck) {
                        Log::info('User verified in database with ID=' . $userCheck->id);
                    } else {
                        Log::error('User not found in database immediately after creation');
                        throw new \Exception('User not found in database after creation');
                    }
                } else {
                    Log::error('User::create returned but user does not exist');
                    throw new \Exception('User creation failed');
                }
                
                // Commit the transaction
                DB::commit();
                Log::info('Transaction committed successfully');
                
                // Just before redirecting, store the user ID in a special debug log
                Log::info('REGISTRATION SUCCESS: User ID ' . $user->id . ' (' . $user->email . ') was created and is being redirected to login page');
                
                // Prepare response based on request type
                if ($request->wantsJson() || $request->ajax()) {
                    Log::info('Returning JSON response for registration success');
                    return response()->json([
                        'success' => true,
                        'message' => 'Registrasi berhasil!',
                        'redirect' => '/login'
                    ]);
                }
                
                Log::info('Redirecting to login page after successful registration');
                return redirect('/login')->with('success', 'Registrasi berhasil! Silakan login.');
                
            } catch (\Exception $e) {
                // Roll back the transaction
                DB::rollBack();
                Log::error('Transaction rolled back due to error');
                
                Log::error('Registration error: ' . $e->getMessage());
                Log::error('Error stack trace: ' . $e->getTraceAsString());
                
                if ($request->wantsJson() || $request->ajax()) {
                    return response()->json([
                        'success' => false,
                        'errors' => ['error' => 'Gagal melakukan registrasi: ' . $e->getMessage()]
                    ], 422);
                }
                
                return back()->withErrors(['error' => 'Gagal melakukan registrasi: ' . $e->getMessage()]);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error: ' . json_encode($e->errors()));
            
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'success' => false,
                    'errors' => $e->errors()
                ], 422);
            }
            
            throw $e; // Re-throw for the default handler
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
} 