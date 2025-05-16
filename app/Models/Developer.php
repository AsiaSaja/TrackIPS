<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;

class Developer extends Authenticatable
{
    protected $fillable = [
        'name',
        'phone_num',
        'email',
        'password',
        'api_key',
    ];

    protected $hidden = [
        'password',
    ];

    /**
     * Generate new API key for developer
     *
     * @return string
     */
    public function generateApiKey(): string
    {
        $apiKey = Str::random(32);
        $this->update(['api_key' => $apiKey]);
        
        return $apiKey;
    }
}
