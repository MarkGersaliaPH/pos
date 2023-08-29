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
        Schema::create('products', function (Blueprint $table) {
            $table->id();  // Primary key
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);  // 8 total digits, 2 after the decimal point
            $table->string('sku')->unique();  // Stock Keeping Unit, unique
            $table->integer('stock_quantity')->default(0);
            $table->string('barcode')->nullable(); // Barcode or UPC code
            $table->boolean('is_active')->default(true); // If the product is active and available for sale
            $table->timestamps();  // created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
