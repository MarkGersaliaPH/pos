import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FilePond } from "react-filepond";
import Swal from "sweetalert2";

function Form({ auth, item }) {
    const { data, setData, post, processing, errors, reset } = useForm(
        item || {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        }
    );
    let [image, setImage] = useState("");

    const baseUrl = "admin.users.";

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
                onError: (r) => {
                    Swal.fire("Oooops!", r.message, "error");
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
    return (
        <div>
            <Authenticated
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create
                    </h2>
                }
            >
                <Head title="Profile" />
                <Card className=" ">
                    <CardHeader title={"Create User"} />
                    <CardBody>
                        <form onSubmit={submit}>
                            <div className="mt-4 w-1/2">
                                <InputLabel
                                    htmlFor="name"
                                    value="Select Image"
                                />

                                <FileUpload
                                    selectedFile={data.image_url}
                                    setImage={(filename) => setImage(filename)}
                                    label="Drag or Drop Your Photo"
                                />
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
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            {!data.id && (
                                <>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                        />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirm Password"
                                        />

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </>
                            )}

                            <CardFooter>
                                <SecondaryButton
                                    href={route("admin.users.index")}
                                >
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
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
