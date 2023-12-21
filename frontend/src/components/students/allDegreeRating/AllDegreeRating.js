import React, { useEffect, useState } from 'react'
import { IoMdLogOut } from 'react-icons/io';

import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import logo from '../../../assets/images/logo.png'
import axios from 'axios';
import DegreeReviewItem from '../../common/degreeReviewItem/DegreeReviewItem';
import Popup from 'reactjs-popup';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';


const AllDegreeRating = () => {

    const navigate = useNavigate()

    const logoutUser = () => {
        localStorage.clear()
        toast.info("User logging out")
        navigate('/')
    }

    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);

    const { id } = useParams();

    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get('http://127.0.0.1:8000/student/course/getAllRate', {
                    params: {
                        courseId: id
                    }
                }).then(function (response) {
                    // setDegreeReview(...degreeReview, response.data)
                    setReviewList(response.data)
                    console.log("res", response.data)
                }).catch(function (error) {
                    console.log(error)
                })

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>

            {/* {degreeReview} */}
            <div className='flex justify-between mx-10 mt-5'>
                <div className=''>
                <div className='flex items-center'>
                       
                        <img src={logo} alt='logo' className='w-20 h-20 rounded-full' />
                        <p className='font-mono text-2xl text-slate-900 font-bold'>
                    EduRater
                    </p>
                       
                        
                    </div>
                </div>
                <div>
                    <div className="">
                        <div className="bg-[url('https://i.im.ge/2023/07/09/5ocnUr.graph.png')]">
                            <div className='flex justify-center items-center mt-10 '>
                                {
                                    retrievedObject !== null ?
                                        <>
                                            <div className='mr-10 font-bold flex'>
                                                <p className='text-xl'>Hello</p>
                                                <span className='text-xl mx-2'>{retrievedObject.firstname}</span>
                                            </div>
                                            <div>
                                                <div className='flex w-fit h-fit bg-primary px-3 py-1 rounded-full text-white cursor-pointer hover:ring-2 hover:ring-black' onClick={logoutUser}>
                                                    <IoMdLogOut className='w-6 h-6 ml-1 mt-1' />
                                                    <div className='flex items-center mt-0.5'>
                                                        <p className='font-mono text-xs'>Logout</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>

                                        :
                                        <div className='flex'>
                                            <div className='mx-3 bg-white text-black border-2 border-black w-32 h-8 flex items-center justify-center rounded-2xl cursor-pointer'>



                                                <Popup
                                                    trigger={
                                                        <div>
                                                            <p className='font-mono font-semibold'>Sign In</p>
                                                        </div>


                                                    }
                                                    modal
                                                    nested
                                                >
                                                    {close => (
                                                        <div className="modal">
                                                            <SignIn />
                                                        </div>
                                                    )}
                                                </Popup>


                                            </div>
                                            <div className='mx-3 bg-black text-white w-32 h-8 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-500 ease-in-out'>







                                                <Popup
                                                    trigger={

                                                        <div>
                                                            <p className='font-mono font-semibold'>Sign Up</p>
                                                        </div>


                                                    }
                                                    modal
                                                    nested
                                                >
                                                    {close => (
                                                        <div className="modal">
                                                            <SignUp />
                                                        </div>
                                                    )}
                                                </Popup>




                                            </div>
                                        </div>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 font-mono text-white mb-10'>
                <div className='flex justify-end mx-10'>
                    <div className='mx-2 bg-primary px-4 rounded-3xl cursor-pointer' onClick={() => navigate('/student/newDegreeRate/' + id + "/" + localStorage.getItem("selectedDegreeName") + "/" + localStorage.getItem("selectedField"))}>
                        <p>Add New a Rating</p>
                    </div>
                    {
                        retrievedObject !== null ?
                            <div className='mx-2 bg-primary px-4 rounded-3xl cursor-pointer' onClick={() => navigate('/student/dashboard')}>
                                <p>Return to Dashboard</p>
                            </div>
                            :
                            <div className='mx-2 bg-primary px-4 rounded-3xl cursor-pointer' onClick={() => navigate('/')}>
                                <p>Return to Home</p>
                            </div>
                    }
                </div>
            </div>
            <div>
                {
                    reviewList.length === 0 ?
                        <div className='flex justify-center items-center mt-10'>
                            <p className='text-slate-900 text-2xl font-semibold '>No reviews for this degree program</p>
                        </div>
                        :
                        reviewList
                        .slice() // Create a shallow copy of the array
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((rate, index) => (
                            <div key={index} className='my-5'>
                                <DegreeReviewItem rate={rate} />
                            </div>
                        ))
                }
            </div>
        </>
    )
}

export default AllDegreeRating