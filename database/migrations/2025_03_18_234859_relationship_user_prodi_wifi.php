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
        //
        Schema::table('users',function (Blueprint $table) {
            $table->foreignId('prodi_id')->nullable()->constrained('prodis');
            $table->string('BSSID')->nullable();
            $table->foreign('BSSID')->references('BSSID')->on('wifis');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users',function (Blueprint $table) {
            $table->dropForeign(['BSSID']);
            $table->dropForeign(['prodi_id']);
        }); 
    }
};
