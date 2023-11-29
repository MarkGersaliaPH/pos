<?php

namespace App\Models;

use Carbon\Carbon;
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
        'closed_at',
        'expenses',
    ];
    protected $dates = ['opened_at'];


    public function cashless_balances()
    {
        return $this->hasMany(CashlessBalance::class);
    }

    protected $appends = ['operation_hours', 'status'];

    public function getOperationHoursAttribute()
    {
        return  $this->created_at->diffForHumans();
    }

    public function getStatusAttribute()
    {
        return $this->closed_at ? "Closed" : "Active";
    }

    public function addToCurrentAmount($amount)
    {
        $this->sales_total += $amount;
        $this->expected_balance += $amount;
        $this->save();
    }

    public function cashInAmount($amount)
    {
        $this->expected_balance += $amount;
        $this->save();
    }


    public function cashOutAmount($amount)
    {
        $this->expected_balance -= $amount;
        $this->save();
    }



    public function removeToCurrentAmount($amount)
    {
        $this->sales_total -= $amount;
        $this->expected_balance -= $amount;
        $this->save();
    }


    public function scopeActive($query)
    {
        return $query->whereNull('closed_at');
        // return $query->whereDate('opened_at', now()->toDateString())->whereNull('closed_at');
    }

    public function logs()
    {
        return $this->hasMany(CashDrawerLog::class, 'cash_drawer_id');
    }

    public function cashier()
    {
        return $this->belongsTo(User::class, 'user_id')->withDefault();
    }
    protected static function booted()
    {

        static::creating(function ($model) {
            $model->expected_balance = request()->get('opening_balance');
            $model->user_id = auth()->id();
            $model->opened_at = now();
        });
        static::created(function ($model) {
            if (request()->has('cashless_balance')) {
                $cashlessArr = request()->get('cashless_balance');
                foreach ($cashlessArr as $key => $value) {
                    $cashlessArr[$key]['cash_drawer_id'] = $model->id;
                    $cashlessArr[$key]['expected_balance'] = $value['opening_balance'];
                    $cashlessArr[$key]['user_id'] = auth()->id();
                }
            }
            CashDrawerLog::create(
                [
                    'cash_drawer_id' => $model->id,
                    'action' => "open",
                    'amount' => request()->get('opening_balance'),
                    'notes' => 'Open the drawer',
                    'user_id' => auth()->id()
                ]
            );

            $model->cashless_balances()->createMany($cashlessArr);
        });

        static::updating(function ($model) {
            if (request()->get('closing_balance')) {
                $model->closed_at = now();
                CashDrawerLog::create(
                    [
                        'cash_drawer_id' => $model->id,
                        'action' => "close",
                        'amount' => request()->get('closing_balance'),
                        'notes' => 'Close the drawer',
                        'user_id' => auth()->id()
                    ]
                );
            }
        });
    }
}
