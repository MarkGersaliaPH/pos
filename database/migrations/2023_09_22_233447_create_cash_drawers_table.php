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
        Schema::create('cash_drawers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('branch_id')->nullable()->index();  // Assuming you have a branches table
            $table->unsignedBigInteger('user_id')->index();    // Assuming you have a users table to track who opened/closed
            $table->decimal('opening_balance', 8, 2);
            $table->decimal('closing_balance', 8, 2)->nullable(); // It will be null when the drawer is opened and set when closed
            $table->decimal('sales_total', 8, 2)->default(0);
            $table->decimal('expected_balance', 8, 2)->default(0); // Could be calculated, but stored for efficiency
            $table->text('notes')->nullable();
            $table->timestamp('opened_at')->useCurrent();  // When the drawer was opened
            $table->timestamp('closed_at')->nullable();   // When the drawer was closed 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_drawers');
    }
};
