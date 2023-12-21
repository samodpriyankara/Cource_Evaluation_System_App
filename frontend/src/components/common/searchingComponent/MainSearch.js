import React, { useEffect, useState } from 'react'

import { HiAcademicCap } from 'react-icons/hi';
import { GiTeacher } from 'react-icons/gi';


import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainSearch = () => {

    const [optionProfessor, setOptionProfessor] = useState(false)

    const changeOption = () => {
        setOptionProfessor(!optionProfessor)
        console.log(optionProfessor)
    }

    const [course, setCoures] = useState([])
    const [tempList, setTempList] = useState([])
    const [currentValue, setCurrentValue] = useState('')

    const [professors, setProfessors] = useState([])
    const [tempList2, setTempList2] = useState([])
    const [currentValue2, setCurrentValue2] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/student/course/all');
                console.log(response.data)
                setCoures(response.data)


                const response2 = await axios.get('http://127.0.0.1:8000/student/professor/all');
                console.log(response2.data)
                setProfessors(response2.data)
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
    var list2 = []
    const setValues2 = (value) => {
        setCurrentValue2(value)
        list2 = professors.filter(item =>
            (item.firstname + item.lastname).toLowerCase().includes(value.toLowerCase())
        )
        setTempList2(list2)
        console.log("list", list2)
    }

    return (
        <>

            <div className='my-20'>
                <div className=''>

                    {
                        optionProfessor ?
                            <div className='text-center'>
                                <p className='text-xl font-bold text-slate-900'>Find a Degree Program</p>
                            </div>
                            :
                            <div className='text-center'>
                                <p className='text-xl font-bold text-slate-900'>Find a Professor</p>
                            </div>
                    }



                    {
                        optionProfessor ?

                            <div>
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
                                                        <div className='w-full h-20 border border-slate-800 my-1 rounded-lg overflow-auto'>
                                                            {
                                                                tempList.length === 0 ?
                                                                    <div className='flex items-center justify-center'>
                                                                        <p className='text-slate-900 font-semibold'>No Result Found</p>
                                                                    </div>
                                                                    :
                                                                    tempList.map((value, index) => (
                                                                        <div className='divide-y-2 mb-2 w-full mx-1'>
                                                                            <div onClick={(e) => {
                                                                                navigate("/student/AllDegreeRating/" + value.id);
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
                            :
                            <div>
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
                                                        type="text"
                                                        id="search"
                                                        value={currentValue2}
                                                        class="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-primary  block w-full pl-10 p-2.5"
                                                        placeholder="Search Professors"
                                                        onChange={(e) => setValues2(e.target.value)}
                                                    />
                                                </div>
                                            </form>
                                            <div>
                                                {
                                                    currentValue2 === ''
                                                        ?
                                                        <></>
                                                        :
                                                        <div className='w-full h-20 border border-slate-800 my-1 rounded-lg overflow-auto'>
                                                            {
                                                                tempList2.length === 0 ?
                                                                    <div className='flex items-center justify-center'>
                                                                        <p className='text-slate-900 font-semibold'>No Result Found</p>
                                                                    </div>
                                                                    :
                                                                    tempList2.map((value, index) => (
                                                                        <div className='divide-y-2 mb-2 w-full mx-1'>
                                                                            <div onClick={(e) => {
                                                                                navigate("/student/allProfessorRating/" + value.id);
                                                                                localStorage.setItem("selectedProfName",(value.firstname + " " + value.lastname));
                                                                                localStorage.setItem("selectedProfDegree",value.degree)
                                                                            }} key={index}>{value.firstname + " " + value.lastname}
                                                                            </div>
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
                    }




                    {
                        optionProfessor ?

                            <div className='text-center mt-auto'>
                                <p className='font-lg font-semibold text-slate-900 hover:underline cursor-pointer'
                                    onClick={changeOption}
                                >Would you like to search a Professor</p>
                            </div>
                            :
                            <div className='text-center mt-auto'>
                                <p className='font-lg font-semibold text-slate-900 hover:underline cursor-pointer'
                                    onClick={changeOption}
                                >Would you like to search a degree program</p>
                            </div>
                    }



                </div>
            </div>
        </>
    )
}

export default MainSearch