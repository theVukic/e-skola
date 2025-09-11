<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tenet extends Model
{
    use HasFactory;
    public $timestamps = fasle;
    protected $primaryKey = 'tenant_id';

    protected $fillable = [
        'school_name',
        'address_name',
    ];
}
