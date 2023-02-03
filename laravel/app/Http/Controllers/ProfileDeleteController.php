<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProfileDeleteController extends Controller
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
            'confirmation_password' => [
                'required',
                'bail',
                'string',
                'same:password'
            ]
        ]);

        if (!Hash::check($credentials['password'], Auth::user()->getAuthPassword())) {
            throw ValidationException::withMessages(['password' => __('validation.invalid_credentials')]);
        }

        $id = $request->user()->id;

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        if (User::where('id', '=', $id)->delete()) {
            $response = response()->json(['message' => 'Обліковий запис успішно видалено.']);
        } else {
            $response = response()->json(['message' => 'Спробуйте будь ласка, ще раз.'], 401);
        }

        return $response;
    }
}
