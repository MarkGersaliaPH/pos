<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashDrawerLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'cash_drawer_id',
        'action',
        'amount',
        'notes',
        'user_id'
    ];

    protected $dates = ['created_at'];

    public function cash_drawer()
    {
        return $this->belongsTo(CashDrawer::class, 'cash_drawer_id');
    }


    public function performed_by()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
