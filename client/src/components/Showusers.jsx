import React from 'react'

function Showusers() {
  return (
    <div>

    <section className="py-1 bg-blueGray-50">
        <div className="w-full">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0 bg-[#baffc6]">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex justify-between">
                            <h3 className="font-semibold text-base text-blueGray-700">Users List</h3>
                            <h3 className="font-semibold text-base text-blueGray-700">Total : <strong>ddf</strong> </h3>
                        </div>
                       
                    </div>
                </div>

                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead>
                            <tr>
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
                            {/* {
                                applicationList?.map((list, index) => {
                                    return (
                                        <tr className='border-b-2' key={index}>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{index + 1}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 "><img src={'http://localhost:4000/api/images/' + list.image} alt="" /></td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.email}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.phone}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.designation}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.gender}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.course}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">{list?.createdAt.slice(0,10)}</td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap py-4 ">
                                                <button className="mr-3 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={() => { EditEmployee(list) }}>Edit</button>
                                                <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => { DeleteEmployee(list._id) }}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            } */}
                            <tr>
                                <td>dfdsfdsf</td>
                                <td>dfdsfdsf</td>
                                <td>dfdsfdsf</td>
                                <td>dfdsfdsf</td>
                                <td>dfdsfdsf</td>
                            </tr>


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </section>

    
    
</div>
  )
}

export default Showusers