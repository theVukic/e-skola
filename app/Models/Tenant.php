<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tenant extends Model
{
    use HasFactory;

    public $timestamps = false; 
    protected $primaryKey = 'tenant_id';

    protected $fillable = [
        'school_name',
        'address', 
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'tenant_id', 'tenant_id');
    }
}