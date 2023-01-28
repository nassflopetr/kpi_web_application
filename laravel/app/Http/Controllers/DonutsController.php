<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Donut;

class DonutsController  extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $donuts = Donut::select('id', 'src', 'title', 'description', 'price')->orderByDesc('updated_at')->get()->toArray();

        return response()->json($donuts);
    }
}
