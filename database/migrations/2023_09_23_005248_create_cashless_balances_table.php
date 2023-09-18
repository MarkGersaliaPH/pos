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
        Schema::create('cashless_balances', function (Blueprint $table) {
            $table->id(); 
            $table->unsignedBigInteger('cash_drawer_id')->index();
            $table->string('type'); // For simplicity, using a string. However, consider enum or a separate table if there are many types.
            $table->decimal('opening_balance', 8, 2);
            $table->decimal('expected_balance', 8, 2);
            $table->decimal('closing_balance', 8, 2)->nullable(); // Optional, as mentioned.
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cashless_balances');
    }
};
