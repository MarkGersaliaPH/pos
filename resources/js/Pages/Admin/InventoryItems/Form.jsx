import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import Table from "@/Components/Table";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Toggle from "@/Components/Toggle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FilePond } from "react-filepond";
import Swal from "sweetalert2";

function Form({ auth, item, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm(
        item || {}
    );

    let [image, setImage] = useState("");

    const baseUrl = "admin.inventories.";

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            data._method = "put";
            data.image = image;
            post(route(baseUrl + "update", data.id), {
                onSuccess: () => {
                    Swal.fire("Good job!", "Data is updated!", "success")
                    
                },
            });
        } else {
            data.image = image;
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

    const booleanValue = (value) => {
        value === "on" ? true : Boolean(value);
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
                <Head title="Create" />
                <Card>
                    <CardHeader
                        title={`${!data.id ? "Create" : "Update"} Product`}
                    />
                    <CardBody>
                        <form onSubmit={submit}>
                            <div className="mt-4 w-1/2">
                                <InputLabel
                                    htmlFor="name"
                                    value="Select Image"
                                />

                                {/* <FilePond
                                    files={data.image}
                                    onupdatefiles={(fileItems) => {
                                        setImage(fileItems[0].file);
                                    }}
                                /> */}
                                <FileUpload
                                    selectedFile={data.image_url}
                                    setImage={(filename) => setImage(filename)}
                                    label="Drag or Drop Your Photo"
                                /> 
                            </div>

                            <div>
                                <InputLabel htmlFor="name" value="Category" />

                                <SelectInput
                                    id="name"
                                    name="category_id"
                                    value={data.category_id}
                                    className="mt-1 block w-full"
                                    autoComplete="category_id"
                                    isFocused={true}
                                    onChange={handleChange}
                                    options={categories}
                                />

                                <InputError
                                    message={errors.category_id}
                                    className="mt-2"
                                />
                            </div>
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
                                <InputLabel htmlFor="name" value="Quantity" />

                                <TextInput 
                                    id="initial_quantity"
                                    name="initial_quantity"
                                    value={data.initial_quantity}
                                    className="mt-1 block w-full"
                                    autoComplete="initial_quantity"
                                    isFocused={true}
                                    onChange={handleChange}
                                />

                                <initial_quantity
                                    message={errors.initial_quantity}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex justify-center gap-5">
                                <div className="w-full">

                                <InputLabel htmlFor="name" value="Normal Price" />

                                <TextInput 
                                    id="normal_price"
                                    name="normal_price"
                                    value={data.normal_price}
                                    className="mt-1 block w-full"
                                    autoComplete="normal_price"
                                    isFocused={true}
                                    onChange={handleChange}
                                />

                                <InputError
                                    message={errors.normal_price}
                                    className="mt-2"
                                />
                                </div>
                                
                                <div className="w-full">

                                <InputLabel htmlFor="name" value="Selling Price" />

                                <TextInput 
                                    id="selling_price"
                                    name="selling_price"
                                    value={data.selling_price}
                                    className="mt-1 block w-full"
                                    autoComplete="selling_price"
                                    isFocused={true}
                                    onChange={handleChange}
                                />

                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                                </div>
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
