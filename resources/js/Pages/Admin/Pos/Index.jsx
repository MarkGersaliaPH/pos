import {
    DangerBadge,
    GrayBadge,
    InfoBadge,
    PrimaryBadge,
} from "@/Components/Badges";
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
        { name: "TEST3", price: 300 },
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
                    <Card className="flex-none  w-2/6">
                        <div className="mb-auto  overflow-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <td className="p-2 font-bold  text-black">
                                            PRODUCT
                                        </td>
                                        <td className="p-2 font-bold  text-black">
                                            QTY
                                        </td>
                                        <td className="p-2 font-bold  text-black">
                                            PRICE
                                        </td>
                                        <td className="p-2 font-bold  text-black">
                                            SUB TOTAL
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItems &&
                                        selectedItems.map((item, key) => (
                                            <tr className="border-b">
                                                <td className="p-2">
                                                    {item.name}
                                                </td>
                                                <td className="p-2">
                                                    <NumberInputWithCounter
                                                        initialValue={5}
                                                        min={0}
                                                        max={10}
                                                        onChange={(value) =>
                                                            console.log(value)
                                                        }
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    {item.price}
                                                </td>
                                                <td className="p-2 flex justify-between items-center pt-4">
                                                    {item.price}
                                                    <FaTrash className="text-red-500 " />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <ul>
                                {/* {selectedItems &&
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
                                    ))} */}
                            </ul>
                        </div>
                        <div className="  bg-gray-50">
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
                        <div className="flex my-5 justify-center gap-5 px-5">
                            <PrimaryButton>Pay Now</PrimaryButton>
                            <DangerButton>Reset</DangerButton>
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
                        <div className="flex flex-wrap justify-start   gap-2 h-[450px] overflow-auto">
                            {items.products &&
                                items.products.map((product, key) => (
                                    <Card className=" border lg:w-[230px] h-[200px] sm:w-1/2 ">
                                        <div className="flex justify-between relative">
                                            <InfoBadge className="right-0 from-blue-300 to-blue-800">
                                                {product.stock_quantity} pieces
                                            </InfoBadge>
                                            <PrimaryBadge>
                                                {product.price}
                                            </PrimaryBadge>
                                        </div>
                                        <img
                                            className="rounded-t-lg w-full lg:h-[120px]  "
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
