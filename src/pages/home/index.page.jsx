import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../../context/user.context';

export default function HomePage() {
  const { isAuth } = useUser();
  if (isAuth) {
    return (<Navigate to="/dashboard" />);
  }
  return (<Outlet />);
}
