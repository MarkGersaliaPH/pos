<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashDrawer extends Model
{
    use HasFactory;

    protected $fillable = [
        'branch_id',
        'user_id',
        'opening_balance',
        'closing_balance',
        'sales_total',
        'expected_balance',
        'notes',
        'opened_at',
        'closed_at'
    ];

    public function cashless_balances()
    {
        return $this->hasMany(CashlessBalance::class);
    }

    public function cashier(){
        return $this->belongsTo(User::class,'user_id');
    }
    protected static function booted()
    {

        static::creating(function ($model) {
            $model->expected_balance = request()->get('opening_balance');
            $model->user_id = auth()->id();

          
        }); 
        static::created(function ($model) {
            
            if(request()->has('cashless_balance')){
                $cashlessArr = request()->get('cashless_balance');
                foreach ($cashlessArr as $key => $value) {  
                    $cashlessArr[$key]['cash_drawer_id'] = $model->id;
                    $cashlessArr[$key]['expected_balance'] = $value['opening_balance']; 
                    $cashlessArr[$key]['user_id'] = auth()->id(); 
                } 
            }
            $model->cashless_balances()->createMany($cashlessArr);
        }); 
 
    }
}
