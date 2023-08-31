export function GrayBadge({ children, className }) {
    return (
        <span
            className={`${className} inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10`}
        >
            {children}
        </span>
    );
}
export function DangerBadge({ children }) {
    return (
        <span className="inline-flex items-center rounded-md absolute bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            {children}
        </span>
    );
}

export function PrimaryBadge({ children, className }) {
    return (
        <span
            className={`${className} inline-flex items-center absolute rounded-md bg-blue-500 px-2 py-1 text-xs font-medium text-white`}
        >
            {children}
        </span>
    );
}

export function InfoBadge({ children, className }) {
    return (
        <span
            className={`${className} absolute inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10`}
        >
            {children}
        </span>
    );
}
