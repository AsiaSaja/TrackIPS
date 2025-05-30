<?php

use Illuminate\Support\Facades\Route;
use App\Models\Jurusan;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\DeveloperPanelController;
use App\Http\Controllers\SessionController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Authentication routes for guests only
Route::middleware('guest')->group(function () {
    // Regular user login/register
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    
    // Admin login
    Route::get('/admin/login', [AdminAuthController::class, 'showLogin'])->name('admin.login');
    Route::post('/admin/login', [AdminAuthController::class, 'login']);
    
    // Developer login/register
    Route::get('/developer/login', [DeveloperPanelController::class, 'showLoginForm'])->name('developer.login');
    Route::post('/developer/login', [DeveloperPanelController::class, 'login']);
    Route::get('/developer/register', [DeveloperPanelController::class, 'showRegisterForm'])->name('developer.register');
    Route::post('/developer/register', [DeveloperPanelController::class, 'register']);
    
    // Redirect unauthenticated users to login page
    Route::get('/', function () {
        return redirect()->route('login');
    });
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');
Route::post('/developer/logout', [DeveloperPanelController::class, 'logout'])->middleware('auth:developer')->name('developer.logout');

// Session handling routes
Route::get('/session/extend', [SessionController::class, 'extendSessionLifetime'])->name('session.extend');
Route::get('/session/reset', [SessionController::class, 'resetSessionLifetime'])->name('session.reset');

// Developer routes
Route::middleware('auth:developer')->prefix('developer')->name('developer.')->group(function () {
    Route::get('/dashboard', [DeveloperPanelController::class, 'dashboard'])->name('dashboard');
    Route::post('/generate-api-key', [DeveloperPanelController::class, 'generateApiKey'])->name('generate-api-key');
});

// Protected routes - only accessible when authenticated
Route::middleware('auth')->group(function () {
    // Landing pages
    Route::get('/home', [LandingController::class, 'index'])->name('home');
    Route::get('/features', [LandingController::class, 'features'])->name('features');
    Route::get('/about', [LandingController::class, 'about'])->name('about');
});

// Default route for guest users - redirect to login page
Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('home');
    }
    return redirect()->route('login');
})->name('welcome');

// Test route
Route::get('/tes', function () {
    return "Oke";
});

// Debug route to test redirection
Route::get('/debug-redirect', function () {
    return redirect('/home')->with('debug', 'Testing redirect to home page');
});

// Debug route to check user creation
Route::get('/debug-users', function () {
    try {
        // Test database connection
        $connection = DB::connection()->getPdo();
        $dbInfo = [
            'connection' => 'Connected to database: ' . DB::connection()->getDatabaseName(),
            'users_table' => Schema::hasTable('users') ? 'users table exists' : 'users table does not exist'
        ];
        
        // Get table structure
        $columns = Schema::getColumnListing('users');
        
        // Count existing users
        $userCount = \App\Models\User::count();
        
        // Try to create a test user
        $testUser = \App\Models\User::create([
            'name' => 'Test User ' . rand(1000, 9999),
            'email' => 'test' . rand(1000, 9999) . '@example.com',
            'password' => bcrypt('Password123'),
            'status' => 'Mahasiswa',
        ]);
        
        return response()->json([
            'database' => $dbInfo,
            'table_columns' => $columns,
            'existing_users' => $userCount,
            'test_user_created' => $testUser ? true : false,
            'test_user' => $testUser
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Debug route for testing transaction
Route::get('/debug-transaction', function () {
    try {
        // Begin a transaction
        DB::beginTransaction();
        
        // Create a user within the transaction
        $user = \App\Models\User::create([
            'name' => 'Transaction Test ' . rand(1000, 9999),
            'email' => 'transaction' . rand(1000, 9999) . '@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('Password123'),
            'status' => 'Mahasiswa',
        ]);
        
        // Commit the transaction
        DB::commit();
        
        // Verify after transaction
        $userFound = \App\Models\User::find($user->id);
        
        return response()->json([
            'user_created' => $user ? true : false,
            'user_data' => $user,
            'user_found_after_transaction' => $userFound ? true : false,
            'user_found_data' => $userFound
        ]);
    } catch (\Exception $e) {
        // Roll back transaction on error
        DB::rollBack();
        
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Debug route for testing register controller directly
Route::get('/debug-register', function () {
    try {
        // Create a mock request with registration data
        $request = new \Illuminate\Http\Request();
        $request->replace([
            'name' => 'Direct Test ' . rand(1000, 9999),
            'email' => 'direct' . rand(1000, 9999) . '@example.com',
            'password' => 'Password123',
            'password_confirmation' => 'Password123',
        ]);
        
        // Get the controller instance
        $controller = new \App\Http\Controllers\AuthController();
        
        // Call the register method directly
        $response = $controller->register($request);
        
        // Check if the user was created
        $user = \App\Models\User::where('email', $request->email)->first();
        
        return response()->json([
            'request_data' => $request->only(['name', 'email']),
            'response_type' => get_class($response),
            'user_created' => $user ? true : false,
            'user_data' => $user
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});

// Debug route for simulating a POST request to register
Route::get('/debug-post-register', function () {
    try {
        // Data for registration
        $data = [
            'name' => 'POST Test ' . rand(1000, 9999),
            'email' => 'post' . rand(1000, 9999) . '@example.com',
            'password' => 'Password123',
            'password_confirmation' => 'Password123',
        ];
        
        // Create a CSRF token
        $token = csrf_token();
        
        // Prepare the curl request
        $ch = curl_init('http://' . request()->getHttpHost() . '/register');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, array_merge($data, ['_token' => $token]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'X-CSRF-TOKEN: ' . $token,
            'X-Requested-With: XMLHttpRequest'
        ]);
        
        // Execute the request
        $response = curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);
        
        // Check if user was created after request
        $user = \App\Models\User::where('email', $data['email'])->first();
        
        return response()->json([
            'request_data' => $data,
            'curl_info' => $info,
            'user_created' => $user ? true : false,
            'user_data' => $user,
            'response_length' => strlen($response),
            'response_preview' => substr($response, 0, 500) . '...'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ], 500);
    }
});
