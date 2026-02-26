import React, { useState } from 'react';
import axios from 'axios';

const AllocationDisplay = () => {
    const [results, setResults] = useState([]);

    const handleGenerate = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/allocate');
        if (response.data.length === 0) {
            alert("Allocation returned 0 results. Is your Staff, Student, or Room list empty?");
        }
        setResults(response.data);
    } catch (err) {
        console.error(err);
        alert("Failed to generate: " + (err.response?.data?.error || "Internal Server Error"));
    }
};
    return (
        <div style={{ marginTop: '30px', padding: '20px' }}>
            <button onClick={handleGenerate} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}>
                Generate Seating Plan & Duties
            </button>

            {results.length > 0 && (
                <table border="1" style={{ marginTop: '20px', width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Room No</th>
                            <th>Invigilator (Staff)</th>
                            <th>Student Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((res, index) => (
                            <tr key={index}>
                                <td>{res.roomNumber}</td>
                                <td>{res.staff}</td>
                                <td>{res.studentCount} students</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllocationDisplay;