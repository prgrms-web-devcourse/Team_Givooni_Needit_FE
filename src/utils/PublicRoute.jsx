import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
  const isLogin = !!localStorage.getItem("needit_access_token");
  return !isLogin ? children : <Navigate to="/user" />;
};
export default PublicRoute;

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
