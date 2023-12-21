import React, { useEffect, useState } from 'react'
import logo from '../../../assets/images/logo.png'
import ProfessorReviewItem from '../../common/professorReviewItem/ProfessorReviewItem';
import DegreeReviewItem from '../../common/degreeReviewItem/DegreeReviewItem';
import { HiAcademicCap } from 'react-icons/hi';
import { MdDataSaverOn } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';

import { IoMdLogOut } from 'react-icons/io';

import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const StudentNavBar = () => {
    const [activeComponent, setActiveComponent] = useState('home');

    const navigate = useNavigate()

    const handleButtonClick = (component) => {
        setActiveComponent(component);
    };

    const logoutUser = () => {
        localStorage.clear()
        toast.info("User logging out")
        navigate('/')
    }

    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);



    return (
        <>
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
                                    retrievedObject !== null
                                        ?
                                        <div className='mr-10 font-bold flex'>
                                            <p className='text-xl'>Hello</p>
                                            <span className='text-xl mx-2'>{retrievedObject.firstname}</span>
                                            
                                        </div>
                                        :
                                        <></>
                                }
                                <div>
                                <div className='flex w-fit h-fit bg-primary px-3 py-1 rounded-full text-white cursor-pointer hover:ring-2 hover:ring-black' onClick={logoutUser}>
                                        <IoMdLogOut className='w-6 h-6 ml-1 mt-1' />
                                        <div className='flex items-center mt-0.5'>
                                            <p className='font-mono text-xs'>Update</p>
        
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className='flex w-fit h-fit bg-primary px-3 py-1 rounded-full text-white cursor-pointer hover:ring-2 hover:ring-black' onClick={logoutUser}>
                                        <IoMdLogOut className='w-6 h-6 ml-1 mt-1' />
                                        <div className='flex items-center mt-0.5'>
                                            <p className='font-mono text-xs'>Logout</p>
        
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end  '>
                <div className='border-b-2 w-full mx-40 my-5 border-b-spacing-8'>
                    <ul className='flex'>

                        {
                            activeComponent === 'home' ?
                                <li className='mx-4'>
                                    <p className='font-bold text-md cursor-pointer text-primary' onClick={() => handleButtonClick('home')}>Home</p>
                                </li>
                                :
                                <li className='mx-4'>
                                    <p className='font-bold text-md cursor-pointer' onClick={() => handleButtonClick('home')}>Home</p>
                                </li>

                        }


                        {

                            activeComponent === 'degree' ?
                                <li className='mx-4'>
                                    <p className='font-bold text-md cursor-pointer text-primary' onClick={() => handleButtonClick('degree')}>Degree Ratings</p>
                                </li>
                                :
                                <li className='mx-4'>
                                    <p className='font-bold text-md cursor-pointer' onClick={() => handleButtonClick('degree')}>Degree Ratings</p>
                                </li>


                        }

                        {

                            activeComponent === 'professor' ?
                                <li className='mx-4'>
                                    <p className='font-bold text-md cursor-pointer text-primary' onClick={() => handleButtonClick('professor')}>Professors Ratings</p>
                                </li>
                                :
                                <li className='mx-4'>
                                    <p className='font-bold text-md cursor-pointer' onClick={() => handleButtonClick('professor')}>Professors Ratings</p>
                                </li>

                        }

                    </ul>
                </div>
            </div>
            <div>
                {activeComponent === 'home' && <Home />}
                {activeComponent === 'degree' && <DegreeRatings />}
                {activeComponent === 'professor' && <ProfessorRatings />}
            </div>
        </>
    )
}

