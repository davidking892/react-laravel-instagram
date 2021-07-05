<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Auth;

class LoginController extends APIController
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */
    public function login(){
        $credentials=request(['email','password']);

        if(! $token=auth()->attempt($credentials)){
            return $this->responseUnauthorized();
        }

        $user=auth()->user();

        return response()->json([
            'status'=>200,
            'message'=>'Authorized',
            'access_token'=>$token,
            'user'=>array(
                'id'=>$user->id,
                'name'=>$user->name,
                 'email'=>$user->email
            )
            ],200);

    }

 
}
