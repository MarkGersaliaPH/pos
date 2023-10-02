import Card, { CardBody, CardHeader } from "@/Components/Card";
import CustomModal from "@/Components/CustomModal";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TabLink from "@/Components/TabLink";
import Tabs from "@/Components/Tabs";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

function Index({ auth, item, additionalItem }) {
    const { data, setData, post, processing, errors, reset } = useForm(
        item || {}
    );
    const tabs = [
        {
            name: "Drawer Details",
            isActive: true,
            href: route("admin.cash-drawer.index", data.id),
        },
        {
            name: "Sales",
            href: route("admin.cash-drawer.sales", data.id),
            isActive: false,
        },
        {
            name: "Drawer Logs",
            href: route("admin.cash-drawer.logs", data.id),
            isActive: false,
        },
        // ... add as many tabs as you need
    ];

    let [showCloseModal, setShowCloseModal] = useState(false);
    let [showCashinModal, setShowCashInModal] = useState(false);

    const baseUrl = "admin.cash-drawer.";

    const submit = () => {
        if (data.id) {
            data._method = "put";
            post(route(baseUrl + "update", data.id), {
                onSuccess: () => {
                    Swal.fire("Good job!", "Data is updated!", "success");
                },
            });
        } else {
            post(route(baseUrl + "store"), {
                onSuccess: () => {
                    Swal.fire("Good job!", "Data is created!", "success");
                },
            });
        }
    };

    const handleChange = (e) => {
        setData(
            e.target.name,
            e.target.type == "checkbox" ? e.target.checked : e.target.value
        );
    };

    let [cashInCashoutData, setCashInCashoutData] = useState({});

    let handleCashInCashoutChange = (e) => {
        let updatedData = { ...cashInCashoutData };
        updatedData[e.target.name] = e.target.value;
        setCashInCashoutData(updatedData);
    };

    const submitCashInCashOut = () => {
        cashInCashoutData.type = cashInType;
        router.visit(route("admin.cash-drawer.cash_in_and_out", data.id), {
            method: "post",
            data: cashInCashoutData,
            onSuccess: () => {
                Swal.fire("Success", "Data is updated!", "success");
            },
        });
    };

    const [cashInType, setCashInType] = useState("cash_in");

    let [cashlessBalances, setCashlessBalances] = useState(
        data.cashless_balances || []
    );

    const handleCashlessChange = (index, field, value, type) => {
        const updatedData = [...cashlessBalances];

        // console.log(index, field, value);

        // Ensure the object exists at the given index
        if (!updatedData[index]) {
            updatedData[index] = {};
        }

        updatedData[index]["type"] = type;
        updatedData[index][field] = value;

        setCashlessBalances(updatedData);

        console.log(updatedData);
    };
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Modal show={showCloseModal}>
                <div>
                    <InputLabel htmlFor="name" value="Closing Drawer Amount" />

                    <TextInput
                        id="name"
                        name="closing_balance"
                        value={data.closing_balance}
                        className="mt-1 block w-full"
                        autoComplete="closing_balance"
                        isFocused={true}
                        onChange={handleChange}
                        type="number"
                    />
                    <small className="text-gray-500">
                        Confirm the amount by doing a physical cash count before
                        entering the closing balance
                    </small>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="bg-gray-100 border p-5 mt-5">
                    {cashlessBalances &&
                        cashlessBalances.map((balance, index) => (
                            <div
                                key={index}
                                className={
                                    index != 0 ? "mt-5 pt-5 border-t" : ""
                                }
                            >
                                <InputLabel
                                    htmlFor="name"
                                    value={`Set Closing Amount for ${balance.type}`}
                                />

                                <TextInput
                                    id="name"
                                    name="closing_balance"
                                    value={balance.closing_balance}
                                    className="mt-1 block w-full"
                                    autoComplete="closing_balance"
                                    isFocused={true}
                                    onChange={(e) =>
                                        handleCashlessChange(
                                            index,
                                            e.target.name,
                                            e.target.value,
                                            balance.type
                                        )
                                    }
                                    type="number"
                                />
                                <small className="text-gray-500">
                                    Enter the final total from digital payment
                                    for {balance.type} for the day.
                                </small>
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                        ))}
                </div>

                <div className="my-5 justify-end flex gap-5">
                    <SecondaryButton onClick={() => setShowCloseModal(false)}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={() => {
                            setShowCloseModal(false);
                            submit();
                        }}
                    >
                        Submit
                    </PrimaryButton>
                </div>
            </Modal>

            <Modal show={showCashinModal}>
                <h1 className="text-xl font-bold border-b pb-2 mb-5">
                    {cashInType}
                </h1>
                <div>
                    <InputLabel htmlFor="name" value="Amount:" />
                    <TextInput
                        id="name"
                        name="amount"
                        value={cashInCashoutData.cash_in}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={handleCashInCashoutChange}
                        type="number"
                    />
                    <InputError message={errors.amount} className="mt-2" />
                </div>

                <div className="mt-5">
                    <InputLabel htmlFor="name" value="Reason:" />
                    <TextArea
                        onChange={handleCashInCashoutChange}
                        name="reason"
                        value={cashInCashoutData.reason}
                        className="w-full"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="my-5 justify-end flex gap-5">
                    <SecondaryButton onClick={() => setShowCashInModal(false)}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton onClick={submitCashInCashOut}>
                        Submit
                    </PrimaryButton>
                </div>
            </Modal>

            <TabLink tabs={tabs}>
                <div>
                    <div className="p-5 ">
                        <div className="flex  gap-5">
                            <div className="w-1/2">
                                <h1>Cash Drawer Opened At:</h1>
                                {item.opened_at} ({item.operation_hours})
                            </div>
                            <div className="w-1/2">
                                <h1>Drawer In Charge:</h1>
                                {item.cashier.name}
                            </div>
                        </div>

                        <div className="flex  gap-5 pt-5 mt-5 border-t">
                            <div className="w-1/2">
                                <h1>Opening Balance</h1>
                                {item.opening_balance}
                            </div>
                            <div className="w-1/2 text-xl">
                                <h1 className="font-bold">Total Sales</h1>
                                {item.sales_total}
                            </div>
                        </div>

                        <div className="pt-5 mt-5 border-t">
                            <h1>Expected Cash Balance</h1>
                            <span className="text-blue-500 text-4xl font-bold">
                                {item.expected_balance}
                            </span>
                        </div>

                        {item.closing_balance && (
                            <>
                                <div className="pt-5 mt-5 border-t">
                                    <h1>Closing Balance</h1>
                                    <span className="text-blue-500 text-4xl font-bold">
                                        {item.closing_balance}
                                    </span>
                                </div>

                                <div className="pt-5 mt-5 border-t">
                                    <h1>
                                        {parseInt(item.closing_balance) <
                                        parseInt(item.expected_balance)
                                            ? "Shortage"
                                            : "Discrepancy"}
                                    </h1>
                                    <span className="text-red-500 text-4xl font-bold">
                                        {parseInt(item.closing_balance) -
                                            parseInt(item.expected_balance)}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-between gap-5">
                        {item.cashless_balances &&
                            item.cashless_balances.map((balance, key) => (
                                <div className="w-1/2 border bg-gray-100 p-5">
                                    Balance for {balance.type}
                                    <div className="pt-5 mt-5 border-t">
                                        <h1>Opening Balance</h1>
                                        {balance.opening_balance}
                                    </div>
                                    <div className="pt-5 mt-5 border-t text-xl">
                                        <h1 className="font-bold">
                                            Total Sales
                                        </h1>
                                        {balance.sales_total}
                                    </div>
                                    <div className="pt-5 mt-5 border-t">
                                        <h1>Expected {balance.type} Balance</h1>
                                        <span className="text-blue-500 text-4xl font-bold">
                                            {balance.expected_balance}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {!item.closing_balance && (
                        <div className="my-10 flex gap-5 justify-center">
                            <PrimaryButton
                                onClick={() => setShowCashInModal(true)}
                            >
                                Cash In Amount
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => {
                                    setShowCashInModal(true);
                                    setCashInType("cash_out");
                                }}
                            >
                                Cash Out Amount
                            </SecondaryButton>
                            <DangerButton
                                onClick={() => setShowCloseModal(true)}
                            >
                                Close The Cash Drawer/Stop Selling
                            </DangerButton>
                        </div>
                    )}
                </div>
            </TabLink>
        </Authenticated>
    );
}

export default Index;
