<?php

use Illuminate\Http\Request;

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

Route::group([
    'middleware'=>'cors',
    'prefix'=>'v1/auth'
],function($router){
    Route::post('register','Auth\RegisterController@register');
    Route::post('login','Auth\LoginController@login');
});

Route::group([
    'middleware'=>'cors'
],function($router){
    Route::post('profile','ProfileController@index');
    Route::post('p','PostsController@store');
    Route::post('profile/update','ProfileController@update');
    Route::post('users','UserController@index');
});
