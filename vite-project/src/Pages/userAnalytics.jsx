import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#38bdf8", "#e5e7eb"]; // Blue for correct, Gray for remaining

function UserAnalytics() {
  const { id } = useParams();

  const [correctCoding, setCorrectCoding] = useState(0);
  const [correctMcq, setCorrectMcq] = useState(0);
  const [totalCoding, setTotalCoding] = useState(0);
  const [totalMcq, setTotalMcq] = useState(0);
  const [improvementData, setImprovementData] = useState([]);

  async function getData() {
    try {
      const response = await fetch(`http://localhost:3000/user/v1/userAnalytics/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        console.error("Error in getting response in userFinalAnalytics...");
        return;
      }

      const data = await response.json();

      setTotalMcq(data.data.totalMCQ || 0);
      setTotalCoding(data.data.totalCoding || 0);
      setCorrectCoding(data.data.correctCoding || 0);
      setCorrectMcq(data.data.correctMCQ || 0);

      if (data.data.improvementOverTime.length > 0) {
        const improvement = data.data.improvementOverTime.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-GB"), // Format as DD/MM/YYYY
          score: item.score || 0,
        }));
        setImprovementData(improvement);
      } else {
        setImprovementData([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const codingData = [
    { name: "Correct", value: correctCoding },
    { name: "Remaining", value: totalCoding - correctCoding },
  ];

  const mcqData = [
    { name: "Correct", value: correctMcq },
    { name: "Remaining", value: totalMcq - correctMcq },
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
          User Analytics
        </h2>

       
        <button
          onClick={(e) => {
            e.preventDefault();
            getData();
          }}
          className="bg-[#0a0f1a] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
        >
          Show Analytics
        </button>

        
        <div className="flex flex-wrap gap-6 justify-center mt-8">
         
          <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Coding Stats
            </h3>
            <div className="w-full max-w-[200px]">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={codingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {codingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-semibold text-blue-500">
                {correctCoding} / {totalCoding} ({Math.round((correctCoding / totalCoding) * 100) || 0}%)
              </p>
            </div>
          </div>

          {/* MCQ Stats */}
          <div className="flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              MCQ Stats
            </h3>
            <div className="w-full max-w-[200px]">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={mcqData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {mcqData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm font-semibold text-blue-500">
                {correctMcq} / {totalMcq} ({Math.round((correctMcq / totalMcq) * 100) || 0}%)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Improvement Over Time
          </h3>
          <div className="w-full">
          <ResponsiveContainer width="100%" height={250}>
  <LineChart
    data={improvementData.length > 1 ? improvementData : [{ date: "", score: 0 }, ...improvementData]}
    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="date"
      tick={{ fontSize: 12 }}
      label={{
        value: "Date",
        position: "bottom",
        dy: 15,
        style: { fontSize: 14, fill: "#555" },
      }}
    />
    <YAxis
      tick={{ fontSize: 12 }}
      label={{
        value: "Score",
        angle: -90,
        position: "insideLeft",
        dy: -10,
        style: { fontSize: 14, fill: "#555" },
      }}
    />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="score"
      stroke="#38bdf8"
      strokeWidth={2}
      activeDot={{ r: 6, fill: "#38bdf8" }}
      dot={{ r: 4, fill: "#38bdf8" }}
      connectNulls
    />
  </LineChart>
</ResponsiveContainer>

          </div>

     
          {improvementData.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No improvement data available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export { UserAnalytics };
