// Simple test component
import React from 'react';

const TestApp = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'blue' }}>Frontend is Working!</h1>
      <p>If you can see this, React is rendering properly.</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h2>Debug Info:</h2>
        <p>✅ React is working</p>
        <p>✅ App is rendering</p>
        <p>✅ Styles are loading</p>
      </div>
    </div>
  );
};

export default TestApp;