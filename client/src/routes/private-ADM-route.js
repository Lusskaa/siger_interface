import React from "react";
import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

function PrivateAdmRoute({ component, ...props }) {
  const user = localStorage.getItem("siger:userData");

  if (!JSON.parse(user).isAdm) {
    toast.error(
      "Você não tem acesso a esta página, somente administradores podem entrar"
    );
    return <Redirect to="/" />;
  }
  return <Route {...props} component={component} />;
}

export default PrivateAdmRoute;
