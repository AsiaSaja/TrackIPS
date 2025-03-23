<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    //
    public function wifis(): HasMany{
        return $this->hasMany(Wifi::class);
    }
}
