import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DashboardContent = () => {

    const navigate = useNavigate();
    const [professorForm, setProfessorForm] = useState(true)

    const [countDegrees, setCountDegrees] = useState(0)
    const [countProfessors, setCountProfesors] = useState(0)
    const [countUsers, setCountusers] = useState(0)
    const [courses, setCourses] = useState([]);
    const [professors, setProfessors] = useState([]);

    const handleTab = () => {
        setProfessorForm(true)
        console.log(professorForm)
    }

    const handleTabForm = () => {
        setProfessorForm(false)
        console.log(professorForm)
    }

    const handleAddCourse = () => {
        navigate('/admin/addCourse');
    };

    const handleAddProfessor = () => {
        navigate('/admin/addProfessor');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/admin/dashoard');
                setCountDegrees(response.data.noOfdegree)
                setCountProfesors(response.data.noOfProf)
                setCountusers(response.data.noOfRateUser)
                const responseCourses = await axios.get('http://127.0.0.1:8000/student/course/all');
                setCourses(responseCourses.data);

                const responseProfessors = await axios.get('http://127.0.0.1:8000/student/professor/all');
                setProfessors(responseProfessors.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div>
                <div className='flex justify-around mt-20'>
                    <div className='w-96 h-36 bg-slate-100 flex justify-center border-l-2 rounded-2xl border-green-600 shadow-2xl'>
                        <div>
                            <div>
                                <p className='font-mono text-lg font-bold text-slate-800 mt-2'>Total Degrees</p>
                            </div>
                            <div className='mt-10 flex justify-center'>
                                <p className='text-2xl font-mono font-bold'>{countDegrees}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-96 h-36 bg-slate-100 flex justify-center border-l-2 rounded-2xl border-blue-600 shadow-2xl'>
                        <div>
                            <div>
                                <p className='font-mono text-lg font-bold text-slate-800 mt-2'>Total Professors</p>
                            </div>
                            <div className='mt-10 flex justify-center'>
                                <p className='text-2xl font-mono font-bold'>{countProfessors}</p>
                            </div>
                        </div>


                    </div>
                    <div className='w-96 h-36 bg-slate-100 flex justify-center border-l-2 rounded-2xl border-yellow-600 shadow-2xl'>
                        <div>
                            <div>
                                <p className='font-mono text-lg font-bold text-slate-800 mt-2'>Total Rating Users</p>
                            </div>
                            <div className='mt-10 flex justify-center'>
                                <p className='text-2xl font-mono font-bold'>{countUsers}</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-40 w-full'>
                <div className='flex'>

                    {
                        professorForm ?
                            <div className='mx-10 transition cursor-pointer bg-slate-200 p-5 shadow-lg rounded-lg'>
                                <p className='text-2xl font-mono font-bold underline-offset-8 underline text-primary' oniClick={handleTab}>Degrees</p>
                            </div>
                            :
                            <div className='mx-10 cursor-pointer  p-5'>
                                <p className='text-2xl font-mono font-bold text-black underline-offset-8 underline' onClick={handleTab}>Degrees</p>
                            </div>
                    }


                    {
                        professorForm ?
                            <div className='mx-10 cursor-pointer p-5'>
                                <p className='text-2xl font-mono font-bold underline underline-offset-8 text-black ' onClick={handleTabForm}>Professors</p>
                            </div>
                            :
                            <div className='mx-10 cursor-pointer bg-slate-200 p-5 shadow-lg rounded-lg'>
                                <p className='text-2xl font-mono font-bold underline underline-offset-8 text-primary' onClick={handleTabForm}>Professors</p>
                            </div>
                    }




                </div>
            </div>
            {
                professorForm ?
                    <div>
                        <div>
                            <div className="flex justify-center mt-8">
                                <div className="w-1/2 mx-auto">
                                    <button onClick={handleAddCourse} className="inline-block bg-primary text-white font-mono font-semibold px-4 py-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Degree Program
                                    </button>
                                </div>
                            </div>
                            <div className='flex items-center justify-center mb-10'>
                                <table className="w-2/3 mt-4 bg-slate-800 text-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">ID</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">Degree Name</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">Field</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg"></th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courses.map((course) => (
                                            <tr key={course.id} className='hover:bg-slate-400'>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{course.id}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{course.degreeName}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{course.field}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">
                                                    <button class="btn btn-danger"> Update</button></td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">
                                                    <button class="btn btn-danger"> Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <div className="flex justify-center mt-8">
                                <div className="w-1/2 mx-auto">
                                    <button onClick={handleAddProfessor} className="inline-block bg-primary text-white font-mono font-semibold px-4 py-2 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Professor
                                    </button>
                                </div>
                            </div>
                            <div className='flex items-center justify-center mb-10'>
                                <table className="w-2/3 mt-4 bg-slate-800 text-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">ID</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">Firstname</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">Lastname</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">Email</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg">Degree</th>
                                            <th className="py-2 px-4 border-b border-gray-500 text-lg"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {professors.map((professors) => (
                                            <tr key={professors.id} className='hover:bg-slate-400'>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{professors.id}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{professors.firstname}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{professors.lastname}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{professors.email}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center">{professors.degree}</td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-center"><button>Delete</button> </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            }



        </>
    )
}

export default DashboardContent