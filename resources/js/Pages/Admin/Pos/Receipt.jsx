import React from "react";

const Receipt = () => {
    return (
        <div>
            <div id="receipt">
                <h2>Receipt</h2>
                <p>Item: Laptop</p>
                <p>Price: $1200</p>
                <p>Date: {new Date().toLocaleDateString()}</p>
                {/* Add more receipt content as required */}
            </div>
        </div>
    );
};

export default Receipt;
