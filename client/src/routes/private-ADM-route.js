import React from 'react'
import { Route, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

function PrivateAdmRoute({ component, ...props }) {
  const user = localStorage.getItem('siger:userData')
  const history = useHistory()

  if (!user || !JSON.parse(user).isActive) {
    return history.push('/login')
  }

  if (!JSON.parse(user).isAdm) {
    toast.error(
      'Você não tem acesso a esta página, somente administradores podem entrar'
    )
    return history.push('/')
  }
  return <Route {...props} component={component} />
}

export default PrivateAdmRoute
