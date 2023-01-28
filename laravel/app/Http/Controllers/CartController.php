<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'first_name' => [
                'required',
                'bail',
                'string',
                'max:255',
                'regex:/^[АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯяA-Z\'’\-]+$/i',
            ],
            'last_name' => [
                'bail',
                'nullable',
                'string',
                'max:255',
                'regex:/^[АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯяA-Z\'’\-]+$/i',
            ],
            'address' => [
                'bail',
                'nullable',
                'string',
                'max:255',
                'regex:/^[АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯяA-Z\'’\-,\s]+$/i',
            ],
            'phone' => [
                'bail',
                'nullable',
                'string',
                'max:255',
                'regex:/^(\+380)[0-9]{9}$/',
                'unique:App\Models\User,phone'
            ],
            'email' => [
                'required',
                'bail',
                'string',
                'email',
                'unique:App\Models\User,email'
            ],
            'password' => [
                'required',
                'bail',
                'string',
                'regex:/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*;_])[a-zA-Z0-9!@#$%^&*;_]{8,30}$/',
            ],
            'confirmation_password' => [
                'required',
                'bail',
                'string',
                'same:password'
            ]
        ]);

        $user = new User();

        $user->first_name = $credentials['first_name'];
        $user->last_name = $credentials['last_name'];
        $user->address = $credentials['address'];
        $user->phone = $credentials['phone'];
        $user->email = $credentials['email'];
        $user->password = Hash::make($credentials['password']);

        $user->save();

        return response()->json();
    }
}
