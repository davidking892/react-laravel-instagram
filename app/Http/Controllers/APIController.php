<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class APIController extends Controller
{

    public function responseSuccess($message='Success.'){
        return response()->json([
            'status'=>200,
            'message'=>$message,
        ],200);
    }

    public function responseUnauthorized($errors=['Unauthorized']){
        return response()->json([
            'status'=>401,
            'errors'=>$errors
        ],401);
    }

    public function responseUnprocessable($errors){
        return response()->json([
            'status'=>422,
            'errors'=>$errors
        ],422);
    }

    public function reponseServerError($errors=['Server error.']){
      return response()->json([
          'status'=>500,
          'errors'=>$errors
      ],500);
    }

}
