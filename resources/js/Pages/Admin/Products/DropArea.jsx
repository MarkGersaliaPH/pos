import Card, { CardBody } from "@/Components/Card";
import React from "react";
import { useDrop } from "react-dnd";

function DropArea({ onDrop, selectedItems,...props }) {
    const [, drop] = useDrop({
        accept: "ITEM",
        drop: (item) => 
        onDrop(item),
    });

    return (
        <div
            ref={drop} 
           
            {...props}
        > 
            {selectedItems &&
                selectedItems.map((item, key) => (
                    <Card className="mb-2">
                    <CardBody>
                    {item.name} 
                    </CardBody>
                  </Card>
                ))}
        </div>
    );
}

export default DropArea;
