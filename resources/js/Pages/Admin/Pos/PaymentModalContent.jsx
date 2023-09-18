import { PrimaryBadge } from "@/Components/Badges";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import React from "react";
import { FcShipped } from "react-icons/fc";
import { RiEBike2Line } from "react-icons/ri";

import {
    MdOutlineCallReceived,
    MdOutlineTableRestaurant,
    MdTableRestaurant,
} from "react-icons/md";
import InputError from "@/Components/InputError";
function PaymentModalContent({
    items,
    grandTotal,
    selectedProducts,
    orderSubtotal,
    taxes,
    discounts,
    setShowModal,
    onChangeOrdersData,
    data,
    submitOrder,
    errors,
}) {
    const radiosOpts = [
        {
            text: "Dine In",
            icon: (
                <MdOutlineTableRestaurant className="w-5 h-5 ml-3 text-blue-600" />
            ),
            value: 1,
            checked: true,
        },
        {
            text: "Take Out",
            icon: <RiEBike2Line className="w-5 h-5 text-blue-500 ml-3" />,
            value: 2,
        },
        {
            text: "Pick Up",
            icon: (
                <MdOutlineCallReceived className="w-5 h-5 ml-3 text-blue-500" />
            ),
            value: 3,
        },
    ];
    return (
        <div>
            <div className=" mb-10 ">
                <ul className="grid w-full gap-4 md:grid-cols-3">
                    {radiosOpts.map((option, key) => (
                        <li key={key}>
                            <input
                                type="radio"
                                id={`type-${key}`}
                                name="order_type"
                                checked={data.order_type == option.value}
                                value={option.value}
                                className="hidden peer"
                                onChange={onChangeOrdersData}
                            />
                            <label
                                for={`type-${key}`}
                                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <div className="block">
                                    <div className="w-full text-lg font-semibold">
                                        {option.text}
                                    </div>
                                </div>
                                {option.icon}
                            </label>
                        </li>
                    ))}
                </ul>

                <InputError message={errors.order_type} className="mt-2" />
            </div>
            <div className="py-2 flex gap-5">
                <div className="w-full ">
                    <form>
                        <div className="flex flex-wrap  gap-5 ">
                            <div className="flex-1 ">
                                <InputLabel
                                    htmlFor="name"
                                    value="Recieved Amount"
                                />

                                <TextInput
                                    type="number"
                                    id="stock_quantity"
                                    name="payment_recieved"
                                    value={data.payment_recieved}
                                    className="mt-1 block w-full"
                                    autoComplete="payment_recieved"
                                    isFocused={true}
                                    onChange={onChangeOrdersData}
                                />

                                <InputError
                                    message={errors.payment_recieved}
                                    className="mt-2"
                                />
                            </div>
                            <div className=" flex-1  ">
                                <InputLabel
                                    htmlFor="name"
                                    value="Payable Amount"
                                />

                                <TextInput
                                    type="number"
                                    id="stock_quantity"
                                    name="stock_quantity"
                                    value={grandTotal}
                                    className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                    autoComplete="stock_quantity"
                                    isFocused={true}
                                    disabled
                                    onChange={onChangeOrdersData}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap  gap-5 mt-4 ">
                            <div className="flex-1 ">
                                <InputLabel htmlFor="name" value="Change" />

                                <TextInput
                                    type="number"
                                    id="change"
                                    name="payment_change"
                                    value={data.payment_change}
                                    className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                                    autoComplete="payment_change"
                                    isFocused={true}
                                    disabled
                                    onChange={onChangeOrdersData}
                                />
                                <InputError
                                    message={errors.payment_change}
                                    className="mt-2"
                                />
                            </div>
                            <div className=" flex-1  ">
                                <InputLabel
                                    htmlFor="name"
                                    value="Payment Method"
                                />

                                <SelectInput
                                    id="name"
                                    name="payment_method"
                                    value={data.payment_method}
                                    className="mt-1 block w-full"
                                    autoComplete="payment_method"
                                    isFocused={true}
                                    onChange={onChangeOrdersData}
                                    options={items.payment_methods}
                                />

                                <InputError
                                    message={errors.payment_method}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className=" flex-1 my-4 ">
                            <InputLabel htmlFor="name" value="Notes" />

                            <TextArea
                                id="name"
                                name="notes"
                                value={data.notes}
                                className="mt-1 block w-full"
                                autoComplete="category_id"
                                isFocused={true}
                                onChange={onChangeOrdersData}
                            />
                        </div>
                    </form>
                </div>
                <div className="ml-auto w-1/2">
                    <div className="totals-section">
                        <div className="subtotal flex  border-dashed border-b-2 pb-2 mb-4 items-center justify-between gap-3">
                            <span>Total Products</span>{" "}
                            <span>
                                <PrimaryBadge className="relative">
                                    {selectedProducts.length}
                                </PrimaryBadge>
                            </span>
                        </div>
                        <div className="subtotal flex border-dashed border-b-2  pb-2 my-4 items-center justify-between gap-3">
                            <span>Subtotal:</span>{" "}
                            <span>{orderSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="taxes flex border-dashed border-b-2  pb-2 items-center justify-between gap-3">
                            <span>Taxes:</span>{" "}
                            <span>
                                {" "}
                                {typeof taxes === "number"
                                    ? taxes.toFixed(2)
                                    : taxes}{" "}
                            </span>
                        </div>
                        <div className="discounts flex my-4 border-dashed border-b-2  pb-2 items-center justify-between gap-3">
                            <span>Discounts:</span>{" "}
                            {typeof discounts === "number"
                                ? discounts.toFixed(2)
                                : discounts}
                        </div>
                        <div className="grand-total flex  my-4 border-dashed border-b-2  pb-2 items-center justify-between gap-3">
                            <span>Grand Total:</span>{" "}
                            <span className="text-[30px] font-bold text-black">
                                {grandTotal.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end my-5 gap-4">
                <DangerButton onClick={() => setShowModal(false)}>
                    Close
                </DangerButton>

                <PrimaryButton onClick={submitOrder}>
                    Confirm Payment
                </PrimaryButton>
            </div>
        </div>
    );
}

export default PaymentModalContent;
