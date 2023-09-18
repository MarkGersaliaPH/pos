<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        return Inertia::render('Admin/Pos/Index', ['items' => $data]);
    }

    public function store(Request $request)
    {

        $this->validate($request, $this->validationRules($request));

        $model = new Order;
        // DB::beginTransaction();
        try {

            $requestData = $request->only($model->getFillable());
            $requestData['order_id'] = $this->generateUniqueOrderId();
            $requestData['user_id'] = auth()->id();
            $requestData['order_status'] = 1;

            $model->fill($requestData);
            $model->save();


            $this->saveorder_items($request->products, $model->id);


            $model->load(['order_items', 'order_items.product', 'payment_method']);


            return response()->json(['message' => 'Success', 'receipt_data' => $model]);
            // DB::commit();
        } catch (\Exception $e) {
            dd($e);
            //throw $th;
            // DB::rollBack();
        }
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

        return $pdf->stream('receipt.pdf');
    }
}
