<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Models\Category;
use App\Models\InventoryItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'category_id' => 'required',
            'stock_quantity' => 'required',
        ];
    }
 
    
    public function edit($id)
    {
        $item = $this->model->findOrFail($id);
 
        $categories = Category::whereIsActive(1)->get();

        // $inventory_items = InventoryItem::whereIsActive(1)->with('category')->get()->groupBy('category.name');
        $inventory_items = InventoryItem::whereIsActive(1)->with('category')->get();
      
        return Inertia::render($this->form, ['item' => $item, 'categories' => $categories,'inventory_items'=>$inventory_items]);
    }


    protected function withRelation()
    {
        return ['category'];
    }
}
