
import {useLocation} from "react-router-dom"
import Editor from "@monaco-editor/react";
import {useState} from "react"

export default function CodeEditor()
{
    const location = useLocation();
    const question = location.state?.questionTitle;
    const questionExample= location.state?.example;
    const questionTestCase =location.state?.testCases || [];



    const [code, setCode] = useState("// Write your code here...");
    const [language, setLanguage] = useState("cpp"); 
    const [mode,setMode] = useState("vs-light")




    console.log(question);
    console.log(questionExample);
    console.log(questionTestCase)
    if (!question || !questionExample || !questionTestCase) {
        return <p className="text-center text-red-500">No question selected.</p>;
    }

    
    return (
        <div className="flex h-screen bg-[#f8f9fa]">
         
            <div className="w-1/2 p-6 overflow-auto border-r border-gray-300 bg-white">
                <h2 className="text-2xl font-bold text-gray-900">{question}</h2>
               
                
                {questionExample && (
                    <div className="mt-4 p-4 border rounded-lg bg-[#f3f4f6]">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Example</h3>
                        <pre className="text-sm bg-gray-100 p-2 rounded-md">
                            {JSON.stringify(questionExample, null, 2)}
                        </pre>
                    </div>
                )}

                
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Test Cases</h3>
                    {questionTestCase.length > 0 ? (
                        questionTestCase.map((test, index) => (
                            <pre key={index} className="text-sm bg-gray-100 p-2 rounded-md mb-2">
                                {JSON.stringify(test, null, 2)}
                                {/* conversion of js object to formatted json */}
                                {
//                                "name": "John",this type of conversion
//                                  "age": 25,
//                                  "city": "New York"
                                }
                            </pre>
                        ))
                    ) : (
                        <p className="text-gray-500">No test cases available.</p>
                    )}
                </div>
            </div>

           
            <div className="w-1/2 flex flex-col p-4 bg-white">
            <div className="flex items-center space-x-2">
    <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
    >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
    </select>

    <select 
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
    >
        <option value="vs-light">Light</option>
        <option value="vs-dark">Dark</option>
    </select>
    </div>



                <Editor className="mt-4 border-2 border-black rounded-lg"
                    height="60vh"
                    language={language}
                    theme= {mode}
                    value={code}
                    onChange={(newCode) => setCode(newCode)}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollbar: { vertical: "auto" },
                        padding: { top: 12 },
                    }}
                />

                
                <div className="mt-4 flex justify-between items-center">
                <div className="mt-4 flex items-center space-x-2">
                 <button className="bg-[#0a0f1a] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                 Run Code
                </button>

                <button className="bg-[#0a0f1a] text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                Submit Code
                </button>
</div>

                    
                    
                </div>
            </div>
        </div>
    );
}