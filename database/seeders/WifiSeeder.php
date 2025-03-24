<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WifiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('wifis')->insert([
            // 'name' => Str::random(10),
            // 'email' => Str::random(10).'@example.com',
            // 'password' => Hash::make('password'),
        ]);
    }
}
