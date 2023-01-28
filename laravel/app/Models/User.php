<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected function admin(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return $value === 1;
            }
        );
    }

    protected function lastName(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return is_null($value) ? '' : $value;
            }
        );
    }

    protected function address(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return is_null($value) ? '' : $value;
            }
        );
    }

    protected function phone(): Attribute
    {
        return Attribute::make(
            get: function ($value) {
                return is_null($value) ? '' : $value;
            }
        );
    }
}
