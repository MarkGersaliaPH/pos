<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Models\CashDrawer;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashDrawerController extends CrudController
{
    //

    
    // 
    public function __construct(CashDrawer $data)
    {
        parent::__construct($data);
    }

    protected $index = 'Admin/CashDrawer/Index';
    protected $indexUrl = 'admin.cash-drawer.index';
    protected $form = 'Admin/CashDrawer/Form';

    
    protected function withRelation()
    {
        return ['cashless_balances','cashier'];
    }
    public function index()
    {

        $item = $this->model->whereDate('opened_at', now()->toDateString())->with($this->withRelation())->first();
        
        return Inertia::render($this->index, ['item' => $item]);
    }

    
    
    protected function additionalItem()
    {
        $data = PaymentMethod::whereNotIn('id',[2,1])->get();

        return $data;
    }

    protected function validationRules()
    {
        return ['opening_balance'=>'numeric|required'];
    }

}