function Home() {

    const [activeSubComponent, setActiveSubComponent] = useState('degreeRatings');
    const [noOfDegreeRates, setNoOfDegreeRates] = useState(0)
    const [noOfProfRates, setNoOfProfRates] = useState(0)

    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);

    const handleButtonClickOnMyRatings = (component) => {
        setActiveSubComponent(component);
        console.log(activeSubComponent)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/student/dashboard?studentId=' + retrievedObject.id);
                setNoOfDegreeRates(response.data.noOfDegreeRates)
                setNoOfProfRates(response.data.noOfProfRates)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='mt-2 mx-40'>
                <div className='flex justify-start'>
                    <div className='bg-slate-200 w-80 h-20 shadow-xl mx-10'>
                        <div className=' flex justify-center '>
                            <p className='text-lg font-mono font-semibold mt-2' >Your Total Degree Ratings</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <p className='font-mono font-semibold'>{noOfDegreeRates}</p>
                        </div>
                    </div>
                    <div className='bg-slate-200 w-80 h-20 shadow-xl mx-10'>
                        <div className=' flex justify-center'>
                            <p className='text-lg font-mono font-semibold mt-2'>Your Total Professors Ratings</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <p className='font-mono font-semibold'>{noOfProfRates}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <div className='mx-40'>
                    <p className='text-xl font-bold font-mono'>Your Ratings</p>
                </div>
                <div className='mx-40 mt-5'>
                    <div>
                        <div>
                            <ul className='flex'>
                                <li className='mr-5'>

                                    {
                                        activeSubComponent === 'degreeRatings' ?
                                            <p className='font-semibold text-sm font-mono cursor-pointer text-primary bg-slate-200 p-2 shadow-2xl' onClick={() => handleButtonClickOnMyRatings('degreeRatings')}>
                                                Your Ratings of Degree Programs
                                            </p>
                                            :
                                            <p className='font-semibold text-sm font-mono cursor-pointer bg-white p-2' onClick={() => handleButtonClickOnMyRatings('degreeRatings')}>
                                                Your Ratings of Degree Programs
                                            </p>

                                    }
                                </li>
                                <li className='ml-5'>


                                    {
                                        activeSubComponent === 'professorRatings' ?
                                            <p className='font-semibold text-sm font-mono cursor-pointer text-primary bg-slate-200 p-2 shadow-2xl' onClick={() => handleButtonClickOnMyRatings('professorRatings')}>
                                                Your Ratings of Professors
                                            </p>
                                            :
                                            <p className='font-semibold text-sm font-mono cursor-pointer p-2 bg-white' onClick={() => handleButtonClickOnMyRatings('professorRatings')}>
                                                Your Ratings of Professors
                                            </p>
                                    }



                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        {activeSubComponent === 'degreeRatings' && <MyDegreeRatings />}
                        {activeSubComponent === 'professorRatings' && <MyProfessorRatings />}
                    </div>
                </div>
            </div>
        </>
    )
}

