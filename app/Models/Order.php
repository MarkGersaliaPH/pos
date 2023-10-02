<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;


    protected $fillable = [
        'order_id',
        'user_id',
        'total_amount',
        'subtotal_amount',
        // 'tax_amount',
        // 'discount_amount',
        'payment_method',
        'order_status',
        'payment_recieved',
        'payment_change',
        'shipping_fee',
        'notes',
        'order_type',
        'cash_drawer_id'
    ];


    protected $dates = ['created_at'];



    protected $casts = [
        'created_at' => 'date:Y-m-d H:m:s',
    ];


    // protected $dateFormat = 'm/d/Y';


    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }
    public function cashier()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function payment_method()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method', 'id');
    }

    public function scopeWhereCreatedAtBetween($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }
}
