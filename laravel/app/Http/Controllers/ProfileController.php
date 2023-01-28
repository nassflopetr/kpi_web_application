<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ProfileController  extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'address' => $user->address,
                'phone' => $user->phone,
                'email' => $user->email,
            ]
        ]);
    }
}
