import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from '../pages/Dashboard';
import LiveUsers from '../pages/LiveUsers';
import OTPAnalysis from '../pages/OTPAnalysis';
import ProfileAnalytics from '../pages/ProfileAnalytics';

// Generating mocked views for the remainder of the 12 specific routes as requested
import DashboardsOverview from '../pages/DashboardsOverview';
import DroppedMembers from '../pages/DroppedMembers';
import RaisedTickets from '../pages/RaisedTickets';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Dashboard - Customers Engage */}
          <Route index element={<Dashboard />} />
          
          {/* Target Handwritten Analytics Screens */}
          <Route path="live-users" element={<LiveUsers />} />
          <Route path="dashboards" element={<DashboardsOverview />} />
          <Route path="otp-analysis" element={<OTPAnalysis />} />
          <Route path="profile" element={<ProfileAnalytics />} />
          <Route path="dropped-members" element={<DroppedMembers />} />
          <Route path="raised-tickets" element={<RaisedTickets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
