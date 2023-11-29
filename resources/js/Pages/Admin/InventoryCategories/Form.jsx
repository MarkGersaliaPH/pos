import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Toggle from "@/Components/Toggle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FilePond } from "react-filepond";
import Swal from "sweetalert2";

function Form({ auth, item }) {
    const { data, setData, post, processing, errors, reset } = useForm(
        item || {}
    );

    let [image, setImage] = useState("");

    const baseUrl = "admin.inventory-categories.";

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            data._method = "put";
            data.image = image;
            post(route(baseUrl + "update", data.id), {
                onSuccess: () => {
                    Swal.fire("Good job!", "Data is updated!", "success").then(
                        (result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.href = route(baseUrl + "index");
                            }
                        }
                    );
                },
            });
        } else {
            data.image = image;
            post(route(baseUrl + "store"), {
                onSuccess: () => {
                    Swal.fire("Good job!", "Data is created!", "success").then(
                        (result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.href = route(baseUrl + "index");
                            }
                        }
                    );
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
                <Head title="Create Category" />
                <Card>
                    <CardHeader title={"Create Category"} />
                    <CardBody>
                        <form onSubmit={submit}>
                          
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Is Active" />
                                <Toggle
                                    name="is_active"
                                    onChange={handleChange}
                                    checked={data.is_active || true}
                                />
                                ,
                            </div>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={handleChange}
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Order" />

                                <TextInput
                                    id="order"
                                    name="order"
                                    value={data.order}
                                    className="mt-1 block w-full"
                                    autoComplete="order"
                                    isFocused={true}
                                    onChange={handleChange}
                                />

                                <InputError
                                    message={errors.order}
                                    className="mt-2"
                                />
                            </div>

                            <CardFooter>
                                <SecondaryButton
                                    href={route(baseUrl + "index")}
                                >
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton
                                    className="ml-4"
                                    processing={processing}
                                >
                                    Save
                                </PrimaryButton>
                            </CardFooter>
                        </form>
                    </CardBody>
                </Card>
            </Authenticated>
        </div>
    );
}

export default Form;
