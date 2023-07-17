import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { createuser, authentication } from "../Api/UserAutherisation"


function Createuser() {
    const Navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm();

    useEffect(() => {
        (async () => {
            try {
                await authentication()
            } catch (error) {
                if (!error?.response?.data?.success) {
                    Navigate('/')
                }
            }
        })()
    }, [])

    const [formErr, setFormErr] = useState('');
    const [application, setApplication] = useState({
        name: '', email: '',
        phone: '', gender: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setApplication({
            ...application,
            [name]: value,
        })
    }

    const applicationForm = async (e) => {
        try {
            createuser(application).then((response) => {
                if (!response?.data?.err) {
                    alert('FORM SUBMITTED SUCCESSFULLY.')
                    setFormErr('')
                    setApplication({
                        name: '', email: '',
                        phone: '', gender: '',
                    })
                } else {
                    setFormErr(response?.data?.msg)
                }
            })
        } catch (error) {
            if (!error.response.data.success) {
                Navigate('/')
            }
        }
    }


    return (
        <div>
            <main className='flex justify-center items-center w-full min-h-[100vh] py-5'>
                <div className="bg-white flex flex-col rounded-2xl shadow-2xl w-3/4">
                    <div className="w-full text-center py-2" >
                        <h2 className='text-3xl font-bold text-green-500 mb-2 uppercase'> Application for User </h2>
                        <div className='w-fit mx-auto'>
                            <div className=' bg-green-500 border-2 w-10 border-green-500 inline-block mb-2'></div>
                        </div>
                    </div>
                    <form autoComplete="off" onSubmit={handleSubmit(applicationForm)} >
                        <div className="grid-cols-1  w-full grid md:grid-cols-2 gap-2 p-5">
                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <input type="text" {...register('name', { required: true, pattern: /^@?(\w){1,50}$/ })} value={application.name} id="name" onChange={handleChange} placeholder='Name *' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                {errors.name && <p className='text-[13px] text-red-600'>name is required.</p>}
                            </div>


                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <input type="text" {...register('email', { required: true, pattern: /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ })} id="email" onChange={handleChange} value={application.email} placeholder='Email *' className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                {errors.email && <p className='text-[13px] text-red-600'>Email is required.</p>}
                            </div>
                            <div className='bg-gray-100 w-full p-2 flex items-start flex-col mb-5'>
                                <input value={application.phone} type="text"{...register('phone', { required: true, maxLength: 10, pattern: /^[0-9]{10}$/ })} id="phone" placeholder='Phone no' onChange={handleChange} className='bg-gray-100 outline-none text-sm flex-1 py-1 w-full' />
                                {errors.phone && <p className='text-[13px] text-red-600'>number is required.</p>}
                            </div>

                            <div>
                                <label htmlFor="" className='text-left'>Gender</label>
                                <div className="flex">
                                    <div className=' p-2 flex items-center pl-0'>
                                        <input type="radio" {...register('gender', { required: true })} value="male" id="male" onChange={handleChange} placeholder='' className=' ' />
                                        <label htmlFor="male" className="text-sm font-medium text-gray-900 ml-2 block" >Male</label>
                                    </div>
                                    <div className='p-2 flex items-center'>
                                        <input type="radio" {...register('gender', { required: true })} value="female" id="female" placeholder='' onChange={handleChange} className=' ' />
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
            </main>

        </div>
    )
}

export default Createuser