function DegreeRatings() {

    const [course, setCoures] = useState([])
    const [tempList, setTempList] = useState([])
    const [currentValue, setCurrentValue] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/student/course/all');
                console.log(response.data)
                setCoures(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const arr = []

    course.forEach(obj => {
        // console.log("first", obj)
        arr.push(obj.degreeName)
    })

    const setValues = (value) => {
        setCurrentValue(value)
        const list = course.filter(item =>
            (item.degreeName).toLowerCase().includes(value.toLowerCase())
        )
        setTempList(list)
        console.log("list", list)
    }


    return (
        <>
            {console.log("arr:: ", tempList)}
            <div className='mx-40 mt-10'>
                <div className='text-slate-900'>
                    <div>
                        <p className='text-2xl font-mono font-semibold'>Guidance to Add a Rating to a Degree Program</p>
                    </div>
                    <div className='mt-5 text-justify'>
                        <p className='text-sm'>You can rate the added degree program with this VoteMyProfessor web applicatiion. For degree program ratings we focus on the main five topics. Those are,</p>
                        <ul className='mx-3'>
                            <li>
                                <p className='text-sm'>- Reputation</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Opportunities</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Academic Qualities</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Happiness</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Facilities</p>
                            </li>
                        </ul>
                        <p className='text-sm'>In addition to that you should give a textual comment on the selecte degree program. You can see the evaluated result of the your comment quality by AI under your degree ratings category.</p>
                        <p className='text-sm text-red-600 my-1'>** For search the degree program, please use the below search bar and search results</p>
                    </div>
                </div>
                <div className='mt-10'>
                    <div>
                        <div className='mx-20'>

                            <form class="flex items-center">
                                <label for="voice-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <HiAcademicCap className='w-5 h-5 text-slate-900' />
                                    </div>
                                    <input
                                        type="text"
                                        id="search"
                                        value={currentValue}
                                        class="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-primary  block w-full pl-10 p-2.5"
                                        placeholder="Search Degree Programms"
                                        required
                                        onChange={(e) => setValues(e.target.value)}
                                    />
                                </div>
                            </form>
                            <div>
                                {
                                    currentValue === ''
                                        ?
                                        <></>
                                        :
                                        <div className='w-full h-auto border border-slate-800 my-1 rounded-lg'>
                                            {
                                                tempList.map((value, index) => (
                                                    <div className='divide-y-2 mb-2 w-full mx-1'>
                                                        <div onClick={(e)=>{
                                                            navigate("/student/AllDegreeRating/"+value.id);
                                                            localStorage.setItem("selectedDegreeName",value.degreeName)
                                                            localStorage.setItem("selectedField",value.field)
                                                        }} key={index}>{value.degreeName}</div>
                                                        {/* <Link to={`/student/AllDegreeRating/${value.id}/${value.degreeName}`} key={index}>{value.degreeName}</Link> */}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ProfessorRatings() {

    const [professors, setProfessors] = useState([])
    const [tempList, setTempList] = useState([])
    const [currentValue, setCurrentValue] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/student/professor/all');
                console.log(response.data)
                setProfessors(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const setValues = (value) => {
        setCurrentValue(value)
        const list = professors.filter(item =>
            (item.firstname + item.lastname).toLowerCase().includes(value.toLowerCase())
        )
        setTempList(list)
        console.log("list", list)
    }

    return (
        <>
            {console.log("list", tempList)}
            <div className='mx-40 mt-10'>
                <div className='text-slate-900'>
                    <div>
                        <p className='text-2xl font-mono font-semibold'>Guidance to Add a Rating to a Professor</p>
                    </div>
                    <div className='mt-5 text-justify'>
                        <p className='text-sm'>You can rate the added Professor with this VoteMyProfessor web applicatiion. For Professor ratings we focus on the main five topics. Those are,</p>
                        <ul className='mx-3'>
                            <li>
                                <p className='text-sm'>- Like to take again</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Credit</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Text books usage</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Attendance</p>
                            </li>
                            <li>
                                <p className='text-sm'>- Grade</p>
                            </li>
                        </ul>
                        <p className='text-sm'>In addition to that you should give a textual comment on the selected Professor. You can see the evaluated result of the your comment quality by AI under your Professor ratings category.</p>
                        <p className='text-sm text-red-600 my-1'>** For search the Professor, please use the below search bar and search results</p>
                    </div>
                </div>
                <div className='mt-10'>
                    <div>
                        <div className='mx-20'>

                            <form class="flex items-center">
                                <label for="voice-search" class="sr-only">Search</label>
                                <div class="relative w-full">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <GiTeacher className='w-5 h-5 text-slate-900' />
                                    </div>
                                    <input
                                        value={currentValue}
                                        onChange={(e) => setValues(e.target.value)}
                                        type="text" id="voice-search" class="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-primary  block w-full pl-10 p-2.5  " placeholder="Search Your Professor" required />
                                </div>
                            </form>
                            <div>
                                {
                                    currentValue === ''
                                        ?
                                        <></>
                                        :
                                        <div className='w-full h-auto border border-slate-800 my-1 rounded-lg'>
                                            {
                                                tempList.map((value, index) => (
                                                    <div className='divide-y-2 mb-2 w-full mx-1'>
                                                        <div onClick={(e) => {
                                                            navigate("/student/allProfessorRating/" + value.id );
                                                        }} key={index}>{value.firstname + " " + value.lastname} </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MyDegreeRatings() {
    const [coursesRates, setCoursesRates] = useState([]);
    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/student/course/getMyRate?studentId=' + retrievedObject.id);
                setCoursesRates(response.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            {/* {coursesRates
            .map((rate) => (
                <div className='mt-10'>
                    <DegreeReviewItem
                        rate={rate}
                    />
                </div>
            ))} */}
            {coursesRates
            .slice() // Create a shallow copy of the array
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort in descending order based on timestamp
            .map((rate) => (
              <div className='mt-10' key={rate.id}>
                    <DegreeReviewItem
                        rate={rate}
                    />
                </div>
            ))}
        </>
    )
}

function MyProfessorRatings() {
    const [professorRates, setProfessorRates] = useState([]);
    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/student/professor/getMyRate?studentId=' + retrievedObject.id);
                setProfessorRates(response.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            {/* {professorRates.map((rate) => (
                <div className='mt-10'>
                    <ProfessorReviewItem
                        rate={rate}
                    />
                </div>
            ))} */}
              {professorRates
              .slice() // Create a shallow copy of the array
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort in descending order based on timestamp
              .map((rate) => (
                <div className='mt-10' key={rate.id}>
                    <ProfessorReviewItem
                        rate={rate}
                    />
                </div>
            ))}
        </>
    )
}

export default StudentNavBar