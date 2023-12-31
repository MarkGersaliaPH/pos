<?php

namespace App\Http\Controllers;

use App\Models\InventoryCategory;
use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends CrudController
{
    //
    

    public function __construct(InventoryItem $data)
    {
        parent::__construct($data);
    }

    
    protected $index = 'Admin/InventoryItems/Index';
    protected $indexUrl = 'admin.inventories.index';
    protected $form = 'Admin/InventoryItems/Form';

    
    public function create()
    { 
        $categories = InventoryCategory::where('is_active',1)->orderBy('order')->get();
        return Inertia::render($this->form, ['categories' => $categories]);
    }


    public function defaultOrder($query)
    {
       return $query->latest();
    }
     
    
    protected function withRelation()
    {
        return ['category'];
    }

    public function edit($id)
    {
        $item = $this->model->findOrFail($id);

        $categories = InventoryCategory::where('is_active',1)->orderBy('order')->get();

        return Inertia::render($this->form, ['item' => $item, 'categories' => $categories]);
    }

}
