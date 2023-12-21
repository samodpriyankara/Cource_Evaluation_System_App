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

const NewProfessorRate = () => {

    const navigate = useNavigate()

    const logoutUser = () => {
        localStorage.clear()
        toast.info("User logging out")
        navigate('/')
    }

    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);

    const { id, username, degree } = useParams();

    const [likeToTakeAgain, setLikeToTakeAgain] = useState(0);
    const [credit, setCredit] = useState(0);
    const [textBooks, setTextBooks] = useState(0);
    const [attendence, setAttendence] = useState(0);
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState("");
    const [comment, setComment] = useState("");
    const [quility, setQuility] = useState(0);
    const [difficulity, setDifficulity] = useState(0);

    const addRate = async (e) => {
        try {
            await axios.post(
                'http://127.0.0.1:8000/student/professor/addRate', {
                "likeToTakeAgain": likeToTakeAgain,
                "credit": credit,
                "textBooks": textBooks,
                "attendence": attendence,
                "grade": grade,
                "comment": comment,
                "quility": quility,
                "difficulity": difficulity,
                "studentId": retrievedObject.id,
                "professorId": id,
                "degreeName": subject

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
                            <p className='text-3xl font-bold'>{username}</p>
                        </div>
                        <div>
                            <p className='text-xl font-semibold'>{degree}</p>
                        </div>
                    </div>
                    <div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Like to take again</p>
                            </div>
                            <div>
                                <div className='flex justify-end w-full mt-3'>
                                    <div class="flex mx-10">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setLikeToTakeAgain(1)} />
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                    </div>
                                    <div class="flex mx-10">
                                        <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setLikeToTakeAgain(0)} />
                                        <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Credit</p>
                            </div>

                            <div className='flex justify-end w-full mt-3'>
                                <div class="flex mx-10">
                                    <input id="default-radio-2" type="radio" value="" name="default-radio-1" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setCredit(1)} />
                                    <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div class="flex mx-10">
                                    <input id="default-radio-2" type="radio" value="" name="default-radio-1" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setCredit(0)} />
                                    <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>

                        </div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Text books</p>
                            </div>
                            <div className='flex justify-end w-full mt-3'>
                                <div class="flex mx-10">
                                    <input id="default-radio-3" type="radio" value="" name="default-radio-2" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setTextBooks(1)} />
                                    <label for="default-radio-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div class="flex mx-10">
                                    <input id="default-radio-3" type="radio" value="" name="default-radio-2" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setTextBooks(0)} />
                                    <label for="default-radio-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Attendance</p>
                            </div>
                            <div className='flex justify-end w-full mt-3'>
                                <div class="flex mx-10">
                                    <input id="default-radio-4" type="radio" value="" name="default-radio-3" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setAttendence(1)} />
                                    <label for="default-radio-4" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                                </div>
                                <div class="flex mx-10">
                                    <input id="default-radio-4" type="radio" value="" name="default-radio-3" class="w-4 h-4 mt-0.5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setAttendence(0)} />
                                    <label for="default-radio-4" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Subject</p>
                            </div>
                            <div className='flex justify-end w-full mt-3'>
                                <div class="flex mx-10">
                                    <div>
                                        <input
                                            type="text"
                                            id="first_name"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Statistics" required
                                            onChange={(e) => { setSubject(e.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='mt-5 flex justify-between mx-60'>
                            <div>
                                <p className='text-lg mt-2'>Grade</p>
                            </div>


                            <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                id="grades"
                                class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose Your Grade</option>
                                <option value="A+">A+</option>
                                <option value="A">A</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="B-">B-</option>
                                <option value="C+">c+</option>
                                <option value="C">C</option>
                                <option value="C-">C-</option>
                                <option value="D">D</option>
                            </select>

                        </div>
                    </div>
                    <div className=''>

                        <label for="message" className="block mb-2 text-lg">Your Comment</label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            onChange={(e) => setComment(e.target.value)}>{comment}</textarea>

                    </div>
                    <div className='flex justify-between my-2'>
                        <div className='mx-2'>
                            <div className='w-96 flex justify-between mt-5'>
                                <div>
                                    <p>Quality</p>
                                    <p className='text-xs'>**Ex: 2 /5</p>
                                </div>
                                <div>
                                    <RatingComponent newValue={quility} onRatingChange={(value) => { setQuility(value) }} />
                                </div>
                            </div>
                            <div className='w-96 flex justify-between mt-5'>
                                <div>
                                    <p>Difficulty</p>
                                    <p className='text-xs'>**Ex: 2 /5</p>
                                </div>
                                <div>
                                    <RatingComponent newValue={difficulity} onRatingChange={(value) => { setDifficulity(value) }} />
                                </div>
                            </div>
                        </div>

                        <div className='my-3 mx-3 flex justify-end'>

                            {

                                retrievedObject !== null ?

                                    <button className='flex h-16 bg-primary py-4 px-10 rounded-lg border-2 border-spacing-2 focus:ring-1 focus:ring-white' onClick={addRate}>
                                        <MdDataSaverOn className='w-6 h-6 text-white mx-1' />
                                        <p className='text-sm font-extrabold text-white mt-0.5'>
                                            Add Rating
                                        </p>
                                    </button>

                                    :

                                    <button className='flex h-16 bg-primary py-4 px-10 rounded-lg border-2 border-spacing-2 focus:ring-1 focus:ring-white' onClick={notThereUser}>
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

export default NewProfessorRate