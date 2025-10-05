import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Onboarding } from './pages/user/Onboarding';
import { UserDashboard } from './pages/user/UserDashboard';
import { CourseViewer } from './pages/user/CourseViewer';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function App() {
  return (
    <AppThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/onboarding" replace />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/course/:id" element={<CourseViewer />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AppThemeProvider>
  );
}

export default App;
