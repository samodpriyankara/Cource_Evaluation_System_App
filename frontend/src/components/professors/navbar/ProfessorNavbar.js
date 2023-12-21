import React from 'react'

import logo from '../../../assets/images/logo.png'
import { BiLogOutCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const ProfessorNavbar = () => {
  const navigate = useNavigate()

  const navigateToSignIn = () => {
    navigate('/', { replace: true })
  }
  return (
    <>

      <nav class="bg-primary border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" class="flex items-center">
            <img src={logo} class="w-12 h-12 mr-3 border border-white rounded-full" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white font-mono">EduRater</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
              {/* <li>
                                <a href="#" class="block py-2 pl-3 pr-4 text-white md:p-0 dark:text-white " aria-current="page">Degree Programms</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pl-3 pr-4 text-white md:p-0 dark:text-white" aria-current="page">Professors</a>
                            </li> */}
              <li>
              <button className='flex bg-slate-900 border hover:bg-primary hover:delay-300 transition ease-out border-white px-2 py-0.5 rounded-full'
                  onClick={navigateToSignIn}
                >
                  <BiLogOutCircle className='text-white w-6 h-6 mx-1' />
                  <p className='text-white font-mono text-xs mt-1'>Update</p>
                </button>
                <br></br>
                <button className='flex bg-slate-900 border hover:bg-primary hover:delay-300 transition ease-out border-white px-2 py-0.5 rounded-full'
                  onClick={navigateToSignIn}
                >
                  <BiLogOutCircle className='text-white w-6 h-6 mx-1' />
                  <p className='text-white font-mono text-xs mt-1'>Logout</p>
                </button>
                
                
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default ProfessorNavbar