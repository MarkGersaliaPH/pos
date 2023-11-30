import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import DangerButton from "@/Components/DangerButton";
import FileUpload from "@/Components/FileUpload";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TabLink from "@/Components/TabLink";
import Table from "@/Components/Table";
import Tabs from "@/Components/Tabs";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Toggle from "@/Components/Toggle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FilePond } from "react-filepond";
import Swal from "sweetalert2";
import Details from "./Details";
import Dragabble from "@/Components/Draggable";
import Item from "./Item";
import DropArea from "./DropArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Form({ auth, item, categories,inventory_items }) {
    const { data, setData, post, processing, errors, reset } = useForm(
        item || {}
    );

    let [image, setImage] = useState("");

    const baseUrl = "admin.products.";

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

    let [selectedItems,setSelectedItems] = useState([]); 

    let [inventoryItems,setInventoryItems] = useState(inventory_items || []);

    const handleDrop = (item) => {
        // You can add your Axios logic here to add the item to the product
        // For example:
        // axios.post('/add-to-product', { productId: productId, itemId: item.id })
    
        
        let updatedInventoryItem = inventoryItems.filter((inventoryItem)=> {return inventoryItem.id != item.id })
//         const isItemAlreadySelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);

// // If the item is not already selected, add it to the array
// if (!isItemAlreadySelected) {
    setSelectedItems((prevItems) => [...prevItems, item]);
//   }


        setInventoryItems(updatedInventoryItem) 
      };

 

    const tabs = [
        {
            name: "Product Details",
            isActive: true,
            href: route("admin.cash-drawer.index", data.id), 
            content:<Details data={data} submit={submit} errors={errors} handleChange={handleChange} baseUrl={baseUrl} categories={categories} processing={processing} setImage={setImage} />
        },
        {
            name: "Inventory Items",
            href: route("admin.cash-drawer.sales", data.id),
            isActive: false,
            content:
            
            <DndProvider backend={HTML5Backend}> 
            <div className="flex gap-5 align-middle items-start">
            <div className="w-1/2  relative">
                Drop Items Here
            <DropArea className="  h-[500px] overflow-auto bg-gray-100 border p-2   " onDrop={handleDrop}  selectedItems={selectedItems} />
            </div>
                <div className="  w-1/2 overflow-auto h-[500px]">
            Drag Items Here
                    <div className="flex flex-wrap justify-items-center ">
                    {
                        inventoryItems && inventoryItems.map((item,key)=> 
                        <Item key={key} item={item} />

                        )
                    }</div>
                    {/* {
                        Object.keys(inventoryItems).length && Object.keys(inventoryItems).map((categoryKey,key)=>
                            <div className="w-1/2">
                            <ul>
                            {categoryKey}
                            <li>{ 
                                 inventoryItems[categoryKey].map((item,itemKey)=>
                                    <Item key={itemKey} item={item} />
                                
                                )
                            }</li>
                            </ul>
                            </div>
                        )
                    } */}
                </div>
            </div>
            
            </DndProvider>
            // <></>

        }, 
        // ... add as many tabs as you need
    ];

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
                <Tabs tabs={tabs} /> 
               
            </Authenticated>
        </div>
    );
}

export default Form;
