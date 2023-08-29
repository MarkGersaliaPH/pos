<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends CrudController
{
    // 
    public function __construct(Product $data)
    {
        parent::__construct($data);
    }

    protected $index = 'Admin/Products/Index';
    protected $indexUrl = 'admin.products.index';
    protected $form = 'Admin/Products/Form';

    protected function validationRules()
    {
        return [
            'name' => 'required',
            'price' => 'required',
            'sku' => 'required',
            'stock_quantity' => 'required',
        ];
    }

    protected function additionalItem()
    {
        $categories = Category::whereIsActive(1)->get();

        return $categories;
    }



    protected function withRelation()
    {
        return ['category'];
    }
}
