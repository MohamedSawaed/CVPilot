import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LanguageSelector from './components/LanguageSelector';
import Dashboard from './pages/Dashboard';
import TemplateSelection from './pages/TemplateSelection';
import Questionnaire from './pages/Questionnaire';
import CVBuilderEnhanced from './pages/CVBuilderEnhanced';
import CVBuilderPro from './pages/CVBuilderPro';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Create New CV Flow Component
function CreateCVFlow() {
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleProfessionSelect = (profession) => {
    setSelectedProfession(profession);
  };

  const handleQuestionnaireComplete = (profile) => {
    setUserProfile(profile);
  };

  const handleStartOver = () => {
    setSelectedProfession(null);
    setUserProfile(null);
  };

  if (!selectedProfession) {
    return <TemplateSelection onSelectProfession={handleProfessionSelect} />;
  }

  if (!userProfile) {
    return (
      <Questionnaire
        profession={selectedProfession}
        onComplete={handleQuestionnaireComplete}
      />
    );
  }

  return (
    <CVBuilderEnhanced
      profession={selectedProfession}
      userProfile={userProfile}
      onStartOver={handleStartOver}
      isNewCV={true}
    />
  );
}

// Edit Existing CV Component
function EditCV() {
  const { cvId } = useParams();

  return (
    <CVBuilderEnhanced
      cvId={cvId}
      isNewCV={false}
    />
  );
}

function AppContent() {
  return (
    <>
      <LanguageSelector />
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          {/* Dashboard - Main page showing all CVs */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Create new CV flow */}
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateCVFlow />
              </ProtectedRoute>
            }
          />

          {/* Edit existing CV */}
          <Route
            path="/edit/:cvId"
            element={
              <ProtectedRoute>
                <EditCV />
              </ProtectedRoute>
            }
          />

          {/* New Pro Builder - Create */}
          <Route
            path="/builder"
            element={
              <ProtectedRoute>
                <CVBuilderPro />
              </ProtectedRoute>
            }
          />

          {/* New Pro Builder - Edit */}
          <Route
            path="/builder/:cvId"
            element={
              <ProtectedRoute>
                <CVBuilderPro />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
