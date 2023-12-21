import React, { useState } from 'react'

import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const DegreeForm = () => {

    const navigate = useNavigate();
    const [degree, setDegree] = useState('')
    const [field, setField] = useState('')

    const submitDegree = async (e) => {
        e.preventDefault()
        if (degree !== '' && field !== '') {
            try {
                await axios.post(
                    'http://127.0.0.1:8000/admin/addCourse', {
                    degreeName: degree,
                    field: field
                }, {
                    headers: { "Access-Control-Allow-Origin": "*" }
                }).then(function (response) {
                    console.log(response)
                    toast.success("Successfully added the nre degree information");
                    navigate('/admin/dashboard');
                }).catch(function (error) {
                    console.log(error)
                    toast.error("Something went wrong")
                })
            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")
            }
        }
        else {
            toast.error("Please fill all the fields")
        }
    }


    return (
        <>
            <ToastContainer />
            <div className='flex items-center justify-center'>
                <div className='w-1/2 h-auto m-32 bg-slate-100 shadow-xl'>

                    <div className='p-20'>
                        <div className='my-10'>
                            <p className='text-2xl font-semibold font-mono'>Enter the Degree Programms Details</p>
                        </div>
                        <form>
                            <div class="relative z-0 w-full mb-6 group">
                                <input type="text" name="deg" id="deg" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    onChange={(e) => setDegree(e.target.value)}
                                />
                                <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Degree Program</label>
                            </div>
                            <div class="relative z-0 w-full mb-6 group">
                                <input type="text" name="field" id="field" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                                    onChange={(e) => setField(e.target.value)}
                                />
                                <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Field</label>
                            </div>
                            <button type="submit" class="text-white bg-primary  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center " onClick={submitDegree}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DegreeForm