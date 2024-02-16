import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import DashboardPage from './pages/dashboard/index.page';
import LoginPage from './pages/home/login.page';
import RegisterPage from './pages/home/register.page';
import DashboardHomePage from './pages/dashboard/home.page';
import DashboardNotesPage from './pages/dashboard/notes.page';
import HomePage from './pages/home/index.page';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<HomePage />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<DashboardPage />}>
          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/dashboard/notes" element={<DashboardNotesPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
