import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './SignUp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [degreeName, setDegreeName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    const signupUser = async (e) => {
        e.preventDefault()
        if (firstName !== '' || lastName !== '' || email !== '' || password !== '' || confirmPassword !== '' || degreeName !== '') {
            if (password === confirmPassword) {
                try {
                    await axios.post('http://127.0.0.1:8000/auth/register', {
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        degreeName: degreeName,
                        password: password
                    }).then(function(response){
                        const userObj = { 
                            id: response.data.id, 
                            firstname: response.data.firstname, 
                            lastname: response.data.lastname 
                        };
                        const user = JSON.stringify(userObj);
                        localStorage.setItem('user', user);
                        toast.success("You are successfully logged in")
                        navigate('/student/dashboard')
                    }).catch(function(error){
                        toast.error(error.data.message)
                        console.log(error)
                    })
                } catch (error) {
                    console.log(error)
                }
            } else {
                toast.error('Password confirmation is failed, please enter the same password for both fields');
            }

        } else {
            toast.error('Please enter your details for all the fields');
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div id='popup-content' className='flex items-center justify-center mt-4'>
                <div className='w-full h-full'>
                    <div className='flex justify-between'>
                        <div className='flex justify-center items-center'>
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 opacity-95">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold le5/6ading-tight tracking-tight text-gray-900 md:text-2xl  font-mono  ">
                                            Sign in to your account
                                        </h1>
                                        <form className="space-y-4 md:space-y-6" action="#">
                                            <div>
                                                <label for="firstname" className="block mb-2 font-mono text-sm font-medium text-gray-900 ">Your firstname</label>
                                                <input type="text" name="firstname" id="firstname" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Jackie" required=""
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label for="lastname" className="block mb-2 font-mono text-sm font-medium text-gray-900 ">Your lastname</label>
                                                <input type="text" name="lastname" id="lastname" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Jonathon" required=""
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label for="email" className="block mb-2 font-mono text-sm font-medium text-gray-900 ">Your email</label>
                                                <input type="email" name="email" id="email" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label for="degree" className="block mb-2 font-mono text-sm font-medium text-gray-900 ">Your Degree Program</label>
                                                <input type="text" name="degree" id="degree" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Information Technology" required=""
                                                    onChange={(e) => setDegreeName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label for="password" className="block mb-2 text-sm font-mono font-medium text-gray-900 ">Password</label>
                                                <input type="password" name="password" id="passwordarkd" placeholder="••••••••" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label for="password" className="block mb-2 text-sm font-mono font-medium text-gray-900 ">Confirm Password</label>
                                                <input type="password" name="password" id="passwordarkd" placeholder="••••••••" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " required=""
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                            <button onClick={signupUser} type="submit" className="w-full font-mono bg-slate-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp