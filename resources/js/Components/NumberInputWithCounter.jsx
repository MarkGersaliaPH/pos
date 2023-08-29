import React, { useState } from "react";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";
import { FaMinus, FaPlus } from "react-icons/fa";

function NumberInputWithCounter({ initialValue, min, max, onChange }) {
    const [count, setCount] = useState(initialValue || 0);

    const increment = () => {
        if (!max || count < max) {
            const newValue = count + 1;
            setCount(newValue);
            onChange && onChange(newValue);
        }
    };

    const decrement = () => {
        if (typeof min === "undefined" || count > min) {
            const newValue = count - 1;
            setCount(newValue);
            onChange && onChange(newValue);
        }
    };

    return (
        <div className="flex  align-middle items-center border rounded-md">
            <SecondaryButton
                onClick={decrement}
                className="  border-0 rounded-l-md"
            >
                <FaMinus />
            </SecondaryButton>
            <TextInput
                type="number"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className=" text-center flex-1 outline-none border-0"
                min={min}
                max={max}
            />
            <SecondaryButton
                onClick={increment}
                className="  rounded-r-md border-0"
            >
                <FaPlus />
            </SecondaryButton>
        </div>
    );
}

export default NumberInputWithCounter;
