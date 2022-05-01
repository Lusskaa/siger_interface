import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { DatePicker, Switch, Popconfirm } from 'antd'

import {
  Container,
  ContainerItens,
  ContainerTests,
  ContainerTitles,
  P,
  Filters,
  ConteinerFilters,
  Block,
  Label,
  Select,
} from './styles'

import Trash from '../../assets/trash.svg'

import api from '../../services/api'

import Title from '../Titles'
import { toast } from 'react-toastify'

function QualityTestsADM({ refresh = false }) {
  const [tests, setTests] = useState()
  const [loading, setLoading] = useState(true)
  const user = localStorage.getItem('siger:userData')
  const [filters, setFilters] = useState({
    type: '',
    frequency: '',
  })

  useEffect(() => {
    api
      .get('/tests')
      .then(({ data }) => setTests(data))
      .finally(() => setLoading(false))
  }, [refresh])

  const filterType = async (type) => {
    setFilters({
      ...filters,
      type,
    })

    const { data: tests } = await api.get('/tests', {
      params: { ...filters, type },
    })
    setTests(tests)
  }

  const filterFrequency = async (frequency) => {
    setFilters({
      ...filters,
      frequency,
    })

    const { data: tests } = await api.get('/tests', {
      params: { ...filters, frequency },
    })
    setTests(tests)
  }

  async function deletetest(test_Id) {
    await api
      .delete(`/tests/${test_Id}`) // deletando no back

      .then(async () => {
        toast.success('Teste deletado com sucesso')

        const newTests = tests.filter((test) => test.id !== test_Id) // deletando no front

        setTests(newTests)
      })
  }

  return (
    <Container>
      <Title style={{ width: '600px' }}>
        {' '}
        Testes de controle de qualidade cadastrados
      </Title>

      <Filters>
        <p className="filtersTitle">Filtros</p>
        <ConteinerFilters>
          <Block>
            <Label>Tipo de teste</Label>
            <Select onChange={(event) => filterType(event.target.value)}>
              <option value={null} />
              <option>Dosimétrico</option>
              <option>Mecânico</option>
              <option>Gating respiratório</option>
              <option>Segurança</option>
            </Select>
          </Block>

          <Block>
            <Label>Frequência recomendada</Label>
            <Select onChange={(event) => filterFrequency(event.target.value)}>
              <option value={null} />
              <option>Diário</option>
              <option>Semanal</option>
              <option>Mensal</option>
              <option>Bimestral</option>
              <option>Trimestral</option>
              <option>Semestral</option>
              <option>Anual</option>
            </Select>
          </Block>
        </ConteinerFilters>
      </Filters>

      <ContainerTests>
        <ContainerTitles>
          <P style={{ fontWeight: '700' }}>Nome</P>
          <P style={{ fontWeight: '700' }}>Tipo</P>
          <P style={{ fontWeight: '700' }}>Tolerância</P>
          <P style={{ fontWeight: '700' }}>Frequência recomendada</P>
          <P style={{ fontWeight: '700' }}>Máquina recomendada</P>
          {JSON.parse(user).isAdm ? (
            <P style={{ fontWeight: '700', width: '50px' }}>Deletar</P>
          ) : (
            ''
          )}
        </ContainerTitles>
        {loading ? (
          <div>Carregando</div>
        ) : (
          <Carousel
            verticalMode
            itemsToShow={8}
            style={{ width: '90%', justifySelf: 'center' }}
          >
            {tests &&
              tests.map((test) => (
                <ContainerItens key={test.id}>
                  <P>{test.name}</P>
                  <P>{test.type}</P>
                  <P>{test.tolerance}</P>
                  <P>{test.recommendedFrequency}</P>
                  <P>{test.recommendedMachineType}</P>

                  {JSON.parse(user).isAdm ? (
                    <Popconfirm
                      title="Tem certeza que deseja remover o teste?"
                      onConfirm={() => deletetest(test.id)}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <button>
                        <img src={Trash} alt="lata de lixo" />
                      </button>
                    </Popconfirm>
                  ) : (
                    ''
                  )}
                </ContainerItens>
              ))}
          </Carousel>
        )}
      </ContainerTests>
    </Container>
  )
}

export default QualityTestsADM
