<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Facility extends Model
{
    protected $fillable = [
        'name', 'type', 'location', 'description', 'capacity',
        'hourly_rate', 'image_url', 'status', 'managed_by',
    ];

    protected function casts(): array
    {
        return ['hourly_rate' => 'decimal:2'];
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'managed_by');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }
}
