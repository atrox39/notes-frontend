import React from 'react';
import PropTypes from 'prop-types';
import ApiService from '../service/api.service';

/**
 * @typedef {object} LoginDto
 * @property {string} username
 * @property {string} password
 *
 * @typedef {object} RegisterDto
 * @property {string} email
 * @property {string} username
 * @property {string} password
*/

const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [authentication, setAuthentication] = React.useState({
    auth: false,
    jwt: null,
  });

  const value = React.useMemo(() => [
    authentication, setAuthentication,
  ], [authentication, setAuthentication]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const [success, setSuccess] = React.useState(false);
  const [authentication, setAuthentication] = React.useContext(UserContext);

  /** @param {LoginDto} body */
  const login = async (body) => {
    try {
      const res = await ApiService.post('/auth/login', body);
      setAuthentication({
        auth: true,
        jwt: res.data.token,
      });
      sessionStorage.setItem('token', res.data.token);
    } catch (e) {
      throw new Error(`code ${e?.response?.status}`);
    }
  };

  /** @param {RegisterDto} body */
  const register = async (body) => {
    try {
      await ApiService.post('/auth/register', body);
    } catch (e) {
      throw new Error(`code ${e?.response?.status}`);
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('token');
    setAuthentication({
      auth: false,
      jwt: null,
    });
  };

  const checkAuth = async () => {
    const token = sessionStorage.getItem('token');
    if (token && !authentication.auth && !success) {
      setAuthentication({
        auth: true,
        jwt: token,
      });
    }
    setSuccess(true);
  };

  return {
    login,
    register,
    logout,
    isAuth: authentication.auth,
    token: authentication.jwt,
    checkAuth,
    success,
  };
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
