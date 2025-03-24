<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('jurusans')->insert([
            [
                'name' => 'Teknik Informatika',
                'established_date' => '2021-09-06',
            ],
            [
                'name' => 'Teknik',
                'established_date' => '2021-09-06',
            ],
            [
                'name' => 'Kesehatan',
                'established_date' => '2021-09-06',
            ]
        ]);
    }
}
