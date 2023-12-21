import React from 'react'

import logo from '../../../assets/images/logo.png'
import Popup from 'reactjs-popup';
import SignUp from '../../students/signUp/SignUp';
import SignIn from '../../students/signIn/SignIn';

const Navbar = () => {
    return (
        <>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar