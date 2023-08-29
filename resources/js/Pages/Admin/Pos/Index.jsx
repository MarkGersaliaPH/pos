import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import NumberInputWithCounter from "@/Components/NumberInputWithCounter";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import PosLayout from "@/Layouts/PosLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

function Index({ auth, items }) {
    console.log(items);
    const { data, setData, post, processing, errors, reset } = useForm({});

    const handleChange = (e) => {
        setData(
            e.target.name,
            e.target.type == "checkbox" ? e.target.checked : e.target.value
        );

        search(e);
    };

    const search = (e) => {
        let query = { category_id: e.target.value };
        router.get(route(route().current()), query);
    };

    let selectedItems = [
        { name: "Lumpia Shanghai        ", price: 100 },
        { name: "Hungarian Sandwich        ", price: 200 },
        { name: "TEST3", price: 300 },
    ];
    return (
        <div>
            <PosLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create
                    </h2>
                }
            >
                <div className="flex justify-between gap-5 ">
                    <Card className="flex-none  w-2/1 h-screen ">
                        <CardHeader title="Order">
                            <DangerButton>Clear All</DangerButton>
                        </CardHeader>
                        <div className="mb-auto">
                            <ul>
                                {selectedItems &&
                                    selectedItems.map((item, key) => (
                                        <li className="p-5 hover:bg-gray-50 border-b text-black font-bold  ">
                                            <div className=" align-middle mb-3 flex justify-between">
                                                <span>
                                                    {item.name} - {item.price}
                                                </span>{" "}
                                                <DangerButton>
                                                    <FaTimes />
                                                </DangerButton>
                                            </div>
                                            <div className="flex items-center justify-between gap-3">
                                                <NumberInputWithCounter
                                                    initialValue={5}
                                                    min={0}
                                                    max={10}
                                                    onChange={(value) =>
                                                        console.log(value)
                                                    }
                                                />
                                                <span className=" align-middle">
                                                    100
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="mt-auto bg-gray-50">
                            <table className="w-full  border text-center p-2">
                                <tr>
                                    <td className="font-bold p-2 border w-1/2">
                                        Sub Total
                                    </td>
                                    <td className="border p-2">100</td>
                                </tr>
                                <tr>
                                    <td className="font-bold p-2 border">
                                        Grand Total
                                    </td>
                                    <td className="border p-2 text-xl font-bold text-red-500">
                                        100
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="flex justify-center my-5 px-5">
                            <PrimaryButton className="w-full">
                                Pay Now
                            </PrimaryButton>
                        </div>
                    </Card>
                    <div className="flex-auto w-fit">
                        <Card className="mb-5">
                            <CardBody>
                                <SelectInput
                                    id="name"
                                    name="category_id"
                                    value={data.category_id}
                                    className="w-1/4"
                                    autoComplete="category_id"
                                    isFocused={true}
                                    onChange={handleChange}
                                    options={items.categories}
                                />
                                <SecondaryButton
                                    href={route(route().current())}
                                    className="ml-5"
                                >
                                    Clear
                                </SecondaryButton>
                            </CardBody>
                        </Card>
                        <div className="flex flex-wrap gap-3">
                            {items.products &&
                                items.products.map((product, key) => (
                                    <Card>
                                        <img
                                            className="rounded-t-lg lg:h-[150px]  "
                                            src={product.image_url}
                                            alt=""
                                        />
                                        <CardBody>
                                            {product.name}
                                            <h4>{product.price}</h4>
                                        </CardBody>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>
            </PosLayout>
        </div>
    );
}

export default Index;
