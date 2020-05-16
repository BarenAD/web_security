<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SQLEjection extends Model
{
    protected $table = "SQLEjection";
    protected $fillable = [
        'text', 'created_name_user'
    ];
}
