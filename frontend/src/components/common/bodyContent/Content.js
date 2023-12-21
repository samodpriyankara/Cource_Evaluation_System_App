import React from 'react';

import background from '../../../assets/images/bg.jpg';
import rate from '../../../assets/images/vote.jpg';
import ann from '../../../assets/images/annonymous.png';
import MainSearch from '../searchingComponent/MainSearch';

const Content = () => {

    return (
        <>
            <div className='mx-20'>
                <MainSearch />
            </div>
            <img src={background} alt="Image" className="w-full h-screen" />

            <div>
                <div className='mt-20'>
                    <div className=''>
                        <div className=''>
                            <p className='text-center text-3xl font-mono font-extrabold text-black'>Join With Us for Rate Your Degree and Professsors</p>
                            <p className='text-center text-2xl font-mono font-thin text-black'>Support Us, Your Rating has More Validity</p>
                        </div>
                        <div className='mt-20'>
                            <div className='flex justify-around'>
                                <div className='w-80 h-80'>
                                    <img src={rate} alt='ratings' className='w-fit h-fit' />
                                    <p className='mt-3 text-xl font-mono text-black text-center font-bold'>Manage and Edit Your</p>
                                    <p className='mt-3 text-xl font-mono text-black text-center font-bold'>Ratings</p>
                                </div>
                                <div className='w-80 h-80'>
                                    <img src={ann} alt='annoymous' className='w-fit h-fit' />
                                    <p className='mt-3 text-xl font-mono text-black text-center font-bold'>Your Ratings are Always Annonymous</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center mt-40'>
                    <div className='flex-col'>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Content;
