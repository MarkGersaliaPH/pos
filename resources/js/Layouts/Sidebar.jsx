import NavLink from "@/Components/NavLink";
import React from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaList, FaUsers } from "react-icons/fa";
import {
    FcBiohazard,
    FcBullish,
    FcConferenceCall,
    FcOpenedFolder,
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
            route: "profile.edit",
            key: "profile",
            icon: <FcSelfServiceKiosk className="text-blue-400 text-lg" />,
        },
        {
            name: "Users Management",
            route: "profile.edit",
            key: "profile",
            icon: <FcConferenceCall className="text-blue-400 text-lg" />,
        },
        {
            name: "Stocks Management",
            route: "profile.edit",
            key: "profile",
            icon: <FcOpenedFolder className="text-blue-400 text-lg" />,
        },
        {
            name: "Products",
            route: "profile.edit",
            key: "profile",
            icon: <FcBiohazard className="text-blue-400 text-lg" />,
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
                        <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand block">
                            POSerize
                        </span>

                        <span className="text-sm font-extralight text-gray-400">
                            Where Sales Meet Simplicity
                        </span>
                    </a>
                </div>

                <hr className="h-px mb-3 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

                <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
                    <ul className="flex flex-col pl-0 mb-0">
                        {menus.map((menu, key) => (
                            <li className="mt-0.5 w-full" key={key}>
                                <NavLink
                                    href={route(menu.route)}
                                    active={route().current(menu.key)}
                                >
                                    <div className="mr-2 flex items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                                        {menu.icon}
                                    </div>
                                    <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">
                                        {menu.name}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mx-4">
                    <p className="invisible hidden text-gray-800 text-red-500 text-red-600 text-blue-500 bg-gray-500/30 bg-cyan-500/30 bg-emerald-500/30 bg-orange-500/30 bg-red-500/30 after:bg-gradient-to-tl after:from-zinc-800 after:to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 after:from-blue-700 after:to-cyan-500 after:from-orange-500 after:to-yellow-500 after:from-green-600 after:to-lime-400 after:from-red-600 after:to-orange-600 after:from-slate-600 after:to-slate-300 text-emerald-500 text-cyan-500 text-slate-400"></p>
                    <div
                        className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
                        sidenav-card
                    >
                        <img
                            className="w-1/2 mx-auto"
                            src="/template/assets/img/illustrations/icon-documentation.svg"
                            alt="sidebar illustrations"
                        />
                        <div className="flex-auto w-full p-4 pt-0 text-center">
                            <div className="transition-all duration-200 ease-nav-brand">
                                <h6 className="mb-0 dark:text-white text-slate-700">
                                    Need help?
                                </h6>
                                <p className="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-60">
                                    Please check our docs
                                </p>
                            </div>
                        </div>
                    </div>
                    <a
                        href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/argon-dashboard/"
                        target="_blank"
                        className="inline-block w-full px-8 py-2 mb-4 text-xs font-bold leading-normal text-center text-white capitalize transition-all ease-in rounded-lg shadow-md bg-slate-700 bg-150 hover:shadow-xs hover:-translate-y-px"
                    >
                        Documentation
                    </a>

                    <a
                        className="inline-block w-full px-8 py-2 text-xs font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md select-none bg-150 bg-x-25 hover:shadow-xs hover:-translate-y-px"
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-tailwind?ref=sidebarfree"
                        target="_blank"
                    >
                        Upgrade to pro
                    </a>
                </div>
            </aside>
        </div>
    );
}

export default Sidebar;
