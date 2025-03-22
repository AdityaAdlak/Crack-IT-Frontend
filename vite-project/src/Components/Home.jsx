


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="stars"></div>
      <h1 className="text-5xl font-bold mb-6 text-center">
        Welcome to <span className="text-blue-500">CrackIT</span>
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
        Your ultimate platform for mastering technical interviews...
      </p>
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full font-medium">
          Get Started
        </button>
        <button className="border border-gray-700 px-6 py-3 rounded-full hover:bg-gray-800">
          Learn More
        </button>
      </div>

    </div>
  );
}
