import { SuccessBadge } from "@/Components/Badges";
import Card, { CardBody, CardHeader } from "@/Components/Card";
import Pagination from "@/Components/Pagination";

import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

function Index({ auth, items, additionalItem }) {
    const headers = [
        "Date Opened",
        "Status",
        "Cashier",
        "Opening Balance",
        "Sales",
        "Date Closed",
    ];

    const statusDisplay = (status) => {
        if (status == "Active") {
            return <SuccessBadge>{status}</SuccessBadge>;
        }
    };
    const body = items.data.map((data) => ({
        id: data.id, // the user's ID
        data: [
            <Link
                className="text-blue-500"
                href={route("admin.cash-drawer.show", data.id)}
            >
                {data.opened_at} ({data.operation_hours})
            </Link>,
            statusDisplay(data.status),
            data.cashier.name,
            data.opening_balance,
            // data.closing_balance,
            data.sales_total,
            // data.expected_balance,
            data.closed_at,
        ], // the actual row data
    }));

    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Card>
                <CardHeader title={"Cash Drawers"}>
                    <PrimaryButton href={route("admin.cash-drawer.create")}>
                        Create
                    </PrimaryButton>
                </CardHeader>
                <Table headers={headers} body={body} />
                <Pagination items={items} />
            </Card>
        </Authenticated>
    );
}

export default Index;
