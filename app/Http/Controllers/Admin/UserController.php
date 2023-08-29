<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends CrudController
{
    //
    public function __construct(User $user)
    {
        parent::__construct($user);
    }

    protected $index = 'Admin/Users/Index';
    protected $indexUrl = 'admin.users.index';
    protected $form = 'Admin/Users/Form';
    protected $show = 'admin.users.show';


    protected function validationRules()
    {
        return ['name' => 'required', 'email' => 'required|email|unique:users,email,' . $this->model->id, 'password' => 'required|confirmed',];
    }
}
