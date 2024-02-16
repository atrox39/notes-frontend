import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/user.context';
import DashboardLayout from '../../layouts/dashboard.layout';

export default function DashboardPage() {
  const { isAuth } = useUser();
  if (!isAuth) {
    return (<Navigate to="/" />);
  }
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
