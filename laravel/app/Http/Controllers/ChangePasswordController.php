<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ChangePasswordController  extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'password' => [
                'required',
                'bail',
                'string',
                'min:8',
                'max:30',
                'regex:/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*;_])[a-zA-Z0-9!@#$%^&*;_]{8,30}$/',
            ],
            'new_password' => [
                'required',
                'bail',
                'string',
                'min:8',
                'max:30',
                'regex:/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*;_])[a-zA-Z0-9!@#$%^&*;_]{8,30}$/',
            ],
            'confirmation_new_password' => [
                'required',
                'bail',
                'string',
                'same:new_password'
            ]
        ]);

        if (!Hash::check($credentials['password'], Auth::user()->getAuthPassword())) {
            throw ValidationException::withMessages(['password' => __('validation.invalid_credentials')]);
        }

        $user = $request->user();

        $user->password = Hash::make($credentials['new_password']);

        $user->save();

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json(['message' => 'Пароль успішно змінено.']);
    }
}
