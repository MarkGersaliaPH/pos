import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Toggle from "@/Components/Toggle";
import React from "react";

function Details(props) {
    let {data, submit, errors, handleChange, baseUrl,categories,processing,setImage } = props;
 
    console.log(data)
    return (
        <div>
            <Card className="border-none shadow-none"> 
                <CardBody>
                    <form onSubmit={submit}>
                        <div className="mt-4 w-1/2">
                            <InputLabel htmlFor="name" value="Select Image" />

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
                                // value={data.category_id}
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
                                checked={data.is_active}
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
                            <InputLabel htmlFor="name" value="Price" />

                            <TextInput
                                id="price"
                                name="price"
                                value={data.price}
                                className="mt-1 block w-full"
                                autoComplete="price"
                                isFocused={true}
                                onChange={handleChange}
                            />

                            <InputError
                                message={errors.price}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Quantity" />

                            <TextInput
                                type="number"
                                id="stock_quantity"
                                name="stock_quantity"
                                value={data.stock_quantity}
                                className="mt-1 block w-full"
                                autoComplete="stock_quantity"
                                isFocused={true}
                                onChange={handleChange}
                            />

                            <InputError
                                message={errors.stock_quantity}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Description" />

                            <TextArea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
                                isFocused={true}
                                onChange={handleChange}
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div> 
                        <CardFooter>
                            <SecondaryButton href={route(baseUrl + "index")}>
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
        </div>
    );
}

export default Details;
