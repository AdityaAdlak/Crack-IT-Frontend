

import { useLocation, useNavigate } from "react-router-dom";

export default function SetDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedSet = location.state?.set;

    if (!selectedSet) {
        return <p className="text-center text-red-500">No set selected.</p>;
    }

    return (
        <center>
        <div className="mt-6 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-lg font-bold text-gray-800">Set {selectedSet.setNumber} - Sections</h2>

            <div className="flex gap-4 mt-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => navigate(`/mcq/${selectedSet.id}`, { state: { selectedSet } })}>
                    MCQs
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md" onClick={() => navigate(`/theory/${selectedSet.id}`, { state: { selectedSet } })}>
                    Theory
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => navigate(`/coding/${selectedSet.id}`, { state: { selectedSet } })}>
                    Coding
                </button>
            </div>
        </div>
    </center>
    );
}
