import React, { useState } from 'react'

const RatingComponent = ({newValue,onRatingChange,value}) => {
    const [editedValue, setEditedValue] = useState(newValue);
    const handleRatingClick = (newValue) => {
        console.log("newValue::",newValue)
        setEditedValue(newValue);
        onRatingChange(newValue); // Call the callback function with the new rating value
      };
    return (
       
        <>
        
            <div>
                <div className='flex font-mono'>
                    {value  ? (
                        value === 1 ? (
                            <>
                                <div>
                                    <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                    <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                </div>
                                <div>
                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                    <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                </div>
                                <div>
                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                    <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                </div>
                                <div>
                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                    <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                </div>
                                <div>
                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                    <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                </div>
                            </>
                        )
                            : value === 2 ? (
                                <>
                                    <div>
                                        <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                    </div>
                                    <div>
                                        <div className='w-12 h-10 border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                    </div>
                                    <div>
                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                    </div>
                                    <div>
                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                    </div>
                                    <div>
                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                    </div>
                                </>
                            )
                                :
                                value === 3 ? (
                                    <>
                                        <div>
                                            <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                        </div>
                                        <div>
                                            <div className='w-12 h-10  border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                        </div>
                                        <div>
                                            <div className='w-12 h-10  border-2 border-white bg-yellow-500 hover:delay-300 transition ease-out mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                        </div>
                                        <div>
                                            <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                        </div>
                                        <div>
                                            <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                        </div>
                                    </>
                                )
                                    :
                                    value === 4 ?
                                        (
                                            <>
                                                <div>
                                                    <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                                </div>
                                                <div>
                                                    <div className='w-12 h-10  border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                                </div>
                                                <div>
                                                    <div className='w-12 h-10  border-2 border-white bg-yellow-500 hover:delay-300 transition ease-out mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                                </div>
                                                <div>
                                                    <div className='w-12 h-10 border-2 border-white bg-green-600 hover:delay-300 transition ease-out mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                                </div>
                                                <div>
                                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                                </div>
                                            </>
                                        )
                                        :
                                        value === 5 ?
                                            (
                                                <>
                                                    <div>
                                                        <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                                    </div>
                                                    <div>
                                                        <div className='w-12 h-10  border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                                    </div>
                                                    <div>
                                                        <div className='w-12 h-10  border-2 border-white bg-yellow-500 hover:delay-300 transition ease-out mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                                    </div>
                                                    <div>
                                                        <div className='w-12 h-10 border-2 border-white bg-green-600 hover:delay-300 transition ease-out mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                                    </div>
                                                    <div>
                                                        <div className='w-12 h-10 border-2 border-white bg-green-900 hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                                    </div>
                                                </>
                                            )
                                            :
                                            <>
                                        </>
                                   
                    ):(
                        
                        editedValue === 1 ? (
                                <>
                                    <div onClick={(e)=>{handleRatingClick(1)}}>
                                        <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                    </div>
                                    <div onClick={(e)=>{handleRatingClick(2)}}>
                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                    </div>
                                    <div onClick={(e)=>{handleRatingClick(3)}}>
                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                    </div>
                                    <div onClick={(e)=>{handleRatingClick(4)}}>
                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                    </div>
                                    <div onClick={(e)=>{handleRatingClick(5)}}>
                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                        <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                    </div>
                                </>
                            )
                                : editedValue === 2 ? (
                                    <>
                                        <div onClick={(e)=>{handleRatingClick(1)}}>
                                            <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                        </div>
                                        <div onClick={(e)=>{handleRatingClick(2)}}>
                                            <div className='w-12 h-10 border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                        </div>
                                        <div onClick={(e)=>{handleRatingClick(3)}}>
                                            <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                        </div>
                                        <div onClick={(e)=>{handleRatingClick(4)}}>
                                            <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                        </div>
                                        <div onClick={(e)=>{handleRatingClick(5)}}>
                                            <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                            <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                        </div>
                                    </>
                                )
                                    :
                                    editedValue === 3 ? (
                                        <>
                                            <div onClick={(e)=>{handleRatingClick(1)}}>
                                                <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                                <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                            </div>
                                            <div  onClick={(e)=>{handleRatingClick(2)}}>
                                                <div className='w-12 h-10  border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                                <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                            </div>
                                            <div onClick={(e)=>{handleRatingClick(3)}}>
                                                <div className='w-12 h-10  border-2 border-white bg-yellow-500 hover:delay-300 transition ease-out mx-0.5'></div>
                                                <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                            </div>
                                            <div onClick={(e)=>{handleRatingClick(4)}}>
                                                <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                                <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                            </div>
                                            <div onClick={(e)=>{handleRatingClick(5)}}>
                                                <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                                <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                            </div>
                                        </>
                                    )
                                        :
                                        editedValue === 4 ?
                                            (
                                                <>
                                                    <div onClick={(e)=>{handleRatingClick(1)}}>
                                                        <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                                    </div>
                                                    <div onClick={(e)=>{handleRatingClick(2)}}>
                                                        <div className='w-12 h-10  border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                                    </div>
                                                    <div onClick={(e)=>{handleRatingClick(3)}}>
                                                        <div className='w-12 h-10  border-2 border-white bg-yellow-500 hover:delay-300 transition ease-out mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                                    </div>
                                                    <div onClick={(e)=>{handleRatingClick(4)}}>
                                                        <div className='w-12 h-10 border-2 border-white bg-green-600 hover:delay-300 transition ease-out mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                                    </div>
                                                    <div onClick={(e)=>{handleRatingClick(5)}}>
                                                        <div className='w-12 h-10 bg-slate-300 border-2 border-white hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                                        <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                                    </div>
                                                </>
                                            )
                                            :
                                            editedValue === 5 ?
                                                (
                                                    <>
                                                        <div onClick={(e)=>{handleRatingClick(1)}}>
                                                            <div className='w-12 h-10 border-2 border-white bg-red-700 hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                                            <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                                        </div>
                                                        <div onClick={(e)=>{handleRatingClick(2)}}>
                                                            <div className='w-12 h-10  border-2 border-white bg-orange-700 hover:delay-300 transition ease-out mx-0.5'></div>
                                                            <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                                        </div>
                                                        <div onClick={(e)=>{handleRatingClick(3)}}>
                                                            <div className='w-12 h-10  border-2 border-white bg-yellow-500 hover:delay-300 transition ease-out mx-0.5'></div>
                                                            <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                                        </div>
                                                        <div onClick={(e)=>{handleRatingClick(3)}}>
                                                            <div className='w-12 h-10 border-2 border-white bg-green-600 hover:delay-300 transition ease-out mx-0.5'></div>
                                                            <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                                        </div>
                                                        <div onClick={(e)=>{handleRatingClick(4)}}>
                                                            <div className='w-12 h-10 border-2 border-white bg-green-900 hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                                            <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                                        </div>
                                                    </>
                                                )
                                                :
                                                <>
                                                <div onClick={(e)=>{handleRatingClick(1)}}>
                                                    <div className='w-12 h-10 bg-slate-300 border-white  hover:delay-300 transition ease-out rounded-l-full mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Awful</p>
                                                </div>
                                                <div  onClick={(e)=>{handleRatingClick(2)}}>
                                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Ok</p>
                                                </div>
                                                <div onClick={(e)=>{handleRatingClick(3)}}>
                                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Good</p>
                                                </div>
                                                <div onClick={(e)=>{handleRatingClick(4)}}>
                                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Grate</p>
                                                </div>
                                                <div onClick={(e)=>{handleRatingClick(5)}}>
                                                    <div className='w-12 h-10 bg-slate-300 border-2 border-white  hover:delay-300 transition ease-out rounded-r-full mx-0.5'></div>
                                                    <p className='text-xs flex justify-center items-center mx-1'>Awesome</p>
                                                </div>
                                            </>
                                       
                        
                    )
                    }
                    

                </div>
            </div>
        </>
    )
}

export default RatingComponent