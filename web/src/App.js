import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import RealTimeDashboard from './components/Dashboard/RealTimeDashboard';
import FeedingHistory from './components/History/FeedingHistory';
import ConsumptionChart from './components/History/ConsumptionChart';
import ScheduleFeeding from './components/Dashboard/ScheduleFeeding';
import AlertSystem from './components/Notifications/AlertSystem';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <RealTimeDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/feeding-history"
                    element={
                        <ProtectedRoute>
                            <FeedingHistory />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/consumption-chart"
                    element={
                        <ProtectedRoute>
                            <ConsumptionChart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/schedule-feeding"
                    element={
                        <ProtectedRoute>
                            <ScheduleFeeding />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/alerts"
                    element={
                        <ProtectedRoute>
                            <AlertSystem />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;