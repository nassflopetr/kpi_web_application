<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsClient
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return response()->json(['message' => __('others.for_authenticated_users_only')], 401);
        } else if ($request->user()->admin) {
            return response()->json(['message' => __('others.for_clients_only')], 403);
        }

        return $next($request);
    }
}
