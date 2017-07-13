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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/test', function(){
    $temp = [
        0 => [
            'id' => 1,
            'name' => 'test',
            'done' => false
        ],
        1 => [
            'id' => 2,
            'name' => 'test1',
            'done' => false
        ],
        2 => [
            'id' => 3,
            'name' => 'test2',
            'done' => false
        ],
    ];
   return $temp;
});
