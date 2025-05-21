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
        Schema::table('users', function (Blueprint $table) {
            // Drop the existing enum column
            $table->dropColumn('status');
        });

        Schema::table('users', function (Blueprint $table) {
            // Recreate it with the new values
            $table->enum('status', ['Mahasiswa', 'Dosen', 'Admin'])->nullable()->after('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the modified enum column
            $table->dropColumn('status');
        });

        Schema::table('users', function (Blueprint $table) {
            // Recreate it with the original values
            $table->enum('status', ['Mahasiswa', 'Dosen'])->nullable()->after('name');
        });
    }
};
