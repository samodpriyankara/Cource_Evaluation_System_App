import React, { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import logo from "../../../assets/images/logo.png";
import axios from "axios";
import ProfessorReviewItems from "../../common/professorReviewItem/ProfessorReviewItem";
import Popup from "reactjs-popup";
import SignIn from "../signIn/SignIn";
import SignUp from "../signUp/SignUp";
import ReactApexChart from "react-apexcharts";
import ReactWordcloud from 'react-wordcloud';
import Wordcloud from 'wordcloud';
import d3 from "d3";
import "d3-cloud";


const AllProfessorRating = () => {



  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    toast.info("User logging out");
    navigate("/");
  };

  const storedItem = localStorage.getItem("user");
  const retrievedObject = JSON.parse(storedItem);

  const currentProfessor = localStorage.getItem("selectedProfName");

  const { id } = useParams();

  const [reviewList, setReviewList] = useState([]);
  const [summary, setSummary] = useState({
    average_difficulty: 0,
    average_quality: 0,
    quality_counts: [0, 0, 0, 0, 0],
  });

  const generateWordCloudData = () => {
    const allComments = reviewList.map(rate => rate.comment).join(" ");
    const words = allComments.split(" ");
    
    // List of common prepositions to be removed
    const prepositions = ["has","all","be","as","also","2006","me","have","my","in","i","you","your", "on","a","an","are", "at", "with", "by", "to", "from", "for", "of", "the", "and", "or", "is", "it", "that"];
    
    const wordFreq = {};
    words.forEach(word => {
      const cleanedWord = word.toLowerCase().trim();
      if (cleanedWord && !prepositions.includes(cleanedWord)) {
        if (!wordFreq[cleanedWord]) {
          wordFreq[cleanedWord] = 1;
        } else {
          wordFreq[cleanedWord]++;
        }
      }
    });
    
    const wordCloudData = Object.keys(wordFreq).map(word => ({
      text: word,
      value: wordFreq[word],
    }));
    
    return wordCloudData;
  };

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




  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://127.0.0.1:8000/student/professor/getAllRate", {
            params: {
              professorId: id,
            },
          })
          .then(function (response) {
            // setDegreeReview(...degreeReview, response.data)
            setReviewList(response.data.rates);
            setSummary(response.data.summary);
            console.log("res", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between mx-10 mt-5">
        <div className="">
        <div className='flex items-center'>
            <img src={logo} alt="logo" className="w-20 h-20 rounded-full" />
            <p className='font-mono text-2xl text-slate-900 font-bold'>
                    EduRater
                    </p>
          </div>
        </div>
        <div>
          <div className="">
            <div className="bg-[url('https://i.im.ge/2023/07/09/5ocnUr.graph.png')]">
              <div className="flex justify-center items-center mt-10 ">
                {retrievedObject !== null ? (
                  <>
                    <div className="mr-10 font-bold flex">
                      <p className="text-xl">Hello</p>
                      <span className="text-xl mx-2">
                        {retrievedObject.firstname}
                      </span>
                    </div>
                    <div>
                      <div
                        className="flex w-fit h-fit bg-primary px-3 py-1 rounded-full text-white cursor-pointer hover:ring-2 hover:ring-black"
                        onClick={logoutUser}
                      >
                        <IoMdLogOut className="w-6 h-6 ml-1 mt-1" />
                        <div className="flex items-center mt-0.5">
                          <p className="font-mono text-xs">Logout</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex">
                    <div className="mx-3 bg-white text-black border-2 border-black w-32 h-8 flex items-center justify-center rounded-2xl cursor-pointer">
                      <Popup
                        trigger={
                          <div>
                            <p className="font-mono font-semibold">Sign In</p>
                          </div>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal">
                            <SignIn />
                          </div>
                        )}
                      </Popup>
                    </div>
                    <div className="mx-3 bg-black text-white w-32 h-8 flex items-center justify-center rounded-2xl cursor-pointer hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-500 ease-in-out">
                      <Popup
                        trigger={
                          <div>
                            <p className="font-mono font-semibold">Sign Up</p>
                          </div>
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="modal">
                            <SignUp />
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 font-mono text-white">
        <div className="flex justify-end mx-10">
          <div
            className="mx-2 bg-primary px-4 rounded-3xl cursor-pointer"
            onClick={() =>
              navigate(
                "/student/newProfessorRate/" +
                  id +
                  "/" +
                  localStorage.getItem("selectedProfName") +
                  "/" +
                  localStorage.getItem("selectedProfDegree")
              )
            }
          >
            <p>Add New a Rating</p>
          </div>
          {retrievedObject !== null ? (
            <div
              className="mx-2 bg-primary px-4 rounded-3xl cursor-pointer"
              onClick={() => navigate("/student/dashboard")}
            >
              <p>Return to Dashboard</p>
            </div>
          ) : (
            <div
              className="mx-2 bg-primary px-4 rounded-3xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              <p>Return to Home</p>
            </div>
          )}
        </div>
      </div>

      <div className="">
        <p className="mx-5 text-lg font-semibold">Rating Stats</p>
        <div className="flex my-10 mx-20">
          <div className="w-96 my-10">
            <div className="ml-2 flex">
              <div className="my-2 mr-5">
                <div className="w-100 h-20 flex justify-center items-center rounded-lg shadow-2xl">
                  <p className="text-7xl font-mono text-slate-800">
                    {summary.average_quality}
                  </p>{" "}
                  <span className="font-mono -mt-10 ml-2 text-slate-800">
                    /5
                  </span>
                </div>
                <div className="w-fit flex my-1">
                  <p className="text-center text-xs font-bold">
                    Overall Quality Based on the{" "}
                  </p>{" "}
                  <span className="text-center  text-xs font-bold underline mx-2">
                    {reviewList.length} ratings
                  </span>
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
            <div className="ml-2 text-slate-800 text-lg font-extrabold ">
              <p>{currentProfessor}</p>
            </div>
            <div className="flex ml-2 mt-5 font-mono font-bold divide-x-2 divide-slate-800">
              <div className="pr-5">
                <p className="text-center text-5xl">
                  {summary.no_of_like_to_take_again}
                </p>
                <p>Would take again</p>
              </div>
              <div className="pl-5">
                <p className="text-center text-5xl">
                  {summary.average_difficulty}
                </p>
                <p>Level of Difficulty</p>
              </div>
            </div>
            <div className="ml-2 mt-12">
              <div
                className="bg-blue-300 text-white font-mono font-bold mx-4 p-3 flex items-center justify-center rounded-full hover:bg-blue-800 cursor-pointer"
                onClick={() =>
                  navigate(
                    "/student/newProfessorRate/" +
                      id +
                      "/" +
                      localStorage.getItem("selectedProfName") +
                      "/" +
                      localStorage.getItem("selectedProfDegree")
                  )
                }
              >
                <p className="text-lg">Rate this Professor</p>
              </div>
            </div>
          </div>
          <div className="w-3/4 mx-20 bg-gray-50">
            <p className="m-5 text-lg font-semibold">Rating Distribution</p>
            <div id="chart">
              <ReactApexChart
                options={{
                  chart: {
                    type: "bar",
                    height: 350,
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 4,
                      horizontal: true,
                    },
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  xaxis: {
                    categories: [
                      "Awesome 5",
                      "Great 4",
                      "Good 3",
                      "OK 2",
                      "Awful 1",
                    ],
                  },
                }}
                series={[
                  {
                    data: summary.quality_counts,
                  },
                ]}
                type="bar"
                height={350}
              />
            </div>
          </div>
        </div>
        <div className="flex my-10 mx-20">
        <div className="w-2/5 mx-20 bg-gray-50">
  <p className="m-5 text-lg font-semibold">Review Comments Distribution (%)</p>
  <div id="chart">
    <ReactApexChart
      options={{
        chart: {
          type: "polarArea",
          height: 350,
        },
        labels: ["Good", "Average", "Bad"],
        fill: {
          opacity: 0.85,
        },
        legend: {
          position: "bottom",
        },
      }}
      series={[commentPredictPercentages.good, commentPredictPercentages.average, commentPredictPercentages.bad]}
      type="polarArea"
      height={350}
    />
  </div>
</div>

{/* <div className="w-1/2 mx-20 bg-gray-50">
  <p className="m-5 text-lg font-semibold">Review Comments Distribution (%)</p>
  <div id="chart">
    <ReactApexChart
      options={{
        chart: {
          type: "polarArea",
          height: 350,
        },
        labels: ["Good", "Average", "Bad"],
        fill: {
          opacity: 0.85,
        },
        legend: {
          position: "bottom",
        },
      }}
      series={[commentPredictPercentages.good, commentPredictPercentages.average, commentPredictPercentages.bad]}
      type="polarArea"
      height={350}
    />
  </div>
</div> */}
<div className="w-3/5 mx-20 bg-gray-50">
  <p className="m-10 text-lg font-semibold">Word Cloud of Comments</p>
  <div
    id="word-cloud"
    className="h-96"
    style={{ backgroundColor: "#DAF7A6", margin: 0, padding: 0  }}
    // style={{ transform: "rotate(90deg)" }}
  >
    {/* <ReactWordcloud
      words={generateWordCloudData()}
      options={{
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#191970", "#ff7f0e", "#000080", "#d62728"], // Custom colors
        rotations: 2, // Number of rotations for words
        rotationsAngles: [0, 90], // Specify rotation angles
        scale: "log", // Scaling method for word sizes
        enableTooltip: false, // Disable tooltips for better appearance
      }}
    /> */}
    <ReactWordcloud
  words={generateWordCloudData()}
  options={{
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    colors: ["#191970", "#ff7f0e", "#000080", "#d62728", "green", "blue"],
    rotations: 0,
    fontSize: [20, 40], // Adjust the font size range for small and large words
    scale: "log",        // Use log scale to emphasize size differences
    spiral: "rectangular",
    enableTooltip: true,
  }}
/>

  </div>
</div>
        </div>

        {/* {reviewList.map((rate, index) => (
          <div key={index} className="my-5">
            <ProfessorReviewItems rate={rate} />
          </div>
        ))} */}
         {reviewList
         .slice() // Create a shallow copy of the array
         .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
         .map((rate, index) => (
          <div key={index} className="my-5">
            <ProfessorReviewItems rate={rate} />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllProfessorRating;
