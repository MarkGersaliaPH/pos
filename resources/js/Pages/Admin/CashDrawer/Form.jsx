import Card, { CardBody, CardFooter, CardHeader } from "@/Components/Card";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

function Form({ auth, item,additionalItem }) {
    const { data, setData, post, processing, errors, reset } = useForm(
        item || {}
    );

    
    let [paymentMethod,setPaymentMethod] = useState(additionalItem || []);

    const baseUrl = "admin.cash-drawer.";
    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            data._method = "put"; 
            data.cashless_balance  = cashlessBalances;
            post(route(baseUrl + "update", data.id), {
                onSuccess: () => {
                    Swal.fire("Good job!", "Data is updated!", "success");
                },
            });
        } else { 
            data.cashless_balance  = cashlessBalances;
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

    let [cashlessBalances,setCashlessBalances] = useState([]);


    const addCashlessRow = () =>{
        setCashlessBalances([...cashlessBalances,{

        }])
    }

    const handleCashlessChange = (index,field,value) =>{
        const updatedData = [...cashlessBalances];

        updatedData[index][field] = value;
        if (field === 'type') {
            const updatedPaymentMethods = paymentMethod.filter(method => method != value);
            setPaymentMethod(updatedPaymentMethods);
        } 
        setCashlessBalances(updatedData)
    }

    const removeSelectedMethod = (method) =>{
        return method != method;
    }

 
    return (
        <Authenticated
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Card>
                  <CardBody> 
                  <form onSubmit={submit}>   
                  <div>
                                <InputLabel htmlFor="name" value="Opening Cash Balance" />

                                <TextInput
                                    id="name"
                                    type="number"
                                    name="opening_balance"
                                    value={data.opening_balance}
                                    className="mt-1 block w-full"
                                    autoComplete="opening_balance"
                                    isFocused={true}
                                    onChange={handleChange}
                                />
                                <small>Enter the initial amount of money in the cash drawer at the start of the day. This is the total of all coins and bills before any sales are made.</small>

                                <InputError
                                    message={errors.opening_balance}
                                    className="mt-2"
                                />
                            </div>
 

                        
                            {
                                cashlessBalances && cashlessBalances.map((value,index)=>
                                <div key={index} className="my-4 bg-gray-50 border p-5">
                                Cash less balance
                                <div className="mt-4">
                                <InputLabel htmlFor="name" value="Type" />

                                    <SelectInput
                                    className="w-full"
                                    onChange={(e)=>handleCashlessChange(index,e.target.name,e.target.value)} 
                                    name="type"
                                    textAsValue
                                    options={paymentMethod}
                                    /> 
                                    <small>
                                    Select the type of digital payment or e-wallet you're tracking. This could be GCash, PayMaya, or any other electronic payment method you use.
                                    </small>
                                </div>
                                <div className="mt-4">
                                <InputLabel htmlFor="name" value={`Opening Balance`} />

                                <TextInput
                                    id="name"
                                    type="number"
                                    name="opening_balance"
                                    value={value.opening_balance}
                                    className="mt-1 block w-full bg-gray-100"
                                    autoComplete="expected_balance"
                                    isFocused={true}
                                    onChange={(e)=>handleCashlessChange(index,e.target.name,e.target.value)} 
                                />
                                <small>Enter the starting balance for the selected e-wallet at the beginning of the day. This should be the total digital funds available before any sales or transactions are made.</small>
                                <InputError
                                    message={errors.expected_balance}
                                    className="mt-2"
                                />
                            </div> 
                                
                            </div>
                                )
                            }
                           
                           {
                            additionalItem.length != cashlessBalances.length &&
                            <div className="my-4 flex justify-center">

                            <PrimaryButton 
                             type="button"
                             className="mx-auto bg-slate-800"
                             onClick={addCashlessRow}
                                 >
                                     Set Cashless Balance
                                 </PrimaryButton>
                            </div>
   

                           }
                          
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
                                    Start Selling
                                </PrimaryButton>
                            </CardFooter>
                        </form>
                  </CardBody>
            </Card>
        </Authenticated>
    );
}

export default Form;
