import React, { useEffect, useState } from 'react'

import HomePrincipalImage from '../../assets/people.svg'
import TitlePage from '../../components/Titles'

import HeaderPage from '../../components/Header'
import LinkPage from '../../components/LinkPages'

import { Container, HomeImg, ContainerWelcome, Welcome } from './styles'
import QualityTestsADM from '../../components/QualityTestsADM'
import Plans from '../../components/Plans'

import api from '../../services/api'


function Home() {
  const [refreshTable, setRefreshTable] = useState([])
  const [tests, setTests] = useState([])
  const [machines, setmachines] = useState([])
  const [users, setusers] = useState([])
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('siger:userData'))
  )

  useEffect(() => {
    Promise.all([
      api.get('/tests'),
      api.get('/machines'),
      api.get('/users'),
    ]).then((responses) => {
      setTests(responses[0].data)
      setmachines(responses[1].data)
      setusers(responses[2].data)
    })
  }, [])

  return (
    <Container>
      <HeaderPage />

      <TitlePage>Home</TitlePage>
      <ContainerWelcome>
        <HomeImg src={HomePrincipalImage} alt="imagem da home"></HomeImg>
        <Welcome>
          <strong>
            Bem vindo ao Sintema integrado de gerenciamento em radioterapia,
            SIGER.
          </strong>
          <br></br>
          Com este software você poderá ter acesso a agenda dos testes de
          controle de qualidade das máquinas que existem em sua instituição médica.
          Navegue pelas páginas e construa seu planejamento!!!
        </Welcome>
      </ContainerWelcome>

      <Plans
        users={users}
        tests={tests}
        machines={machines}
        refresh={refreshTable}
      />
      <QualityTestsADM />

    </Container>
  )
}

export default Home
