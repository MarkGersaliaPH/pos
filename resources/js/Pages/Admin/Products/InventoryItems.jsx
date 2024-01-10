import Avatar from '@/Components/Avatar';
import CustomModal from '@/Components/CustomModal';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton'
import SecondaryButton from '@/Components/SecondaryButton';
import Table from '@/Components/Table';
import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';

function InventoryItems(props) {
    let {items,itemOptions,onAttachedInventoryItems} = props; 
    const headers = ["Name", "Price","Quantity"];
    const body = items.map((data) => ({
        id: data.id, // the user's ID
        data: [
            <span className="flex gap-3 items-center">
                <Avatar src={data.image_url} /> <span>{data.name}</span>
            </span>,
            data.price, 
            data.quantity, 
            // data.is_active,
        ], // the actual row data
    }));
 

    
    const optionsAction = {
        destroy: "admin.products.destroy",
        edit: "admin.products.edit",
    };

    const optionsHeader = ["Name", "Price", "Category", "Stock"];

    const optionsBody = itemOptions.map((data) => ({
        id: data.id, // the user's ID
        data: [
            <span className="flex gap-3 items-center">
                <Avatar src={data.image_url} /> <span>{data.name}</span>
            </span>,
            data.price,
            data.category.name,
            data.current_quantity, 
            <div className='flex gap-2'>
            <PrimaryButton onClick={()=>onAttachItem(data)}>Add</PrimaryButton>
            <DangerButton>Remove</DangerButton>
            </div>
            // data.is_active,
        ], // the actual row data 
    }));

    let [showModal,setShowModal] = useState(false);

    const onAttachItem = async(data) =>{ 
        const { value: quantity } = await Swal.fire({
            title: `Enter Quantity`,
            input: "text",
            inputLabel: "QTY",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            }
          });
          if (quantity) {
            onAttachedInventoryItems(
                {
                    id:data.id,
                    image_url:data.image_url,
                    name:data.name,
                    price:data.normal_price,
                    quantity:quantity
                }
                )
            // Swal.fire(`Your IP address is ${quantity}`);4
            setShowModal(false)
          }
          
    }
  return (
    <div>
        <Modal show={showModal} maxWidth='5xl'>
            <div className='h-[500px] overflow-auto'>
                
            <Table headers={optionsHeader} body={optionsBody}  />

            </div>

        <div className="my-5 justify-end flex gap-5 ">
                    <SecondaryButton onClick={() => setShowModal(false)}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={() => {
                            setShowModal(false); 
                        }}
                    >
                        Submit
                    </PrimaryButton>
                </div>
        </Modal>
        <div className="flex justify-between items-center mb-5">
        <h2>Attached items</h2>
        <PrimaryButton onClick={()=>setShowModal(true)}>Add items</PrimaryButton>
        </div>

        <Table headers={headers} body={body} />
    </div>
  )
}

export default InventoryItems