import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        if (email !== '' || password !== '') {
            await axios.post('http://127.0.0.1:8000/auth/login', {
                email: email,
                password: password
            }).then(function (response) {
                const userObj = {
                    id: response.data.details.id,
                    firstname: response.data.details.firstname,
                    lastname: response.data.details.lastname
                };
                const user = JSON.stringify(userObj);
                localStorage.setItem('user', user);
                toast.success("You are successfully logged in")
                if(response.data.role === 'student'){
                    navigate('/student/dashboard')
                }
                else if(response.data.role === 'professor'){
                    navigate('/professor/dashboard')
                }
            }).catch(function (error) {
                toast.error("Invalid user credentials")
            })
        } else {
            toast.error("Please enter the both email and password")
        }
    }

    return (
        <>
            <ToastContainer />
            <div id='popup-content' className='flex items-center justify-center'>
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
                                                <label for="email" className="block mb-2 font-mono text-sm font-medium text-gray-900 ">Your email</label>
                                                <input type="email" name="email" id="email" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label for="password" className="block mb-2 text-sm font-mono font-medium text-gray-900 ">Password</label>
                                                <input type="password" name="password" id="passwordarkd" placeholder="••••••••" class="bg-gray-50 border font-mono border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   " required=""
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className="w-full font-mono bg-slate-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={loginUser}
                                            >Sign in</button>
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

export default SignIn