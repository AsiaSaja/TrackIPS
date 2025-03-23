<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wifi extends Model
{
    //
    protected $primaryKey = 'BSSID';
    protected $keyType = 'String';
    public $incrementing = false;

    public function room(): BelongsTo{
        return $this->belongsTo(Room::class);
    }

    public function users(): HasMany{
        return $this->hasMany(User::class,'BSSID','BSSID');
    }
}
