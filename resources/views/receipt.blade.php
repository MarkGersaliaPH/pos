<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Receipt</title>
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        @font-face {
          font-family: 'Courier';
          font-weight: normal;
          font-style: normal;
          font-variant: normal;
          src: url("http://eclecticgeek.com/dompdf/fonts/Courier.ttf") format("truetype");
        }
        body {
          font-family: Elegance, sans-serif;
        }
        </style>
</head>
<body> 
    <div style="width: 100%;">
    <div id="receipt">
        <h2 style="text-align:center; margin-bottom: 1rem; font-weight: bold;">
{{config('app.name')}}
        </h2>
        <div style="display:flex;margin-bottom: 1rem; padding-bottom: 0.25rem; border-bottom: 2px dotted gray;">
            Reference #: {{$data['order_id']}}
        </div>
        <div style="margin-bottom: 1rem; padding-bottom: 0.25rem; border-bottom: 2px dotted gray;">
            Date: {{$data['created_at']}}
        </div>
        <div style="margin-bottom: 1.5rem;">
            @foreach ($data['order_items'] as $item)
                <div>
                    <div style="padding: 0; font-weight: bold;">
                        {{$item['product']['name']}}
                    </div>
                    <div style="border-bottom: 2px dotted gray;">
                        <div style="display: flex; justify-content: space-between; border: none;">
                            <span style="margin-right: 1rem;">
                                {{$item['quantity']}}pc X {{$item['price']}}
                            </span>
                            <span style="float: right;">
                                {{$item['total']}}
                            </span>
                        </div>
                    </div>
                </div>
            @endforeach 
        </div>
        <div style="border-bottom: 2px dotted gray;">
            <span style="font-weight: bold;">Total Amount:</span>
            <span style="float: right;">
                {{$data['subtotal_amount']}}
            </span>
        </div>
        <div style="display: flex; border-bottom: 2px dotted gray;">
            <span style="font-weight: bold;">Order Tax:</span>
            <span style="float:right;">
                {{$data['tax_amount']}}
            </span>
        </div>
        <div style="display: flex; border-bottom: 2px dotted gray;">
            <span style="font-weight: bold;">Discount:</span>
            <span style="float:right;">
                {{$data['discount_amount']}}
            </span>
        </div>
        <div style="display: flex; border-bottom: 2px dotted gray;">
            <span style="font-weight: bold;">Grand Total:</span>
            <span style="float:right;">
                {{$data['total_amount']}}
            </span>
        </div>
        <div style="display: flex; border-bottom: 2px dotted gray;">
            <span style="font-weight: bold;">Notes:</span>
            <span style="float:right;">
                {{$data['notes']}}
            </span>
        </div>
        <table style="margin-bottom: 0; width: 100%;">
            <thead>
                <tr style="border-bottom: 1px solid gray;">
                    <th style="padding: 0.5rem 0;">Paid By</th>
                    <th style="text-align: right; padding: 0.5rem 0;">Amount</th>
                    <th style="text-align: right; padding: 0.5rem 0;">
                        Change Return
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 0.5rem 0;">
                        {{$data['payment_method']['name']}}
                    </td>
                    <td style="text-align: right; padding: 0.5rem 0;">
                        {{$data['payment_recieved']}}
                    </td>
                    <td style="text-align: right; padding: 0.5rem 0;">
                        {{$data['payment_change']}}
                    </td>
                </tr>
            </tbody>
        </table>
        
        <!-- ... similar for the rest ... -->
        <h5 style="text-align:center; margin-top: 2.5rem; font-weight: bold;">
            Thank You For Shopping With Us. Please visit again.
        </h5>
    </div> 
</div>

</body>
</html>