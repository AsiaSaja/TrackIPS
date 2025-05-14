<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add missing fields
            if (!Schema::hasColumn('users', 'status')) {
                $table->enum('status', ['Mahasiswa', 'Dosen', 'Admin'])->nullable()->after('name');
            }
            
            if (!Schema::hasColumn('users', 'phone_num')) {
                $table->string('phone_num')->nullable()->after('status');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'status')) {
                $table->dropColumn('status');
            }
            
            if (Schema::hasColumn('users', 'phone_num')) {
                $table->dropColumn('phone_num');
            }
        });
    }
};
