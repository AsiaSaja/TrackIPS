<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    // Get all columns in the users table
    $columns = DB::select('SHOW COLUMNS FROM users');
    
    echo "Users table columns:\n";
    foreach ($columns as $column) {
        echo "- {$column->Field} ({$column->Type})\n";
    }

    // Check if status column exists
    $statusExists = DB::select("SELECT COUNT(*) as count FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'status'");
    echo "\nStatus column exists: " . ($statusExists[0]->count > 0 ? 'Yes' : 'No') . "\n";

    // Try to create a test user
    echo "\nAttempting to create a test user...\n";
    $user = \App\Models\User::create([
        'name' => 'Test User ' . time(),
        'email' => 'test' . time() . '@example.com',
        'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        'status' => 'Mahasiswa'
    ]);
    
    echo "User created successfully with ID: {$user->id}\n";
    
    // Try to retrieve all users 
    $users = \App\Models\User::all();
    echo "\nTotal users in database: " . count($users) . "\n";
    foreach ($users as $u) {
        echo "- {$u->id}: {$u->name} ({$u->email})" . (isset($u->status) ? " - Status: {$u->status}" : " - No status") . "\n";
    }
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 