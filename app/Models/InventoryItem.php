<?php

namespace App\Models;

use App\Traits\HasImageUpload;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;

class InventoryItem extends Model implements HasMedia

{
    use HasFactory, HasImageUpload;


    protected $fillable = [ 
        'name',
        'category_id',
        'initial_quantity',
        'current_quantity',
        'normal_price',
        'selling_price',
        'created_by'
    ];


    protected static function booted()
    {

      
        static::creating(function ($model) {
            $model->current_quantity = request()->get("initial_quantity"); 
            $model->created_by = auth()->id(); 
        }); 
    }

    
    public function category()
    {
        return $this->belongsTo(InventoryCategory::class,'category_id');
    }
}
