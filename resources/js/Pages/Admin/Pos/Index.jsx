import {
    DangerBadge,
    GrayBadge,
    InfoBadge,
    PrimaryBadge,
} from "@/Components/Badges";
import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import NumberInputWithCounter from "@/Components/NumberInputWithCounter";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import PosLayout from "@/Layouts/PosLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaHome, FaTimes, FaTrash } from "react-icons/fa";
import PaymentModalContent from "./PaymentModalContent";
import axios from "axios";
import Swal from "sweetalert2";
import ReceiptModalContent from "./ReceiptModalContent";
import CustomModal from "@/Components/CustomModal";

function Index({ auth, items }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        payment_method: 1,
        order_type: 1,
    });

    const handleChange = (e) => {
        // setData(
        //     e.target.name,
        //     e.target.type == "checkbox" ? e.target.checked : e.target.value
        // );

        search(e);
    };

    const search = (e) => {
        let query = { category_id: e.target.value };
        router.get(route(route().current()), query, { preserveState: true });
    };

    let selectedItems = [
        { name: "Lumpia Shanghai        ", price: 100 },
        { name: "Hungarian Sandwich        ", price: 200 },
        { name: "TEST3", price: 300 },
        { name: "TEST3", price: 300 },
        { name: "TEST3", price: 300 },
    ];

    let [showModal, setShowModal] = useState(false);
    let [showReceiptModal, setShowReceiptModal] = useState(false);
    let [selectedProducts, setSelectedProducts] = useState([]);
    const [orderSubtotal, setOrderSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [discounts, setDiscounts] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    let [ordersData, setOrdersData] = useState({});

    const handleCardClick = (product) => {
        const existingProduct = selectedProducts.find(
            (item) => item.id === product.id
        );

        if (!existingProduct) {
            // The product isn't in the list, so we add a new entry
            const newProduct = {
                id: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
                sub_total: product.price, // Initial sub_total is just the product price since quantity is 1
                max: product.stock_quantity,
            };
            setSelectedProducts([...selectedProducts, newProduct]);
        } else {
            // The product is already in the list, so we update its quantity and sub_total
            const updatedProducts = selectedProducts.map((item) => {
                if (item.id === product.id) {
                    const newQuantity = item.quantity + 1;
                    return {
                        ...item,
                        quantity: newQuantity,
                        sub_total: newQuantity * item.price,
                    };
                }
                return item; // Return the item unchanged if it's not the one we're updating
            });
            setSelectedProducts(updatedProducts);
        }
    };

    const removeProduct = (product) => {
        setSelectedProducts(
            selectedProducts.filter((item) => item.id !== product.id)
        );
    };

    const isProductSelected = (product) => {
        return selectedProducts.some(
            (selectedProduct) => selectedProduct.id === product.id
        );
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedProducts = selectedProducts.map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    quantity: newQuantity,
                    sub_total: newQuantity * item.price,
                };
            }
            return item; // Return the item unchanged if it's not the one we're updating
        });

        setSelectedProducts(updatedProducts);
    };
    useEffect(() => {
        const newOrderSubtotal = selectedProducts.reduce(
            (sum, product) => sum + parseFloat(product.sub_total),
            0
        );

        setOrderSubtotal(newOrderSubtotal);
        setGrandTotal(newOrderSubtotal);
        // Uncomment and use the below line if you want to include tax and discount in the future
        // setGrandTotal(newOrderSubtotal + (newOrderSubtotal * taxRate) - (newOrderSubtotal * discountRate));
    }, [selectedProducts]);

    const handleTaxChange = (event) => {
        setTaxes(event.target.value);
    };

    const handleDiscountChange = (event) => {
        setDiscounts(event.target.value);
    };

    useEffect(() => {
        const totalWithTax = orderSubtotal + orderSubtotal * (taxes / 100);
        const newGrandTotal = totalWithTax - totalWithTax * (discounts / 100);
        setGrandTotal(newGrandTotal);
    }, [orderSubtotal, taxes, discounts]);

    const onChangeOrdersData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        const change = data.payment_recieved - grandTotal;
        setData((prevData) => ({
            ...prevData,
            payment_change: change,
        }));
    }, [data.payment_recieved, grandTotal]);

    let [receiptData, setReceiptData] = useState({});

    const submitOrder = () => {
        const baseUrl = "admin.pos.";
        data.total_amount = grandTotal;
        data.tax_amount = taxes;
        data.discount_amount = discounts;
        data.subtotal_amount = orderSubtotal;
        data.products = JSON.stringify(selectedProducts);
        axios
            .post(route(baseUrl + "store"), data)
            .then(function (response) {
                clearDatas();
                setShowModal(false);
                setShowReceiptModal(true);
                setReceiptData(response.data.receipt_data);
            })
            .catch(function (error) {
                console.log("error", error.response.data.errors.payment_method);
            });
    };

    const clearDatas = () => {
        setSelectedProducts([]);
        setDiscounts([]);
        setData({
            payment_method: 1,
            order_type: 1,
        });
        setTaxes([]);
        setGrandTotal(0);
        setOrderSubtotal(0);
    };
    function printElement(element) {
        let printWindow = window.open("", "_blank");
        printWindow.document.write(
            "<html><head><title>Print Receipt</title></head><body>"
        );
        printWindow.document.write(element.outerHTML);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
    }
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
                <Modal show={showModal} maxWidth="5xl">
                    <PaymentModalContent
                        items={items}
                        grandTotal={grandTotal}
                        selectedProducts={selectedProducts}
                        orderSubtotal={orderSubtotal}
                        taxes={taxes}
                        discounts={discounts}
                        setShowModal={setShowModal}
                        onChangeOrdersData={onChangeOrdersData}
                        data={data}
                        submitOrder={submitOrder}
                        errors={errors}
                    />
                </Modal>

                <CustomModal show={showReceiptModal} title="POS Invoice">
                    <ReceiptModalContent data={receiptData} />
                </CustomModal>

                <div className="flex relative">
                    <div className="fixed w-1/3   h-full">
                        <Card className="  shadow-lg dark:border-slate-700 border">
                            <CardHeader
                                title={
                                    <h1 className="font-bold ">
                                        WELCOME TO POS
                                    </h1>
                                }
                            >
                                <div className="mb-2">
                                    <Link
                                        className="text-blue-500 flex gap-1 text-xs items-center"
                                        href={route("dashboard")}
                                    >
                                        <FaHome />
                                        Back to home
                                    </Link>
                                </div>
                            </CardHeader>
                            <div className="mb-auto h-[200px]   overflow-auto text-xs">
                                <table className="w-full ">
                                    <thead>
                                        <tr className="border-b text-xs dark:border-slate-700">
                                            <td className="p-2 font-bold  text-slate-400">
                                                PRODUCT
                                            </td>
                                            <td className="p-2 font-bold  text-slate-400">
                                                QTY
                                            </td>
                                            <td className="p-2 font-bold  text-slate-400">
                                                PRICE
                                            </td>
                                            <td className="p-2 font-bold  text-slate-400">
                                                SUB TOTAL
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedProducts.length ? (
                                            selectedProducts.map(
                                                (item, key) => (
                                                    <tr className="border-b dark:border-slate-700">
                                                        <td className="p-2">
                                                            {item.name}
                                                        </td>
                                                        <td className="p-2">
                                                            <NumberInputWithCounter
                                                                initialValue={
                                                                    item.quantity
                                                                }
                                                                min={1}
                                                                max={
                                                                    item.stock_quantity
                                                                }
                                                                value={
                                                                    item.quantity
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                                    handleQuantityChange(
                                                                        item.id,
                                                                        value
                                                                    )
                                                                }
                                                                className="w-10"
                                                            />
                                                        </td>
                                                        <td className="p-2">
                                                            {item.price}
                                                        </td>
                                                        <td className="p-2 flex justify-between items-center pt-4">
                                                            {item.sub_total}
                                                            <FaTrash
                                                                className="text-red-500 cursor-pointer"
                                                                onClick={() =>
                                                                    removeProduct(
                                                                        item
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="p-2 text-center border-b"
                                                >
                                                    No Data Available
                                                </td>
                                            </tr>
                                        )}
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
                            <CardBody>
                                <div className="totals-section my-5">
                                    <div className="subtotal flex my-4 items-center justify-between gap-3">
                                        <span>Subtotal:</span>{" "}
                                        <span>{orderSubtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="taxes flex my-4 items-center justify-between gap-3">
                                        <span>Taxes:</span>{" "}
                                        <span>
                                            <TextInput
                                                onChange={handleTaxChange}
                                                type="text"
                                                value={
                                                    typeof taxes === "number"
                                                        ? taxes.toFixed(2)
                                                        : taxes
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className="discounts flex my-4 items-center justify-between gap-3">
                                        <span>Discounts:</span>{" "}
                                        <TextInput
                                            value={
                                                typeof discounts === "number"
                                                    ? discounts.toFixed(2)
                                                    : discounts
                                            }
                                            onChange={handleDiscountChange}
                                        />
                                    </div>
                                    <div className="grand-total flex my-4 items-center justify-between gap-3">
                                        <span>Grand Total:</span>{" "}
                                        <span className="text-[30px] font-bold text-black dark:text-white">
                                            {grandTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex my-5 justify-center gap-5 ">
                                    <DangerButton
                                        onClick={() => setSelectedProducts([])}
                                    >
                                        Reset
                                    </DangerButton>
                                    <PrimaryButton
                                        onClick={() => setShowModal(true)}
                                    >
                                        Pay Now
                                    </PrimaryButton>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="w-2/3 ml-auto pl-10">
                        <Card className="mb-5  shadow-lg border dark:border-slate-700 ">
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
                                    href={route(
                                        route().current(),
                                        {},
                                        { preserveState: true }
                                    )}
                                    className="ml-5"
                                >
                                    Clear
                                </SecondaryButton>
                            </CardBody>
                        </Card>
                        <div className="flex flex-wrap justify-start   gap-2 overflow-auto">
                            {items.products ? (
                                items.products.map((product, key) => (
                                    <Card
                                        className={`lg:w-1/6 sm:w-1/4 cursor-pointer ${
                                            isProductSelected(product)
                                                ? "border border-red-500 dark:border-slate-400"
                                                : ""
                                        } `}
                                    >
                                        <div
                                            onClick={() =>
                                                handleCardClick(product)
                                            }
                                        >
                                            <div className="flex justify-between relative">
                                                <InfoBadge className="right-0 from-blue-300 to-blue-800">
                                                    {product.stock_quantity} pcs
                                                </InfoBadge>
                                                <PrimaryBadge>
                                                    {product.price}
                                                </PrimaryBadge>
                                            </div>
                                            <img
                                                className="rounded-t-lg w-full  "
                                                src={product.image_url}
                                                alt=""
                                            />
                                            <CardBody className="text-sm">
                                                {product.name}
                                                <span className="text-xs text-gray-400 block">
                                                    {product.description}
                                                </span>
                                            </CardBody>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center">
                                    No data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </PosLayout>
        </div>
    );
}

export default Index;
