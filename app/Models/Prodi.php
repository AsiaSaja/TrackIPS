<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Prodi extends Model
{
    //
    public function jurusan(): BelongsTo{
        return $this->belongsTo(Jurusan::class);
    }

    public function users(): HasMany{
        return $this->hasMany(User::class);
    }
}
