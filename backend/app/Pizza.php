<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
