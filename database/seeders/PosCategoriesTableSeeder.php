<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PosCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Snacks', 'order' => 1],
            ['name' => 'Drinks', 'order' => 2],
            ['name' => 'Rice Meals', 'order' => 3],
            ['name' => 'Burgers', 'order' => 4],
        ];

        DB::table('categories')->insert($categories);
    }
}
