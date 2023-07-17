import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { ComputerDesktopIcon, UserIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
    const Navigate = useNavigate()

    const [layouts, setLayouts] = useState([
        {
            Icon: 'ComputerDesktopIcon',
            title: 'Show Users',
            link: '/showusers'
        },
        {
            Icon: '',
            title: 'Create user',
            link: '/createuser'
        },

    ])

    const logout = () => {
        localStorage.removeItem('accessToken');
        Navigate("/");
    };

    return (
        <div className='flex'>
            <Disclosure as="nav">
                <Disclosure.Button className="md:hidden absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <GiHamburgerMenu
                        className="block md:hidden h-6 w-6"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-col justify-start item-center">
                        <h1 className="capitalize text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                            Admin <br /> Dashboard
                        </h1>
                        <div className=" my-4 border-b border-gray-100 pb-4">
                            {
                                layouts?.map((menu, index) => {
                                    return (
                                        <Link to={menu.link}>
                                            <div key={index} className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                                <ComputerDesktopIcon className="text-dark m-2 h-6 w-6 group-hover:text-white" />
                                                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                                                    <a>{menu.title}</a>
                                                </h3>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                        {/* logout */}
                        <div className=" my-4">
                            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                <ArrowLeftOnRectangleIcon className="text-dark m-2 h-6 w-6 group-hover:text-white" />
                                <button>
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold " onClick={logout}>
                                        Logout
                                    </h3>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
            <div className="block md:ml-[250px] p-4 w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Layout