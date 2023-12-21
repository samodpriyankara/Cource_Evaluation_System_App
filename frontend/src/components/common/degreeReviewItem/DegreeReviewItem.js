import React from 'react'
import RatingComponent from '../rating/RatingComponent'

const DegreeReviewItem = ({ rate }) => {

    const extractDate = (d) => {
        const parts = d.split(" ");
        const date = parts[1] + " " + parts[2] + " " + parts[3];

        return date
    }

    const date = extractDate(rate.timestamp)

    const getCommentStyling = (comment) => {
        const commentLength = comment.length;
      
        if (commentLength > 400) {
            return 'h-300'; // Set a minimum height for longer comments
          } else if (commentLength > 300) {
            return 'h-160';
          } else if (commentLength > 200) {
              return 'h-120';
          } else if (commentLength > 100) {
              return 'h-80';
          } else if (commentLength > 50) {
              return 'h-28';
          } else {
            return ''; // Default height
          }
      };

    return (
        <>
            <div className='w-auto h-fit bg-slate-200 mx-40 font-mono py-5 px-5 shadow-lg'>
                <div className=''>
                    <div className='flex justify-between mx-2 mt-2'>
                        <div>
                            <div>
                                <p className='text-3xl font-mono font-bold'>{rate.degreeName}</p>
                            </div>
                            <div>
                                <p>
                                    <p className='text-xl font-mono'></p>
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className='font-mono text-sm text-black'>{date}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='w-fit'>
                        <div className='ml-2'>
                            <div className='my-10'>
                                <div className='w-20'>
                                    <p className='text-center font-mono text-xs font-bold'>OverallRate</p>
                                </div>
                                <div className='w-20 h-20 bg-red-700 flex justify-center items-center rounded-lg shadow-2xl'>
                                    <p className='text-7xl font-mono text-white'>{rate.overallRate}</p> <span className='font-mono -mt-10 ml-2 text-white'>/5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mx-5 bg-slate-500 text-white py-2'>
                        <div className='m-2'>
                            <div className='flex justify-between mx-20'>
                                <div className='flex items-center'>
                                    <p className='text-xl'>Reputation </p>
                                </div>
                                <div className='mx-2 mt-5'>
                                    <RatingComponent value={rate.reputation} />
                                    {/* {degree.reputation} */}
                                </div>
                            </div>
                            <div className='flex justify-between mx-20'>
                                <div className='flex items-center'>
                                    <p className='text-xl'>Opportunities </p>
                                </div>
                                <div className='mx-2 mt-5'>
                                    <RatingComponent value={rate.opportunities} />
                                    {/* {degree.opportunities} */}
                                </div>
                            </div>
                            <div className='flex justify-between mx-20'>
                                <div className='flex items-center'>
                                    <p className='text-xl'>Academic Quality </p>
                                </div>
                                <div className='mx-2 mt-5'>
                                    <RatingComponent value={rate.accQuality} />
                                    {/* {degree.accQuality} */}
                                </div>
                            </div>
                            <div className='flex justify-between mx-20'>
                                <div className='flex items-center'>
                                    <p className='text-xl'>Happiness </p>
                                </div>
                                <div className='mx-2 mt-5'>
                                    <RatingComponent value={rate.happiness} />
                                    {/* {degree.happiness} */}
                                </div>
                            </div>
                            <div className='flex justify-between mx-20'>
                                <div className='flex items-center'>
                                    <p className='text-xl'>Facilities </p>
                                </div>
                                <div className='mx-2 mt-5'>
                                    <RatingComponent value={rate.facilities} />
                                    {/* {degree.facilities} */}
                                </div>
                            </div>
                        </div>

                        {/* {
                            rate.commentPredict === 'bad' ?

                                <div className='mx-2 bg-red-500'>
                                    <div>
                                        <p className='text-2xl'>Review Comment</p>
                                    </div>
                                    <div className='h-auto w-full border-2 p-2 mt-1'>
                                        <p className='text-justify'>{rate.comment}</p>
                                    </div>
                                </div>
                                :

                                rate.commentPredict === 'average' ?

                                    <div className='mx-2 bg-yellow-500'>
                                        <div>
                                            <p className='text-2xl'>Review Comment</p>
                                        </div>
                                        <div className='h-auto w-full border-2 p-2 mt-1'>
                                            <p className='text-justify'>{rate.comment}</p>
                                        </div>
                                    </div>
                                    :
                                    rate.commentPredict === 'good' ?

                                        <div className='mx-2 bg-green-500'>
                                            <div>
                                                <p className='text-2xl'>Review Comment</p>
                                            </div>
                                            <div className='h-auto w-full border-2 p-2 mt-1'>
                                                <p className='text-justify'>{rate.comment}</p>
                                            </div>
                                        </div>
                                        :
                                        <></>



                        } */}
                        {
                            rate.comment !== '' ?
                                <div className='mx-2'>
                                    <div>
                                        <p className='text-2xl font-bold w-full'>Review Comment.....</p>
                                        <center><span style={{ fontSize: '4em' }}>{rate.commentPredict}</span></center>
                                    </div>
                                    <div className='h-auto w-full border-2 p-2 mt-1'>
                                        {
                                            rate.commentPredict === "😐" ?
                                            <div className={`h-auto w-full border-2 p-2 mt-1 ${getCommentStyling(rate.comment)} bg-red-500`}>
                                                    <div className=''>
                                                        <p className='font-semibold'>{rate.comment}</p>
                                                    </div>
                                                </div>
                                                :
                                                rate.commentPredict === "🙂" ?
                                                <div className={`h-auto w-full border-2 p-2 mt-1 ${getCommentStyling(rate.comment)} bg-yellow-500`}>
                                                        <div className=''>
                                                            <p className='font-semibold'>{rate.comment}</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    rate.commentPredict === "😊" ?
                                                    <div className={`h-auto w-full border-2 p-2 mt-1 ${getCommentStyling(rate.comment)} bg-green-500`}>
                                                            <div className=''>
                                                                <p className='font-semibold'>{rate.comment}</p>
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>

                                        }
                                    </div>
                                </div>
                                :
                                <></>
                        }

                        {/* <div className='mx-2'>
                            <div>
                                <p className='text-2xl'>Review Comment</p>
                            </div>
                            <div className='h-auto w-full border-2 p-2 mt-1'>
                                <p className='text-justify'>{rate.comment}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className='mx-2 py-2 flex items-center justify-center'>
                    <div>
                        {/* <div>
                            {
                                rate.commentPredict === 'bad' ?
                                    <div className='flex justify-center items-center w-40 h-20 bg-red-500'>
                                        <div className=''>
                                            <p className='font-semibold'>{rate.commentPredict}</p>
                                        </div>
                                    </div>
                                    :
                                    rate.commentPredict === 'average' ?
                                        <div className='flex justify-center items-center w-40 h-20 bg-yellow-500'>
                                            <div className=''>
                                                <p className='font-semibold'>{rate.commentPredict}</p>
                                            </div>
                                        </div>
                                        :
                                        rate.commentPredict === 'good' ?
                                            <div className='flex justify-center items-center w-40 h-20 bg-green-500'>
                                                <div className=''>
                                                    <p className='font-semibold'>{rate.commentPredict}</p>
                                                </div>
                                            </div>
                                            :
                                            <></>

                            }
                        </div> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default DegreeReviewItem