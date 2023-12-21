import React, { useEffect, useState } from 'react'
import ProfessorReviewItem from '../../common/professorReviewItem/ProfessorReviewItem'
import PrpfessorNavbar from '../navbar/ProfessorNavbar'
import axios from 'axios'
import ReactApexChart from "react-apexcharts";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const ProfessorDashboard = () => {
    const [reviewList, setReviewList] = useState([])
    const [summary, setSummary] = useState({
        "average_difficulty": 0,
        "average_quality": 0,
        "quality_counts": [0, 0, 0, 0, 0]
    })

// Calculate counts for each category
const commentPredictCounts = {
  good: reviewList.filter(rate => rate.commentPredict === 'good').length,
  bad: reviewList.filter(rate => rate.commentPredict === 'bad').length,
  average: reviewList.filter(rate => rate.commentPredict === 'average').length,
};

// Calculate total number of comments
const totalComments = Object.values(commentPredictCounts).reduce((sum, count) => sum + count, 0);

// Calculate percentages
const commentPredictPercentages = {
  good: ((commentPredictCounts.good / totalComments) * 100),
  bad: ((commentPredictCounts.bad / totalComments) * 100),
  average: ((commentPredictCounts.average / totalComments) * 100),
};


// Calculate percentages for bar chart
const commentPredictPercentagesBarChart = {
  good: ((commentPredictCounts.good / totalComments) * 100).toFixed(1),
  bad: ((commentPredictCounts.bad / totalComments) * 100).toFixed(1),
  average: ((commentPredictCounts.average / totalComments) * 100).toFixed(1),
};


    const navigate = useNavigate()
    const { id } = useParams();
    const storedItem = localStorage.getItem('user');
    const retrievedObject = JSON.parse(storedItem);

    const currentProfessor = localStorage.getItem('selectedProfName')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/professor/getMyAll?professorId=' + retrievedObject.id);
                setReviewList(response.data.rates)
                setSummary(response.data.summary)
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <PrpfessorNavbar />
            <div>
                <p className='mx-5 text-xl font-semibold my-5'>Rating Stats</p>
                <div className='flex my-10 mx-20'>
                    <div className='w-96 my-10 flex-col justify-center items-center'>
                        <div className='ml-2 flex'>
                            <div className='my-2 mr-5'>
                                <div className='w-200 h-20 flex justify-center items-center rounded-lg shadow-2xl'>
                                    <p className='text-7xl font-mono text-slate-800'>{summary.average_quality}</p> <span className='font-mono -mt-10 ml-2 text-slate-800'>/5</span>
                                </div>
                                <div className='w-fit flex my-1'>
                                    <p className='text-center text-xs font-bold'>Overall Quality Based on the </p> <span className='text-center  text-xs font-bold underline mx-2'>{reviewList.length} ratings</span>
                                </div>
                            </div>
                            {/* <div className='my-2 ml-5'>
                                <div className='w-20'>
                                    <p className='font-bold text-center font-mono text-xs'>Difficulty</p>
                                </div>
                                <div className='w-20 h-20 bg-green-700 flex justify-center items-center rounded-lg shadow-2xl'>
                                    <p className='text-7xl font-mono text-white'>{summary.average_quality}</p> <span className='font-mono -mt-10 ml-2 text-white'>/5</span>
                                </div>
                            </div> */}
                        </div>
                        <div className='ml-2 text-slate-800 text-lg font-extrabold '>
                            <p>{currentProfessor}</p>
                        </div>
                        <div className='flex ml-2 mt-5 font-mono font-bold divide-x-2 divide-slate-800'>
                            <div className='pr-5'>
                                <p className='text-center text-5xl'>{summary.no_of_like_to_take_again}</p>
                                <p>Would take again</p>
                            </div>
                            <div className='pl-5'>
                                <p className='text-center text-5xl'>{summary.average_difficulty}</p>
                                <p>Level of Difficulty</p>
                            </div>
                        </div>
                        {/* <div className='ml-2 mt-12'>
                            <div className='bg-blue-300 text-white font-mono font-bold mx-4 p-3 flex items-center justify-center rounded-full hover:bg-blue-800 cursor-pointer'
                                onClick={() => navigate('/student/newProfessorRate/' + id + '/' + localStorage.getItem("selectedProfName") + "/" + localStorage.getItem("selectedProfDegree"))}
                            >
                                <p className='text-lg'>Rate this Professor</p>
                            </div>
                        </div> */}
                    </div>
                    <div className='w-3/4 mx-20 bg-gray-50'>
                        <p className='m-5 text-lg font-semibold'>Rating Distribution</p>
                        <div id="chart">
                            <ReactApexChart options={{
                                chart: {
                                    type: 'bar',
                                    height: 350
                                },
                                plotOptions: {
                                    bar: {
                                        borderRadius: 4,
                                        horizontal: true,
                                    }
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                xaxis: {
                                    categories: ['Awesome 5', 'Great 4', 'Good 3', 'OK 2', 'Awful 1'
                                    ],
                                }
                            }} series={[{
                                data: summary.quality_counts
                            }]} type="bar" height={350} />
                        </div>
                    </div>

                </div>
                <div className="flex my-10 mx-20">
                 <div className="w-1/2 mx-20 bg-gray-50">
        <p className="m-5 text-lg font-semibold">Review Comments Distribution (%)</p>
        <div id="chart">
          <ReactApexChart
            options={{
              chart: {
                type: "pie",
                height: 350,
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: true,
                        showAlways: false,
                        label: "Total",
                        fontSize: "18px",
                        fontFamily: "Helvetica, Arial, sans-serif",
                        fontWeight: 600,
                        color: "#373d3f",
                        formatter: function (w) {
                          return totalComments;
                        },
                      },
                    },
                  },
                },
              },
              labels: ["Good", "Average", "Bad"],
              colors: ["#27AE60", "#F39C12", "#E74C3C"],
              dataLabels: {
                enabled: false,
              },
            }}
            series={[commentPredictPercentages.good, commentPredictPercentages.average, commentPredictPercentages.bad]}
            type="donut"
            height={350}
          />
        </div>
                 </div>

                 <div className="w-1/2 mx-20 bg-gray-50">
  <p className="m-5 text-lg font-semibold">Review Comments Distribution (%)</p>
  <div id="chart">
    <ReactApexChart
      options={{
        chart: {
          type: "bar",
          height: 350,
        },
        xaxis: {
          categories: ["Good", "Average", "Bad"],
        },
        colors: ["#27AE60", "#F39C12", "#E74C3C"],
      }}
      series={[
        {
          name: "Distribution (%)",
          data: [
            commentPredictPercentagesBarChart.good,
            commentPredictPercentagesBarChart.average,
            commentPredictPercentagesBarChart.bad,
          ],
        },
      ]}
      type="bar"
      height={350}
    />
  </div>
                </div>
                </div>
            </div>
            <div>
                <div className='m-10'>
                    <p className='text-2xl font-mono font-bold'>My Ratings</p>
                </div>
                <div>
                    {/* {reviewList.map((rate) => (
                        <div className='mt-10'>
                            <ProfessorReviewItem
                                rate={rate}
                            />
                        </div>
                    ))} */}
{reviewList
  .slice() // Create a shallow copy of the array
  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort in descending order based on timestamp
  .map((rate) => (
    <div className='mt-10' key={rate.id}>
      <ProfessorReviewItem rate={rate} />
    </div>
  ))}

                </div>
            </div>
        </>
    )
}

export default ProfessorDashboard