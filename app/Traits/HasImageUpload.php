<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\InteractsWithMedia;

trait HasImageUpload
{

    use InteractsWithMedia;  // Trait from Spatie's Media Library

    protected static function bootHasImageUpload()
    {

        // Append the 'image_url' accessor to the model
        static::retrieved(function ($model) {
            $model->append('image_url');
        });

        static::created(function ($model) {
            if (request()->hasFile('image')) {
                $model->addMediaFromRequest('image')->toMediaCollection('default');
            }
        });

        static::updating(function ($model) {
            if (request()->hasFile('image')) {
                // Delete old image
                $model->clearMediaCollection('default');
                // Add new image
                $model->addMediaFromRequest('image')->toMediaCollection('default');
            }
        });

        // Optional: Delete image when model is being deleted
        static::deleting(function ($model) {
            $model->clearMediaCollection('default');
        });
    }

    /**
     * Get URL of the associated image.
     *
     * @return string|null
     */
    public function getImageUrlAttribute()
    {
        return $this->getFirstMediaUrl('default');
    }
}
