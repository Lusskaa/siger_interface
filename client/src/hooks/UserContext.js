import React, { createContext, useContext, useEffect, useState } from 'react'

/* import PropTypes from 'prop-types' */

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  //coloco meus dados aqui

  const [userData, setUserData] = useState({})
  const putUserData = async (userInfo) => {
    setUserData(userInfo)

    await localStorage.setItem('siger:userData', JSON.stringify(userInfo)) // colocando as infos dentro do local do computador do usuário
  }

  const logout = async () => {
    await localStorage.removeItem('siger:userData')
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('siger:userData')

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo)) // colocando dentro do set user data e varificando se ele realmente existe
      }
    }

    loadUserData()
  }, []) // adicionando o que temos no localstorage ao userData

  return (
    <UserContext.Provider value={{ putUserData, userData, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  // e aqui vou enviar para todas as apicações que estiverem em volta
  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }
  return context
}

/* UserProvider.propTypes ={
    children: PropTypes.node
} */
