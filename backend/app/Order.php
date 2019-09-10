<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function pizza()
    {
        return $this->belongsTo(Pizza::class);
    }
}
