import React from "react";

function ReceiptModalContent({ data }) {
    return (
        <div className="">
            <div className="my-1 pb-1 border-b">
                Reference #: {data.order_id}
            </div>
            <div className="my-1 pb-1 border-b">Date: {data.created_at}</div>
            <div className="my-4">
                {data.order_items &&
                    data.order_items.map((item, key) => (
                        <div>
                            <div className="p-0">{item.product.name}</div>
                            <div className="border-b-4 border-dotted">
                                <div className="border-0 flex justify-between">
                                    <span className="mr-4">
                                        {item.quantity} Pc X {item.price}
                                    </span>
                                    <span className="text-end">
                                        {item.total}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="flex border-b-4 border-dotted  ">
                <div className="font-bold text-black">Total Amount:</div>
                <div className="text-end ms-auto"> {data.subtotal_amount}</div>
            </div>
            <div className="flex border-b-4 border-dotted">
                <div className="font-bold text-black">Order Tax:</div>
                <div className="text-end ms-auto"> {data.tax_amount}</div>
            </div>
            <div className="flex border-b-4 border-dotted">
                <div className="font-bold text-black">Discount:</div>
                <div className="text-end ms-auto">{data.discount_amount}</div>
            </div>
            <div className="flex border-b-4 border-dotted">
                <div className="font-bold text-black">Grand Total:</div>
                <div className="text-end ms-auto"> {data.total_amount}</div>
            </div>
            <div className="flex border-b-4 border-dotted">
                <div className="font-bold text-black">Notes:</div>
                <div className="text-end ms-auto"> {data.notes}</div>
            </div>
            <table className="mb-0 w-full">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-0">Paid By</th>
                        <th className="text-end py-2 px-0">Amount</th>
                        <th className="text-end py-2 px-0">Change Return</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="py-2 px-0">
                            {data.payment_method.name}
                        </td>
                        <td className="text-end py-2 px-0">
                            {data.payment_recieved}
                        </td>
                        <td className="text-end py-2 px-0">
                            {data.payment_change}
                        </td>
                    </tr>
                </tbody>
            </table>
            <h5 className="text-center font-label mt-10 font-bold">
                Thank You For Shopping With Us. Please visit again.
            </h5>
        </div>
    );
}

export default ReceiptModalContent;
