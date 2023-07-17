import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getusers, deleteUser, editUser, searchemail } from "../Api/UserAutherisation"

function Showusers() {

    const Navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const [applicationList, setApplicationList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fileErr, setFileErr] = useState('');
    const [formErr, setFormErr] = useState('');
    const [searchvalue, setsearchvalue] = useState({
        search: ''
    })




    const searchsubmit = async (e) => {
        const { name, value } = e.target
        setsearchvalue({
            ...searchvalue,
            [name]: value
        })
        const { data } = await searchemail(e.target.value)
        setApplicationList(data)
    }



    const [application, setApplication] = useState({});

    const getEmployeeListData = async () => {
        try {
            const { data } = await getusers()
            setApplicationList(data)
        } catch (error) {
            if(!error.response.data.success){
                Navigate('/')
            }
        }
    };

    const DeleteEmployee = async (id) => {
        const { data } = await deleteUser(id)
    }

    const EditEmployee = (EmployeeData) => {
        setApplication(EmployeeData)
        setShowModal(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setApplication({
            ...application,
            [name]: value,
        })
    }

    const applicationForm = async () => {
        if (fileErr == '') {
            setFileErr('')
            const { data } = await editUser(application)
            if (data.auth === false) {
                Navigate("/login");
            } else if (data.err) {
                setFormErr(data.msg)
            } else if (data.edit) {
                alert('edit successfully')
                setShowModal(!showModal)
            } else if (data.error == true) {
                Navigate("/error");
            }
            else {
                setFormErr('')
                setApplication({})
            }
        } else {
            setFileErr('Please select image')
        }

    }

    const EmployeeList = useCallback(() => {
        getEmployeeListData()
    }, [DeleteEmployee])

    useEffect(() => {
        EmployeeList()
    }, [showModal])

    return (
        <div>

            <section className="py-1 bg-blueGray-50">
                <div className="w-full">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0 bg-[#f1f1f1]">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex justify-between">
                                    <h3 className="font-semibold text-base text-blueGray-700">Users List</h3>
                                    <div className="flex pr-4">
                                        <label className="block font-medium text-base mb-2 text-gray-700">
                                            Search email
                                        </label>
                                        <input
                                            name='search'
                                            type="text"
                                            value={searchvalue?.search}
                                            onChange={searchsubmit}
                                            placeholder="Search"
                                            className="mt-2 px-2 py-1 border border-gray-300 rounded-md w-full"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-base text-blueGray-700">Total : <strong>{applicationList?.length}</strong> </h3>
                                </div>


                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">

                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Name
                                        </th>

                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Email
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Mobile
                                        </th>

                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Gender
                                        </th>

                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                            Create Date
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        applicationList?.map((list, index) => {
                                            return (
                                                <tr className='border-b-2' key={index}>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{index + 1}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.name}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.email}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.phone}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.gender}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.createdAt.slice(0, 10)}</td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">
                                                        <button className="mr-3 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => { EditEmployee(list) }}>Edit</button>
                                                        <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => DeleteEmployee(list?._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Edit User Data</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form autoComplete="off" onSubmit={handleSubmit(applicationForm)}>
                                        <div className="grid-cols-1  w-full grid md:grid-cols-2 gap-2 p-5">
                                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                                <input type="text" {...register('name', { required: true, pattern: /^@?(\w){1,50}$/ })} value={application.name} onChange={handleChange} id="name" placeholder='Name *' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                                {errors.name && <p className='text-[13px] text-red-600'>name is required.</p>}
                                            </div>


                                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                                <input type="text" {...register('email', { required: true, pattern: /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ })} value={application.email} onChange={handleChange} id="email" placeholder='Email *' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                                {errors.email && <p className='text-[13px] text-red-600'>Email is required.</p>}
                                            </div>
                                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                                <input type="text"{...register('phone', { required: true, maxLength: 10, pattern: /^[0-9]{10}$/ })} value={application.phone} onChange={handleChange} id="phone" placeholder='Phone no' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                                {errors.phone && <p className='text-[13px] text-red-600'>number is required.</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="" className='text-left'>Gender</label>
                                                <div className="flex">
                                                    <div className=' p-2 flex items-center pl-0'>
                                                        <input type="radio" {...register('gender', { required: true })} value={application?.gender} onChange={() => setApplication({ ...application, gender: 'male' })} id="male" placeholder='' className=' ' checked={application?.gender === 'male'} />
                                                        <label htmlFor="male" className="text-sm font-medium text-gray-900 ml-2 block" >Male</label>
                                                    </div>
                                                    <div className='p-2 flex items-center'>
                                                        <input type="radio" {...register('gender', { required: true })} value={application?.gender} onChange={() => setApplication({ ...application, gender: 'female' })} id="female" placeholder='' className=' ' checked={application?.gender === 'female'} />
                                                        <label htmlFor="female" className="text-sm font-medium text-gray-900 ml-2 block">Female</label>
                                                    </div>
                                                </div>
                                                {errors.gender && <p className='text-[13px] text-red-600'>Gender is required.</p>}
                                            </div>


                                        </div>
                                        <div className='px-5 w-fit mx-auto pb-5'>
                                            <button type='submit' className='border-2 text-green-500 border-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'>Submit</button>
                                            {formErr ? <p className='text-[13px] text-red-600'>{formErr}</p> : ''}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}



        </div>
    )
}

export default Showusers