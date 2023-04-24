import React, { useEffect, useState } from 'react'

import HomePrincipalImage from '../../assets/people.svg'
import TitlePage from '../../components/Titles'

import HeaderPage from '../../components/Header'
import LinkPage from '../../components/LinkPages'

import { Container, HomeImg, ContainerWelcome, Welcome } from './styles'
import QualityTestsADM from '../../components/QualityTestsADM'
import ReportPlansGrid from '../../components/ReportPlansGrid'

import api from '../../services/api'


function ReportPlansPDF() {
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
      <HeaderPage/>

      <TitlePage style={{ width: '500px' }}>Registro geral de testes para relatório
      </TitlePage>
      <ContainerWelcome>
        
        <Welcome>
          Esta página contém todos os testes já realizados e programados
          das máquinas registradas. Para gerar um arquivo PDF, com as informações 
          desejadas, utilize os filtros abaixo e em seguida clique no botão gerar PDF.
        </Welcome>
      </ContainerWelcome>
      

      <ReportPlansGrid
        users={users}
        tests={tests}
        machines={machines}
        refresh={refreshTable}
      />

    </Container>
  )
}

export default ReportPlansPDF
