<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\CrudController;
use App\Models\CashDrawer;
use App\Models\CashDrawerLog;
use App\Models\Order;
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
    protected $show = 'Admin/CashDrawer/Show';

    public function defaultOrder($query)
    {
       return $query->latest();
    }
    
    protected function withRelation()
    {
        return ['cashless_balances', 'cashier'];
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

    public function histories()
    {
        dd("ASdasdasd");
    }

    public function sales($id)
    {
        $activeDrawer = CashDrawer::find($id);
        $startDate = $activeDrawer->opened_at;
        $endDate = $activeDrawer->closed_at ?? now();
        $orders = Order::with(['payment_method', 'cashier'])->latest()->whereCreatedAtBetween($startDate, $endDate)->paginate();

        return Inertia::render('Admin/CashDrawer/Sales', ['items' => $orders, 'cash_drawer_id' => $id]);
    }

    public function logs($id)
    {
        $logs = CashDrawerLog::with('performed_by')->latest()->whereCashDrawerId($id)->paginate();

        return Inertia::render('Admin/CashDrawer/Logs', ['items' => $logs, 'cash_drawer_id' => $id]);
    }

    public function getActiveDrawer()
    {
        return   $this->model->active()->with($this->withRelation())->first();
    }

    public function cashInAndOut(Request $request)
    {
        $activeDrawer = $this->getActiveDrawer(); 

        if (
            $request->type == "cash_out"
        ) {
            $activeDrawer->cashOutAmount($request->amount);
            if($request->is_expense){
                $activeDrawer->expenses += $request->amount; 
                $activeDrawer->save();
            }
        } else {
            $activeDrawer->cashInAmount($request->amount);
        }

        CashDrawerLog::create(
            [
                'cash_drawer_id' => $request->cash_drawer_id,
                'action' => $request->type,
                'amount' => $request->amount,
                'notes' => "Expense ".$request->reason,
                'user_id' => auth()->id()
            ]
        );

        return redirect()->back();
    }
}
