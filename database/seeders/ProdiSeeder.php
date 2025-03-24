<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('prodis')->insert([
            [
                'name' => 'D3 Teknik Informatika',
                'established_date' => '2021-09-06',
                'jurusan_id' => 1
            ],
            [
                'name' => 'S1 Terapan Rekayasa Perangkat Lunak',
                'established_date' => '2021-09-06',
                'jurusan_id' => 1
            ],
            [
                'name' => 'S1 Terapan Sistem Informasi Kota Cerdas',
                'established_date' => '2021-09-06',
                'jurusan_id' => 1
            ],
            [
                'name' => 'S1 Terapan Teknologi Rekayasa Komputer',
                'established_date' => '2021-09-06',
                'jurusan_id' => 1
            ],
            [
                'name' => 'D3 Teknik Mesin',
                'established_date' => '2021-09-06',
                'jurusan_id' => 2
            ],
            [
                'name' => 'D3 Teknik Pendingin',
                'established_date' => '2021-09-06',
                'jurusan_id' => 2
            ],
            [
                'name' => 'S1 Terapan Perancangan Manufaktur',
                'established_date' => '2021-09-06',
                'jurusan_id' => 2
            ],
            [
                'name' => 'S1 Terapan Teknologi Rekayasa Instrumentasi & Kontrol',
                'established_date' => '2021-09-06',
                'jurusan_id' => 2
            ],
            [
                'name' => 'D3 Keperawatan',
                'established_date' => '2021-09-06',
                'jurusan_id' => 3
            ],
        ]);
    }
}
