<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AddToCartController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id' => [
                'required',
                'bail',
                'integer',
                'exists:App\Models\Donut,id',
            ],
        ]);

        $user = $request->user();

        if (!Cart::where('user_id', '=', $user->id)->where('donut_id', '=', $validated['id'])->increment('count')) {
            $cart = new Cart();

            $cart->user_id = $user->id;
            $cart->donut_id = $validated['id'];
            $cart->count = 1;

            $cart->save();
        }

        return response()->json(['message' => 'Успішно добавлено в корзину.']);
    }
}
