<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\APIController;
use App\User;
use App\Profile;

class UserController extends APIController
{
    public function index(){

        if(! $user=auth()->user()){
            return $this->responseUnauthorized();
        }

         $users=User::paginate(4);
         $profiles=Profile::paginate(4);

        return response()->json([
            'users'=>$users,
            'profiles'=>$profiles
        ]);

    }
}
