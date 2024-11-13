import { Navigate, Outlet } from "react-router-dom";
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ user, redirectTo, children }) => {
  if (user == null) return <Navigate replace to={redirectTo} />;
  return children ? children : <Outlet />;
};
ProtectedRoute.propTypes = {
  user: PropTypes.object,
  redirectTo: PropTypes.string.isRequired,
  children: PropTypes.node
};