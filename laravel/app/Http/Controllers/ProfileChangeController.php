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

class ProfileChangeController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

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
                function ($attribute, $value, $fail) use ($user) {
                    if (User::where([['id', '<>', $user->id], ['phone', '=', $value],])->count() > 0) {
                        $fail( __('validation.unique', ['attribute' => $attribute]));
                    }
                }
            ],
            'email' => [
                'required',
                'bail',
                'string',
                'email',
                function ($attribute, $value, $fail) use ($user) {
                    if (User::where([['id', '<>', $user->id], ['email', '=', $value],])->count() > 0) {
                        $fail( __('validation.unique', ['attribute' => $attribute]));
                    }
                }
            ]
        ]);

        $user->first_name = $credentials['first_name'];
        $user->last_name = $credentials['last_name'];
        $user->address = $credentials['address'];
        $user->phone = $credentials['phone'];
        $user->email = $credentials['email'];

        $user->save();

        return response()->json(['message' => 'Облікові дані успішно змінено.']);
    }
}
