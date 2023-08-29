<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends CrudController
{
    //

    public function __construct(Category $data)
    {
        parent::__construct($data);
    }

    protected $index = 'Admin/Categories/Index';
    protected $indexUrl = 'admin.categories.index';
    protected $form = 'Admin/Categories/Form';
}
