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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_id');
            $table->integer('user_id');
            $table->decimal('total_amount', 8, 2);  // 8 total digits, 2 after the decimal point
            $table->decimal('subtotal_amount', 8, 2);  // 8 total digits, 2 after the decimal point
            $table->decimal('tax_amount', 8, 2)->nullable();  // 8 total digits, 2 after the decimal point
            $table->decimal('discount_amount', 8, 2)->nullable();  // 8 total digits, 2 after the decimal point
            $table->integer('payment_method');  // 8 total digits, 2 after the decimal point 
            $table->integer('order_status');  // 8 total digits, 2 after the decimal point
            $table->decimal('payment_recieved', 8, 2);  // 8 total digits, 2 after the decimal point
            $table->decimal('payment_change', 8, 2);  // 8 total digits, 2 after the decimal point
            $table->decimal('shipping_fee', 8, 2)->nullable();  // 8 total digits, 2 after the decimal point
            $table->mediumText('notes')->nullable();  // 8 total digits, 2 after the decimal point
            $table->integer('order_type');  // 8 total digits, 2 after the decimal point
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
