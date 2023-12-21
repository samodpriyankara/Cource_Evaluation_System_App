import React from 'react'


import { AiFillFacebook } from 'react-icons/ai';
import { ImYoutube } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <div className='mt-40 bg-black pt-10'>
        <div>
          <div className='flex justify-center items-center'>
            <div className='bg-white mx-2 rounded-full w-16 h-16 flex justify-center items-center cursor-pointer '>
              <AiFillFacebook className='w-8 h-8 mx-3 rounded-full' />
            </div>
            <div className='bg-white mx-2 rounded-full w-16 h-16 flex justify-center items-center cursor-pointer '>
              <ImYoutube className='w-8 h-8 mx-3 rounded-full' />
            </div>
            <div className='bg-white mx-2 rounded-full w-16 h-16 flex justify-center items-center cursor-pointer '>
              <BsTwitter className='w-8 h-8 mx-3 rounded-full' />
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <p className='text-3xl text-center font-mono font-bold text-white'>Follow Us</p>
        </div>
      </div>
    </>
  )
}

export default Footer