<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', App\Http\Controllers\IndexController::class);
Route::get('/view', App\Http\Controllers\ViewController::class);
Route::get('/donuts', App\Http\Controllers\DonutsController::class);

Route::post('/sign-up', App\Http\Controllers\SignUpController::class)->middleware('guest');
Route::post('/sign-in', App\Http\Controllers\SignInController::class)->middleware('guest');

Route::post('/sign-out', App\Http\Controllers\SignOutController::class)->middleware('auth');
Route::post('/profile', App\Http\Controllers\ProfileController::class)->middleware('auth');
Route::post('/profile-change', App\Http\Controllers\ProfileChangeController::class)->middleware('auth');
Route::post('/profile-delete', App\Http\Controllers\ProfileDeleteController::class)->middleware('auth');
Route::post('/profile-password-change', App\Http\Controllers\ProfilePasswordChangeController::class)->middleware('auth');

Route::post('/cart', App\Http\Controllers\CartController::class)->middleware(['auth', 'client']);
Route::post('/add-to-cart', App\Http\Controllers\AddToCartController::class)->middleware(['auth', 'client']);
Route::post('/remove-from-cart', App\Http\Controllers\RemoveFromCartController::class)->middleware(['auth', 'client']);
