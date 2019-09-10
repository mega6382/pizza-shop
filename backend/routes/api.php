<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', ['as' => 'login', 'uses' => 'API\UserController@login']);
Route::post('register', 'API\UserController@register');
Route::group(['middleware' => 'auth:api'], function () {
    // Address routes
    Route::get('address/all', 'API\AddressController@getAll');
    Route::post('address/add', 'API\AddressController@add');

    // Orders routes
    Route::get('order/all', 'API\OrderController@getAll');
    Route::post('order/add', 'API\OrderController@add');
    Route::post('order/markCompleted/{order_id}', 'API\OrderController@markCompleted');
    Route::post('order/markCancelled/{order_id}', 'API\OrderController@getAll');
});

// Pizza route
Route::get('pizzas', 'API\PizzaController@getAll');
Route::get('pizza/{pizza_id}', 'API\PizzaController@getById');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
