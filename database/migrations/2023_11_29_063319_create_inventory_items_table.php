<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id(); 
            $table->string('name');
            $table->integer('category_id');
            $table->integer('initial_quantity');
            $table->integer('current_quantity');
            $table->decimal('normal_price', 8, 2);
            $table->decimal('selling_price', 8, 2);
            $table->integer('created_by');
            $table->boolean('is_active')->default(true); // If the product is active and available for sale
      
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_items');
    }
};
