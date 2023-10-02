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
        Schema::create('cash_drawer_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cash_drawer_id'); // Foreign key to the cash_drawer table.
            $table->enum('action', ['open', 'close', 'cash_in', 'cash_out', 'adjustment']); // The action/type of log.
            $table->decimal('amount', 8, 2)->nullable(); // Amount affected (if applicable).
            $table->text('notes')->nullable(); // Optional notes or reasons for the action.
            $table->unsignedBigInteger('user_id'); // Foreign key to identify which user performed the action.
            $table->timestamps();

            // Foreign key constraints.
            $table->foreign('cash_drawer_id')->references('id')->on('cash_drawers')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_drawer_logs');
    }
};
