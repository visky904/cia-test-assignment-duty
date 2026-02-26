import React from 'react';
import DataUpload from './components/DataUpload';
import AllocationDisplay from './components/AllocationDisplay'; // Added this

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <h1>CIA Test Automation Dashboard</h1>
      </header>
      
      <main style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <DataUpload endpoint="students" title="Student List" />
          <DataUpload endpoint="staff" title="Staff List" />
          <DataUpload endpoint="rooms" title="Classroom Details" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
             <AllocationDisplay />
        </div>
      </main>
    </div>
  );
}

export default App;