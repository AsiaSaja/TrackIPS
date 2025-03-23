<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jurusan extends Model
{
    //
    public function prodis(): HasMany{
        return $this->hasMany(Prodi::class);
    }
}
