<?php

namespace App\Models;

use App\Traits\HasImageUpload;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia

{
    use HasFactory, HasImageUpload;


    protected $fillable = [
        'name',
        'description',
        'price',  // 8 total digits, 2 after the decimal point
        'stock_quantity',
        'barcode', // Barcode or UPC code
        'is_active', // If the product is active and available for sale 
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
