<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class SignInController  extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => [
                'required',
                'bail',
                'string',
                'email',
                'exists:App\Models\User,email',
            ],
            'password' => [
                'required',
                'bail',
                'string',
                'min:8',
                'max:30',
                'regex:/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*;_])[a-zA-Z0-9!@#$%^&*;_]{8,30}$/',
            ]
        ]);

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages(['password' => __('validation.invalid_credentials')]);
        }

        $request->session()->regenerate();

        return response()->json();
    }
}
