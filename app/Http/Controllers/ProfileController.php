<?php

namespace App\Http\Controllers;

use App\Profile;
use Illuminate\Http\Request;
use App\Http\Controllers\APIController;
use Intervention\Image\Facades\Image;
use App\User;
use Illuminate\Support\Facades\File;

class ProfileController extends APIController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        if(! $user=auth()->user()){
            return $this->responseUnauthorized();
       }

        $profile=$user->profile;
        $posts=$user->posts;

        return response()->json([
           'profile'=>$profile,
           'posts'=>$posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show(Profile $profile)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(User $user)
    {

      //  $this->authorize('update',$user->profile);

        $data=request()->validate([
            'title'=>'required',
            'description'=>'required',
            'url'=>'required',
            'image'=>''
        ]);

        $oldFile ='storage/'. request('oldImage');

          if(is_file($oldFile)){
            dd(File::delete($oldFile));
        }

        if(request('image')){
            $imagePath=request('image')->store('profile','public');

            $image=Image::make(public_path("storage/{$imagePath}"))->fit(1000,1000);
            $image->save();

            $imageArray=['image'=>$imagePath];

        }

        auth()->user()->profile->update(array_merge(
            $data,
            $imageArray ?? []
        ));


       return $this->responseSuccess('Profile Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }
}
