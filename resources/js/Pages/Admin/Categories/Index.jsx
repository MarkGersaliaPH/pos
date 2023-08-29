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
    const headers = ["Name", "Is active"];
    const body = items.data.map((data) => ({
        id: data.id, // the user's ID
        data: [
            <span className="flex gap-3 items-center">
                <Avatar src={data.image_url} /> <span>{data.name}</span>
            </span>,
            <Toggle checked={data.is_active} />,
            // data.is_active,
        ], // the actual row data
    }));

    const actions = {
        destroy: "admin.categories.destroy",
        edit: "admin.categories.edit",
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
                    <CardHeader title={"Categories List"}>
                        <PrimaryButton href={route("admin.categories.create")}>
                            Create
                        </PrimaryButton>
                    </CardHeader>
                    <Table
                        headers={headers}
                        body={body}
                        fromNumber={items.from}
                        actions={actions}
                    />
                    <CardFooter>
                        <Pagination items={items} />
                    </CardFooter>
                </Card>
            </Authenticated>
        </div>
    );
}

export default Index;
