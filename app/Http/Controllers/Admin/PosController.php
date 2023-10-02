<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CashDrawer;
use App\Models\CashlessBalance;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PaymentMethod;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;

class PosController extends Controller
{
    //

    public function index()
    {
        $category_id = request()->get('category_id');
        $data['categories'] = Category::All();
        $data['payment_methods'] = PaymentMethod::All();
        $data['products'] = Product::when($category_id, function ($query, $category_id) {
            return $query->where('category_id', $category_id);
        })->where('is_active', 1)->get();
        return Inertia::render('Admi    n/Pos/Index', ['items' => $data]);
    }

    public function store(Request $request)
    {

        $activeDrawer = CashDrawer::with('cashless_balances')->active()->first();

        $this->validate($request, $this->validationRules($request));

        $model = new Order;
        DB::beginTransaction();
        try {

            $requestData = $request->only($model->getFillable());
            $requestData['order_id'] = $this->generateUniqueOrderId();
            $requestData['user_id'] = auth()->id();
            $requestData['order_status'] = 1;
            $requestData['cash_drawer_id'] = $activeDrawer->id; 

            $model->fill($requestData);
            $model->save();

            $this->saveorder_items($request->products, $model->id);

            if ($requestData['payment_method'] != 1) {
                $this->addToCashLessAmount($requestData, $model, $activeDrawer);
            } else {
                $activeDrawer->addToCurrentAmount($request->total_amount);
            }

            $model->load(['order_items', 'order_items.product', 'payment_method']);

            DB::commit();

            return response()->json(['message' => 'Success', 'receipt_data' => $model]);
        } catch (\Exception $e) {
            dd($e);
            //throw $th;
            DB::rollBack();
        }
    }

    public function addToCashLessAmount($request, $model, $activeDrawer)
    {
        $payment_method = PaymentMethod::find($request['payment_method']);
        $cashlessBalance = CashlessBalance::where('cash_drawer_id', $activeDrawer->id)->where('type', $payment_method->name)->first();
        $cashlessBalance->addToCurrentAmount($request['total_amount']);
        // dd($activeDrawer->cashless_balances()->where('type', $payment_method->name))->first();
        // dd($request, $model, );
    }

    public function saveorder_items($products, $id)
    {
        $productsArr = [];
        foreach (json_decode($products, true) as $key => $product) {
            $order_item = OrderItem::create([
                'order_id' => $id,
                'product_id' => $product['id'],
                'quantity' => $product['quantity'],
                'price' => $product['price'],
                'total' => $product['sub_total']
            ]);

            $item  = $order_item->product; 
            $item->stock_quantity = $item->stock_quantity - $product['quantity'];
            $item->save(); 
        }
    }


    function generateUniqueOrderId()
    {
        $timestamp = now()->format('YmdHis'); // This gives us a YYYYMMDDHHMMSS format
        $randomString = Str::upper(Str::random(6)); // A random 6-character string 
        return $timestamp . $randomString;
    }

    public function validationRules($request)
    {
        return [
            'payment_recieved' => [
                'required',
                'numeric',
                function ($attribute, $value, $fail) use ($request) {
                    if ($value < $request->input('total_amount')) {
                        $fail('Received amount should not be less than payable amount.');
                    }
                },
            ],
            'payment_method' => "required",
            'order_type' => "required"
        ];
    }

    public function generatepdf($id)
    { 
        $data = Order::with('order_items', 'order_items.product', 'payment_method')->find($id);
        $pdf = Pdf::loadView('receipt', ['data' => $data->toArray()]);


        // Set paper size and orientation for a receipt (adjust dimensions as needed)
        $pdf->setPaper('58mm', 'auto'); // Example: $pdf->setPaper('80mm', '210mm');

        // Render the PDF (stream or save as needed)
        $pdf->render();


        return $pdf->stream('receipt.pdf');
    }
}
