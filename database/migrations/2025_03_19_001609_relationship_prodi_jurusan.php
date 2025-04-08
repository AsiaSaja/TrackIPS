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
        Schema::table('prodis',function (Blueprint $table) {
            $table->foreignId('jurusan_id')->constrained('jurusans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prodis',function (Blueprint $table) {
            $table->dropForeign(['jurusan_id']);
        }); 
    }
};
