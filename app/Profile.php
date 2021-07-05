<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $guarded=[];

  //  $imagePath = ($this->image) ? $this->image : 'https://cdn.pixabay.com/photo/2015/11/04/20/59/milky-way-1023340__340.jpg';

    public function user(){
       return $this->belongsTo(User::class);
    }
}
