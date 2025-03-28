


import { useRef } from "react";
import CrackITSteps from "../Components/StepSection";
import Footer from "../Components/Footer";

export default function Home() {
  const stepsRef = useRef(null);

  // used for reference to the stepSection dont rerender the dom elements stores a reference value
  const handleScroll = () => {
    stepsRef.current?.scrollIntoView({ behavior: "smooth" });
    // should not get error if stepsRef is null and do smooth scroll
    // scrollIntoView({ behavior: "smooth" });  predefined function
    // ?run only if stepsRef != NULL
  };

  return (
    <>
    
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-black">
          <div className="stars"></div>
        </div>

        <h1 className="text-5xl font-bold mb-6 text-center relative z-10">
          Welcome to <span className="text-blue-500">CrackIT</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 text-center relative z-10">
          Your ultimate platform for mastering technical interviews...
        </p>
        
       
        <div className="flex gap-4 relative z-10">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-medium transition duration-300">
            Get Started
          </button>
          <button
            onClick={handleScroll}
            className="border border-gray-700 px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

     {/* useRef.current points to this div */}
      <div ref={stepsRef} className="pb-10 bg-black">
        <CrackITSteps />
        
      </div>
      <Footer/>
    </>
  );
}
