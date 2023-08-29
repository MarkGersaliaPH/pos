import NavLink from "@/Components/NavLink";
import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaList, FaUsers } from "react-icons/fa";
import {
    FcBiohazard,
    FcBullish,
    FcConferenceCall,
    FcCustomerSupport,
    FcList,
    FcOpenedFolder,
    FcPackage,
    FcSelfServiceKiosk,
} from "react-icons/fc";

function Sidebar() {
    const menus = [
        {
            name: "Dashboard",
            route: "dashboard",
            key: "dashboard",
            icon: <FcBullish className=" text-lg" />,
        },
        {
            name: "Point of Sales",
            route: "admin.pos",
            key: "pos",
            icon: <FcSelfServiceKiosk className="text-blue-400 text-lg" />,
        },

        {
            name: "Product Management",
            icon: <FcPackage className="text-blue-400 text-lg" />,
            child: [
                {
                    name: "Products",
                    route: "admin.products.index",
                    key: "products",
                    icon: <FcPackage className="text-blue-400 text-lg" />,
                },
                // {
                //     name: "Stocks",
                //     route: "profile.edit",
                //     key: "profile",
                //     icon: <FcOpenedFolder className="text-blue-400 text-lg" />,
                // },
                {
                    name: "Categories",
                    route: "admin.categories.index",
                    key: "categories",
                    icon: <FcList className="text-blue-400 text-lg" />,
                },
            ],
        },

        {
            name: "Users Management",
            key: "users",
            icon: <FcConferenceCall className="text-blue-400 text-lg" />,
            child: [
                {
                    name: "Users",
                    route: "admin.users.index",
                    key: "users",
                    icon: (
                        <FcConferenceCall className="text-blue-400 text-lg" />
                    ),
                },
                {
                    name: "Cashiers",
                    route: "admin.users.index",
                    key: "cashiers",
                    icon: (
                        <FcCustomerSupport className="text-blue-400 text-lg" />
                    ),
                },
            ],
        },
    ];

    return (
        <div>
            <aside
                className="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0"
                aria-expanded="false"
            >
                <div className="h-19">
                    <i
                        className="absolute top-0 right-0 p-4 opacity-50 cursor-pointer fas fa-times dark:text-white text-slate-400 xl:hidden"
                        sidenav-close
                    ></i>
                    <a
                        className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
                        href="https://demos.creative-tim.com/argon-dashboard-tailwind/pages/dashboard.html"
                        target="_blank"
                    >
                        <span className="text-xl text-blue-500 font-semibold transition-all duration-200 ease-nav-brand block">
                            POSerize
                        </span>

                        <span className="text-sm font-extralight text-gray-400">
                            Where Sales Meet Simplicity
                        </span>
                    </a>
                </div>

                <hr className="h-px mb-3 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

                <div className="items-center block w-auto max-h-screen h-sidenav grow basis-full">
                    <ul className="flex flex-col pl-0 mb-0">
                        {/* {menus.map((menu, key) => (
                            <li className="mt-0.5 w-full" key={key}>
                                <NavLink
                                    href={menu.route && route(menu.route)}
                                    active={route().current(menu.key)}
                                >
                                    <div className="mr-2 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1">
                                        {menu.icon}
                                    </div>
                                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                                        {menu.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))} */}
                        {menus.map((menu, key) => (
                            <>
                                {menu.child ? (
                                    <li class="w-full mt-4 mb-2">
                                        <h6 class="pl-6 font-bold leading-tight uppercase dark:text-white text-xs  border-b pb-3">
                                            {menu.name}
                                        </h6>
                                    </li>
                                ) : (
                                    <li className="mt-0.5 w-full" key={key}>
                                        <NavLink
                                            href={
                                                menu.route && route(menu.route)
                                            }
                                            active={route()
                                                .current()
                                                .includes(menu.key)}
                                        >
                                            <div className="mr-2 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1">
                                                {menu.icon}
                                            </div>
                                            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                                                {menu.name}
                                            </span>
                                        </NavLink>
                                    </li>
                                )}
                                {/* {menu.child &&
                                    menu.child.map((child, key) => (
                                        <li className="mt-0.5 w-full">
                                            <NavLink
                                                href={
                                                    child.route &&
                                                    route(child.route)
                                                }
                                                active={route().current(key)}
                                            >
                                                <div className=" mr-2 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1">
                                                    {child.icon}
                                                </div>
                                                <span className=" duration-300 opacity-100 pointer-events-none ease">
                                                    {child.name}
                                                </span>
                                            </NavLink>
                                        </li>
                                    ))} */}
                                {menu.child &&
                                    menu.child.map((child, childKey) => (
                                        <li
                                            className="mt-0.5 w-full"
                                            key={childKey}
                                        >
                                            <NavLink
                                                href={
                                                    child.route &&
                                                    route(child.route)
                                                }
                                                active={route()
                                                    .current()
                                                    .includes(child.key)} // Use child.key here
                                            >
                                                <div className="mr-2 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-1">
                                                    {child.icon}
                                                </div>
                                                <span className="duration-300 opacity-100 pointer-events-none ease">
                                                    {child.name}
                                                </span>
                                            </NavLink>
                                        </li>
                                    ))}
                            </>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
