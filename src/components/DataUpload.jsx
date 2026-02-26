import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const DataUpload = ({ endpoint, title }) => {
    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                setData(results.data);
                console.log("Parsed Data:", results.data);
            },
        });
    };

    const uploadToDatabase = async () => {
        try {
            await axios.post(`http://localhost:5000/api/${endpoint}`, data);
            alert(`${title} uploaded successfully!`);
        } catch (err) {
            console.error(err);
            alert("Upload failed.");
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
            <h3>Upload {title} (CSV)</h3>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <button onClick={uploadToDatabase} disabled={data.length === 0}>
                Sync to MongoDB
            </button>
        </div>
    );
};

export default DataUpload;