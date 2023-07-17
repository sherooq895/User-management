import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginData } from "../Api/UserAuthentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authentication } from "../Api/UserAutherisation"

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [er, setEr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await authentication()
                if(data.status){
                    navigate('/showusers')
                }
            } catch (error) {
                if (!error?.response?.data?.success) {
                    navigate('/')
                }
            }
        })()
    }, [])


    const onSubmit = async (formdata) => {
        try {
            const { data } = await LoginData(formdata);
            localStorage.setItem("accessToken", data?.adminToken);
            toast.success(data.message + "\n navigating to home..");
            setTimeout(() => {
                navigate("/showusers");
            }, 2000);
        } catch (err) {
            if (err?.response?.status === 401) {
                const { data } = err?.response;
                setEr(data?.message);
                setTimeout(() => {
                    setEr("");
                }, 5000);
            } else {
                alert("something went wrong, try again");
            }
        }
    };


    return (
        <div className="flex justify-center h-screen bg-[#000000]">
            <div className="hidden bg-cover lg:block lg:w-2/3 bg-[url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzdG9yZXxlbnwwfHwwfHw%3D&w=1000&q=80')]">
                <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <h2 className="text-4xl font-bold text-white">User Managment</h2>
                    </div>
                </div>
            </div>
            <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div className="flex-1">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-center text-white">
                            Login
                        </h2>
                        <p className="mt-3 text-white">
                            Sign in to access your account
                        </p>
                        <p className="mb-4 text-red-400 text-sm ml-2">{er}</p>
                    </div>
                    <div className="mt-8">
                        <form onSubmit={handleSubmit(onSubmit, (data) => { })}>
                            <div>
                                <label className="block mb-2 text-sm text-white dark:text-gray-200">
                                    Email Address
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    placeholder="example@example.com"
                                    className="block w-full px-4 py-2 mt-2 rounded-md"
                                />
                            </div>
                            {/* <p className="text-red-500">{errors.Email?.message}</p> */}
                            <div className="mt-6">
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm text-white">
                                        Password
                                    </label>
                                </div>
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 4,
                                            message: "Min length is 4",
                                        },
                                    })}
                                    placeholder="Your Password"
                                    className="block w-full px-4 py-2 mt-2 rounded-md"
                                />
                            </div>
                            <p className="text-red-500">{errors.Password?.message}</p>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-white bg-gray-800 rounded-md"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Login