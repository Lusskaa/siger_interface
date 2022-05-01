import React from 'react'
import { Route, useHistory } from 'react-router-dom'

function PrivateRoute({ component, ...props }) {
  const user = localStorage.getItem('siger:userData')
  const history = useHistory()

  if (!user || !JSON.parse(user).isActive) {
    return history.push('/login')
  }
  return <Route {...props} component={component} />
}

export default PrivateRoute
