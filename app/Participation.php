<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Participation extends Model
{
    public function professional()
    {
        return $this->belongsToMany('App\Professional', 'professional_participations', 'participation_id', 'professional_id');
    }
}
