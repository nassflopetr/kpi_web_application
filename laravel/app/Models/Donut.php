<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donut extends Model
{
    use HasFactory;

    protected function src(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return asset($value);
            }
        );
    }
}
