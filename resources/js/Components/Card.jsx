import React from "react";

export function CardHeader({ title, children, className, titleClass }) {
    return (
        <div
            className={`flex justify-between items-center p-6 border-b dark:border-slate-200 ${className}`}
        >
            <h5
                className={`text-xl font-medium  leading-tight align-middle text-neutral-800 dark:text-neutral-50 ${titleClass}`}
            >
                {title}
            </h5>
            <div className="flex gap-2 ">{children}</div>
        </div>
    );
}
export function CardBody({ title, children, className }) {
    return (
        <div className={`p-3 ${className}`}>
            <div>{children}</div>
        </div>
    );
}
export function CardFooter({ title, children }) {
    return (
        <div className="flex items-center  justify-between pb-5 mr-10 mt-10">
            <div>{children}</div>
        </div>
    );
}

function Card({ title, children, className, ...props }) {
    return (
        <div  {...props}
        className={`
            block rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-800 bg-white
            ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;
