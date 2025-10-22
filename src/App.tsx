
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProjectDetail from './pages/ProjectDetail';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthProvider from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:projectId"
            element={
              <ProtectedRoute>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
