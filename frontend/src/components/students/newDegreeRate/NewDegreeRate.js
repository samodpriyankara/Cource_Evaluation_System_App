import React, { useState } from 'react'
import { IoMdLogOut } from 'react-icons/io';
import { MdDataSaverOn } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import logo from '../../../assets/images/logo.png'
import axios from 'axios';
import RatingComponent from '../../common/rating/RatingComponent';

import Popup from 'reactjs-popup';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';


const NewDegreeRate = () => {

    const navigate = useNavigate()

    const logoutUser = () => {
        localStorage.clear()
        toast.info("User logging out")
        navigate('/')
    }

    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);

    const { id, degree, field } = useParams();

    const [reputation, setReputation] = useState(0);
    const [opportunities, setOpportunities] = useState(0);
    const [accQuality, setAccQuality] = useState(0);
    const [happiness, setHappiness] = useState(0);
    const [facilities, setFacilities] = useState(0);
    const [comment, setComment] = useState("");
    const [overallRate, setOverallRate] = useState(0);

    const addRate = async (e) => {
        try {
            await axios.post(
                'http://127.0.0.1:8000/student/course/addRate', {
                "reputation": reputation,
                "opportunities": opportunities,
                "accQuality": accQuality,
                "happiness": happiness,
                "facilities": facilities,
                "comment": comment,
                "overallRate": overallRate,
                "studentId": retrievedObject.id,
                "courseId": id

            }, {
                headers: { "Access-Control-Allow-Origin": "*" }
            }).then(function (response) {
                console.log(response)
                toast.success("Successfully added the new degree rate");
                navigate('/student/dashboard');
            }).catch(function (error) {
                console.log(error)
                toast.error("Something went wrong")
            })
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    const notThereUser = () => {
        toast.warn("Please, Login or Register to Submit your Review")
    }

    return (

        <>

            {/* {degreeReview} */}
            <ToastContainer />
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
                                        <div className='mr-10 font-bold flex'>
                                            <p className='text-xl'>Hello</p>
                                            <span className='text-xl mx-2'>{retrievedObject.firstname}</span>
                                        </div>
                                        :
                                        <></>

                                }

                                <div>

                                    {
                                        retrievedObject !== null ?
                                            <div className='flex w-fit h-fit bg-primary px-3 py-1 rounded-full text-white cursor-pointer hover:ring-2 hover:ring-black' onClick={logoutUser}>
                                                <IoMdLogOut className='w-6 h-6 ml-1 mt-1' />
                                                <div className='flex items-center mt-0.5'>
                                                    <p className='font-mono text-xs'>Logout</p>
                                                </div>
                                            </div>
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
            </div>
            <div className='mt-5 font-mono text-white'>
                <div className='flex justify-end mx-10'>
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
            <div className='mt-12'>
                <div className='mx-20 font-mono bg-slate-100'>
                    <div className='ml-4 mt-2'>
                        <div>
                            <p className='text-3xl font-bold'>{degree}</p>
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{field}</p>
                        </div>
                    </div>
                    <div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Reputation</p>
                            </div>
                            <div>
                                <RatingComponent newValue={reputation} onRatingChange={(value) => { setReputation(value) }} />
                            </div>
                        </div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Opportunities</p>
                            </div>
                            <div>
                                <RatingComponent newValue={opportunities} onRatingChange={(value) => { setOpportunities(value) }} />
                            </div>
                        </div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Academic Quality</p>
                            </div>
                            <div>
                                <RatingComponent newValue={accQuality} onRatingChange={(value) => { setAccQuality(value) }} />
                            </div>
                        </div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Happiness</p>
                            </div>
                            <div>
                                <RatingComponent newValue={happiness} onRatingChange={(value) => { setHappiness(value) }} />
                            </div>
                        </div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Facilities</p>
                            </div>
                            <div>
                                <RatingComponent newValue={facilities} onRatingChange={(value) => { setFacilities(value) }} />
                            </div>
                        </div>
                    </div>
                    <div className=''>

                        <label for="message" className="block mb-2 text-lg">Your Comment</label>
                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." onChange={(e) => setComment(e.target.value)}>{comment}</textarea>

                    </div>
                    <div className='flex justify-between'>
                        <div className='flex mt-5'>
                            <div>
                                <p>Set Your Overall Rating</p>
                                <p className='text-xs'>**Ex: 2 /5</p>
                            </div>
                            <div className='flex mx-2'>
                                <input className='h-6 bg-slate-700 rounded-md text-white' type='number ' onChange={(e) => { setOverallRate(e.target.value) }} />
                                <p className='mx-1'>/5</p>
                            </div>
                        </div>
                        <div className='my-3 mx-3 flex justify-end'>

                            {
                                retrievedObject !== null ?
                                    <button className='flex bg-primary py-4 px-10 rounded-lg border-2 border-spacing-2 focus:ring-1 focus:ring-white' onClick={addRate}>
                                        <MdDataSaverOn className='w-6 h-6 text-white mx-1' />
                                        <p className='text-sm font-extrabold text-white mt-0.5'>
                                            Add Rating
                                        </p>
                                    </button>
                                    :
                                    <button className='flex bg-primary py-4 px-10 rounded-lg border-2 border-spacing-2 focus:ring-1 focus:ring-white' onClick={notThereUser}>
                                        <MdDataSaverOn className='w-6 h-6 text-white mx-1' />
                                        <p className='text-sm font-extrabold text-white mt-0.5'>
                                            Add Rating
                                        </p>
                                    </button>

                            }



                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NewDegreeRate