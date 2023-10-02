import Avatar from "@/Components/Avatar";
import Card, { CardBody, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TabLink from "@/Components/TabLink";
import Table from "@/Components/Table";
import Tabs from "@/Components/Tabs";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";

function Index({ auth, items, additionalItem, cash_drawer_id }) {
    const tabs = [
        {
            name: "Drawer Details",
            isActive: false,
            href: route("admin.cash-drawer.show", cash_drawer_id),
        },
        {
            name: "Sales",
            href: route("admin.cash-drawer.sales", cash_drawer_id),
            isActive: false,
        },
        {
            name: "Drawer Logs",
            href: route("admin.cash-drawer.logs", cash_drawer_id),
            isActive: true,
        },
        // ... add as many tabs as you need
    ];
    const headers = ["Action", "Amount", "Notes", "Cashier", "Date"];
    const body = items.data.map((data) => ({
        id: data.id, // the user's ID
        data: [
            data.action,
            data.amount,
            data.notes,
            data.performed_by.name,
            data.created_at,
            // data.is_active,
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
            <TabLink tabs={tabs}>
                <Table headers={headers} body={body} />
                <Pagination items={items} />
            </TabLink>
        </Authenticated>
    );
}

export default Index;
