<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ViewController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $view = 'guest';

        if (Auth::check()) {
            $view = $request->user()->admin ? 'admin' : 'user';
        }

        return response()->view($view);
    }
}
