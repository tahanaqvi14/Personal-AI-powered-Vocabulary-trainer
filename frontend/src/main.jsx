import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './index.css'
import Viewwords from './Viewwords.jsx'
import Dashboard from './Dashboard.jsx'
import Quiz from './Quiz.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route 
        path='/' 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/Viewwords' 
        element={
          <ProtectedRoute>
            <Viewwords />
          </ProtectedRoute>
        } 
      />
      <Route 
        path='/Quiz' 
        element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
)