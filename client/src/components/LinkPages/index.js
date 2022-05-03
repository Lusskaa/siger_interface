import React from 'react'
import { ContainerLinks, Link } from './styles'
import { useHistory } from 'react-router-dom'

function LinkPage() {
  const {
    push,
    location: { pathname },
  } = useHistory()

  const user = localStorage.getItem('siger:userData')

  return (
    <ContainerLinks>
      <Link
        className="links"
        onClick={() => push('/')}
        isActive={pathname === '/'}
      >
        Home
      </Link>

      <Link
        className="links"
        onClick={() => push('/createPlan')}
        isActive={pathname === '/createPlan'}
      >
        Planejamento
      </Link>

      {!!user && JSON.parse(user).isAdm && (
        <>
          <Link
            className="links"
            onClick={() => push('/cadDelMachines')}
            isActive={pathname === '/cadDelMachines'}
          >
            Máquinas
          </Link>

          <Link
            className="links"
            onClick={() => push('/cadDelTestes')}
            isActive={pathname === '/cadDelTestes'}
          >
            Testes
          </Link>

          <Link
            className="links"
            onClick={() => push('/upDelUsers')}
            isActive={pathname === '/upDelUsers'}
          >
            Usuários
          </Link>
        </>
      )}
    </ContainerLinks>
  )
}

export default LinkPage
