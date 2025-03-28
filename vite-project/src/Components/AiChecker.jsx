


import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function AiChecker() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get token from localStorage
    const token = localStorage.getItem("token");
    let userId = null;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.id; 
            console.log("User ID:", userId);
        } catch (err) {
            console.error("Invalid token!", err);
        }
    } else {
        console.warn("No token found!");
    }

    // Extract values from state
    const selectedSetId = location.state?.selectedSetId || null;
    const userAnswer = location.state?.userAnswer || [];

    console.log("AI Checker - userAnswer:", userAnswer);

    async function submitAnswers() {
        if (!userId || !selectedSetId) {
            alert("Missing user or interview set ID!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/user/v1/submit", {
                userId,
                interviewSetId: selectedSetId,
                answers: userAnswer,
                codingQueLang: "cpp",
            });

            console.log("The AI Response:", response);

            if (response.data.success) {
                alert("Answers submitted successfully!");
                const userAnswerId = response.data.data._id;
                navigate(`/aiResponse/${userAnswerId}`, { state: { selectedSetId } });
            } else {
                alert("Error: " + response.data.message);
            }
        } catch (error) {
            console.error("Error submitting answers:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <div>
            <button onClick={submitAnswers}>
                <div>AI Checker</div>
            </button>
        </div>
    );
}
