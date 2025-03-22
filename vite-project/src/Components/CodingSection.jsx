import { useLocation, useNavigate } from "react-router-dom";


export default function CodingSection() {
    const location = useLocation();
    const selectedSet = location.state?.selectedSet;
    const navigate = useNavigate();

    if (!selectedSet) {
        return <p className="text-center text-red-500">No set selected.</p>;
    }
    

    console.log("Coding Questions:", selectedSet.codingQuestions);

    return (
        <div className="p-6">
             <div className="mt-4 space-y-4">
                {
                    selectedSet.codingQuestions.map((questionObj)=>{
                        
                            const question = questionObj.questionTitle;
                            const questionExample = questionObj.example;
                            const questionTestCase = questionObj.testCases;
                            const questionid = questionObj.questionId

                        
                            return(

                        <div key={questionObj.id} className="p-4 border-b cursor-pointer hover:bg-gray-100 rounded-lg" 
                        onClick={() => navigate(`/code-editor/${questionid}`, { state: { question , questionExample , questionTestCase} })}>
                            <p className="text-lg font-semibold">{questionObj.questionTitle}</p>
                        </div>
                            )
                    })
                }
             </div>
        </div>
    )
}
