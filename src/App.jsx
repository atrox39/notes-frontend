import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import {
  IndexPage,
  RegisterPage,
  LoginPage,
} from './pages/home';
import {
  DashboardPage,
  DashboardHomePage,
  DashboardNotesPage,
} from './pages/dashboard';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<IndexPage />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route path="" element={<DashboardHomePage />} />
          <Route path="notes" element={<DashboardNotesPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
