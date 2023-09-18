<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentMethodsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paymentMethods = [
            ['name' => 'Cash', 'is_enabled' => true],
            ['name' => 'Card', 'is_enabled' => true],
            ['name' => 'Gcash', 'is_enabled' => true],
            ['name' => 'PayMaya', 'is_enabled' => true],
        ];

        foreach ($paymentMethods as $method) {
            DB::table('payment_methods')->insert($method);
        }
    }
}
