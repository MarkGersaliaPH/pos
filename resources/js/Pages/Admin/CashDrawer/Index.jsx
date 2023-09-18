import Card, { CardBody, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Tabs from "@/Components/Tabs";
import Authenticated from "@/Layouts/AuthenticatedLayout"; 
import React from "react";

function Index({ auth, item, additionalItem }) {
    const tabs = [
        {
            name: "Today Cash",
            content: <div> 
                <div className="p-5  text-xl">
                <div>
                    <h1>Cash Drawer Opened At:</h1>
                    {item.opened_at}
                </div>
                <div className="pt-5 mt-5 border-t">
                    <h1>Cash Drawer Opened By:</h1>
                    {item.cashier.name}
                </div>
                <div className="pt-5 mt-5 border-t">
                    <h1>Opening Balance</h1>
                    {item.opening_balance}
                </div>
                <div className="pt-5 mt-5 border-t">
                    <h1>Total Sales</h1>
                    {item.sales_total}
                </div>
                <div className="pt-5 mt-5 border-t">
                    <h1>Expected Balance</h1>
                    <span className="text-red-500">{item.expected_balance}</span>
                </div>
                </div> </div>
        },
        {
            name: "History Logs",
            content: <div>Content for Tab 2</div>
        }
        // ... add as many tabs as you need
    ];


    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Tabs tabs={tabs} />
            <div className="my-10 flex gap-5 justify-center">
                <PrimaryButton>Cash In Amount</PrimaryButton>
                <SecondaryButton className="bg-green-500 text-white">Cash Out Amount</SecondaryButton>
                <DangerButton>Close The Cash Drawer/Stop Selling</DangerButton>
            </div>
          
        </Authenticated>
    );
}

export default Index;
