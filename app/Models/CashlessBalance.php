<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashlessBalance extends Model
{
    use HasFactory;
    protected $fillable = ['cash_drawer_id','type','opening_balance','expected_balance','closing_balance'];
       
    public function cashDrawerManagement()
{
    return $this->belongsTo(CashDrawer::class);
}
}
