<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        try {
            // Directly add missing columns without conditional checks
            Schema::table('users', function (Blueprint $table) {
                $table->enum('status', ['Mahasiswa', 'Dosen', 'Admin'])->nullable()->after('name');
                $table->string('phone_num')->nullable()->after('status');
            });
            
            // Log success message
            DB::statement("INSERT INTO migrations (migration, batch) VALUES ('manual_fix_status_and_phone_fields', (SELECT MAX(batch) + 1 FROM migrations))");
        } catch (\Exception $e) {
            // Log error for debugging
            \Illuminate\Support\Facades\Log::error('Failed to add columns: ' . $e->getMessage());
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['status', 'phone_num']);
        });
    }
};
