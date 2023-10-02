import Avatar from "@/Components/Avatar";
import Card, { CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import Toggle from "@/Components/Toggle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";

function Index({ auth, items }) {
    const booleanValue = (value) => {
        value === "on" ? true : Boolean(value);
    };

    const headers = ["Name", "Price", "Category", "Stock", "Is Active"];
    const body = items.data.map((data) => ({
        id: data.id, // the user's ID
        data: [
            <span className="flex gap-3 items-center">
                <Avatar src={data.image_url} /> <span>{data.name}</span>
            </span>,
            data.price,
            data.category.name,
            data.stock_quantity,
            <Toggle checked={data.is_active} />,
            // data.is_active,
        ], // the actual row data
    }));

    const actions = {
        destroy: "admin.products.destroy",
        edit: "admin.products.edit",
    };

    return (
        <div>
            <Authenticated
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Profile
                    </h2>
                }
            >
                <Head title="Profile" />
                <Card>
                    <CardHeader title={"Products List"}>
                        <PrimaryButton href={route("admin.products.create")}>
                            Create
                        </PrimaryButton>
                    </CardHeader>
                    <Table headers={headers} body={body} actions={actions} />
                    <Pagination items={items} />
                </Card>
            </Authenticated>
        </div>
    );
}

export default Index;
