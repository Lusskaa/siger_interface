import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component, ...props }) {
  const user = localStorage.getItem('siger:userData')

  if (!user || !JSON.parse(user).isActive) {
    return <Redirect to="login" />
  }

  return <Route {...props} component={component} />
}

export default PrivateRoute
