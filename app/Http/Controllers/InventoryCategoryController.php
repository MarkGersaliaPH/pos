<?php

namespace App\Http\Controllers;

use App\Models\InventoryCategory;
use Illuminate\Http\Request;

class InventoryCategoryController extends CrudController
{
    //
    

    public function __construct(InventoryCategory $data)
    {
        parent::__construct($data);
    }

    
    protected $index = 'Admin/InventoryCategories/Index';
    protected $indexUrl = 'admin.inventory-categories.index';
    protected $form = 'Admin/InventoryCategories/Form';
}
