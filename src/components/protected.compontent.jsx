import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/user.context';

export default function ProtectedRoute({ children }) {
  const { isAuth } = useUser();
  if (!isAuth) {
    return (
      <Navigate to="/" />
    );
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
