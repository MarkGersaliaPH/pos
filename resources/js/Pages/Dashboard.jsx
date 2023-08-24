import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    FcBullish,
    FcComboChart,
    FcConferenceCall,
    FcMoneyTransfer,
} from "react-icons/fc";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="">
                <div className="flex flex-wrap -mx-3">
                    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                                                Today's Money
                                            </p>
                                            <h5 className="mb-2 font-bold dark:text-white">
                                                $53,000
                                            </h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-emerald-500">
                                                    +55%
                                                </span>
                                                since yesterday
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                                            <FcMoneyTransfer className="ni h-8 w-8 leading-none ni-money-coins text-lg relative top-2.5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                                                Today's Users
                                            </p>
                                            <h5 className="mb-2 font-bold dark:text-white">
                                                2,300
                                            </h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-emerald-500">
                                                    +3%
                                                </span>
                                                since last week
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-red-600 to-orange-600">
                                            {/* <i className="ni leading-none ni-world text-lg relative top-3.5 text-white"></i> */}
                                            <FcConferenceCall className="ni h-8 w-8 leading-none ni-money-coins text-lg relative top-2.5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                                                New Clients
                                            </p>
                                            <h5 className="mb-2 font-bold dark:text-white">
                                                +3,462
                                            </h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-red-600">
                                                    -2%
                                                </span>
                                                since last quarter
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-emerald-500 to-teal-400">
                                            {/* <i className="ni leading-none ni-paper-diploma text-lg relative top-3.5 text-white"></i> */}
                                            <FcComboChart className="ni h-8 w-8 leading-none ni-money-coins text-lg relative top-2.5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex flex-row -mx-3">
                                    <div className="flex-none w-2/3 max-w-full px-3">
                                        <div>
                                            <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                                                Sales
                                            </p>
                                            <h5 className="mb-2 font-bold dark:text-white">
                                                $103,430
                                            </h5>
                                            <p className="mb-0 dark:text-white dark:opacity-60">
                                                <span className="text-sm font-bold leading-normal text-emerald-500">
                                                    +5%
                                                </span>
                                                than last month
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 text-right basis-1/3">
                                        <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-orange-500 to-yellow-500">
                                            {/* <i className="ni leading-none ni-cart text-lg relative top-3.5 text-white"></i> */}
                                            <FcBullish className="ni h-8 w-8 leading-none ni-money-coins text-lg relative top-2.5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-[50px]">
                    <div className="p-6 text-gray-900">You're logged in!</div>
                </div>

                <div className="h-screen"></div>

                <footer className="pt-4">
                    <div className="w-full px-6 mx-auto">
                        <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
                            <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                                <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
                                    ©
                                    <script>
                                        document.write(new Date().getFullYear()
                                        + ",");
                                    </script>
                                    made with <i className="fa fa-heart"></i> by
                                    <a
                                        href="https://www.creative-tim.com"
                                        className="font-semibold text-slate-700 dark:text-white"
                                        target="_blank"
                                    >
                                        Creative Tim
                                    </a>
                                    for a better web.
                                </div>
                            </div>
                            <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                                <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                                    <li className="nav-item">
                                        <a
                                            href="https://www.creative-tim.com"
                                            className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500"
                                            target="_blank"
                                        >
                                            Creative Tim
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="https://www.creative-tim.com/presentation"
                                            className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500"
                                            target="_blank"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="https://creative-tim.com/blog"
                                            className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-in-out text-slate-500"
                                            target="_blank"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            href="https://www.creative-tim.com/license"
                                            className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-in-out text-slate-500"
                                            target="_blank"
                                        >
                                            License
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
