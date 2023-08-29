<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosController extends Controller
{
    //

    public function index()
    {
        $category_id = request()->get('category_id');
        $data['categories'] = Category::All();
        $data['products'] = Product::when($category_id, function ($query, $category_id) {
            return $query->where('category_id', $category_id);
        })->where('is_active', 1)->get();
        return Inertia::render('Admin/Pos/Index', ['items' => $data]);
    }
}
