import React, { useState, useEffect } from 'react'

import { DatePicker, Switch, Popconfirm } from 'antd' // Popover
import moment from 'moment'
import Trash from '../../assets/trash.svg'
import checkTrue from '../../assets/checkTrue.svg'
import checkNull from '../../assets/checkNull.svg'

import { toast } from 'react-toastify'

import {
  Label,
  Select,
  Container,
  ContainerCarousel,
  ContainerPlans,
  ContainerTitles,
  P,
  Filters,
  Block,
  ConteinerFilters,
} from './styles'

import Carousel from 'react-elastic-carousel'

import api from '../../services/api'

import Title from '../../components/Titles'

function Plans({ users, tests, machines, refresh }) {
  const { RangePicker } = DatePicker

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('siger:userData'))
  )

  const [loading, setLoading] = useState([])
  const [plans, setPlans] = useState([])
  const [filters, setFilters] = useState({
    dates: [],
    user: '',
    test: '',
    machine: '',
  })

  useEffect(() => {
    api
      .get('/plans')
      .then(({ data }) => setPlans(data))
      .finally(() => setLoading(false))
  }, [refresh])

  const filterDates = async (dates) => {
    const start = dates && dates.length ? dates[0].format('YYYY-MM-DD') : null
    const end = dates && dates.length ? dates[1].format('YYYY-MM-DD') : null
    setFilters({
      ...filters,
      start,
      end,
    })

    const { data: plans } = await api.get('/plans/', {
      params: { ...filters, start, end },
    })
    setPlans(plans)
  }
  const filterUser = async (user) => {
    setFilters({
      ...filters,
      user,
    })

    const { data: plans } = await api.get('/plans/', {
      params: { ...filters, user },
    })
    setPlans(plans)
  }
  const filterTest = async (test) => {
    setFilters({
      ...filters,
      test,
    })

    const { data: plans } = await api.get('/plans/', {
      params: { ...filters, test },
    })
    setPlans(plans)
  }
  const filterMachine = async (machine) => {
    setFilters({
      ...filters,
      machine,
    })

    const { data: plans } = await api.get('/plans/', {
      params: { ...filters, machine },
    })
    setPlans(plans)
  }

  async function deletePlan(plan) {
    await api
      .delete(
        `${!!currentUser.isAdm ? `/users/${plan.users_id}` : ''}/plans/${
          plan.id
        }`
      )
      .then(async () => {
        toast.success('Plano removido com sucesso')

        const { data: plans } = await api.get('/plans/', {
          params: filters,
        })
        setPlans(plans)
      })
  }

  async function setPlanStatus(plan) {
    await api
      .patch(
        `${!!currentUser.isAdm ? `/users/${plan.users_id}` : ''}/plans/${
          plan.id
        }/status`
      )
      .then(async () => {
        toast.success(
          `Teste ${plan.status ? 'desfeito' : 'realizado'} com sucesso`
        )

        const { data: plans } = await api.get('/plans/', {
          params: filters,
        })
        setPlans(plans)
      })
  }

  return (
    <Container>
      <Title>Planejamentos</Title>

      <Filters>
        <p className="filtersTitle">Filtros</p>
        <ConteinerFilters>
          <Block>
            <Label>Datas</Label>
            <RangePicker
              format="DD/MM/YYYY"
              onChange={filterDates}
              className="RangerPicker"
            />
          </Block>
          <Block>
            <Label>Usuário</Label>
            <Select onChange={(event) => filterUser(event.target.value)}>
              <option value={null} />
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </Select>
          </Block>

          <Block>
            <Label>Testes</Label>
            <Select onChange={(event) => filterTest(event.target.value)}>
              <option value={null} />
              {tests &&
                tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.name}
                  </option>
                ))}
            </Select>
          </Block>

          <Block>
            <Label>Máquina</Label>
            <Select onChange={(event) => filterMachine(event.target.value)}>
              <option value={null} />
              {machines &&
                machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
            </Select>
          </Block>
        </ConteinerFilters>
      </Filters>
      <ContainerPlans>
        <ContainerTitles>
          <P style={{ fontWeight: '700' }}>Usuário</P>
          <P style={{ fontWeight: '700' }}>Teste</P>
          <P style={{ fontWeight: '700' }}>Tolerância</P>
          <P style={{ fontWeight: '700' }}>Máquina</P>
          <P style={{ fontWeight: '700' }}>Data</P>
          <P style={{ fontWeight: '700' }}>Feito?</P>
          <P style={{ fontWeight: '700' }}>Opções</P>
        </ContainerTitles>

        {loading ? (
          <div>Carregando</div>
        ) : (
          <Carousel
            verticalMode
            itemsToShow={8}
            style={{ width: '90%', justifySelf: 'center' }}
          >
            {plans.length != 0 &&
              plans.map((plan) => (
                <ContainerCarousel key={plan.id}>
                  <P>{plan.users.name}</P>
                  <P>{plan.tests.name}</P>
                  <P>{plan.tests.tolerance}</P>
                  <P>{plan.machines.name}</P>
                  <P>{moment(plan.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</P>
                  <P>
                    {(!!currentUser.isAdm ||
                      currentUser.id === plan.users_id) && (
                      <Popconfirm
                        title={`Tem certeza que deseja ${
                          plan.status ? 'desfazer' : 'realizar'
                        } este teste?`}
                        onConfirm={() => setPlanStatus(plan)}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <Switch checked={plan.status} />
                      </Popconfirm>
                    )}
                  </P>

                  <P>
                    {(!!currentUser.isAdm ||
                      currentUser.id === plan.users_id) && (
                      <Popconfirm
                        title="Tem certeza que deseja remover o plano?"
                        onConfirm={() => deletePlan(plan)}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <button className="trash-btn">
                          <img src={Trash} alt="lata de lixo" />
                        </button>
                      </Popconfirm>
                    )}
                  </P>
                </ContainerCarousel>
              ))}
          </Carousel>
        )}
      </ContainerPlans>
    </Container>
  )
}

export default Plans
