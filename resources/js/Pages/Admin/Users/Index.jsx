import Avatar from "@/Components/Avatar";
import Card, { CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";

function Index({ auth, items }) {
    const headers = ["Name", "Email", "Created at"];
    const body = items.data.map((user) => ({
        id: user.id, // the user's ID
        data: [
            <span className="flex gap-3 items-center">
                <Avatar src={user.image_url} /> <span>{user.name}</span>
            </span>,
            user.email,
            user.created_at,
        ], // the actual row data
    }));

    const actions = {
        destroy: "admin.users.destroy",
        edit: "admin.users.edit",
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
                    <CardHeader title={"Users List"}>
                        <PrimaryButton href={route("admin.users.create")}>
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
