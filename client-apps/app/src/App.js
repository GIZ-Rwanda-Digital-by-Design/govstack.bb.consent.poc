import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QRCodeScanner from './components/QRCodeScanner';
import PersonalInfoForm from './components/PersonalInfoForm';
import ConsentScreen from './components/ConsentScreen';
import ValidationFeedback from './components/ValidationFeedback';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/scan" />} />
        <Route path="/scan" element={<QRCodeScanner />} />
        <Route path="/form" element={<PersonalInfoForm />} />
        <Route path="/consent" element={<ConsentScreen />} />
        <Route path="/feedback" element={<ValidationFeedback />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
