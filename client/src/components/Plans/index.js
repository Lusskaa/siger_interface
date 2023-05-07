import React, { useState, useEffect } from 'react'

import { DatePicker, Switch, Popconfirm, Popover, Alert, Radio, Input, Typography } from 'antd' // Popover
const { Option } = Select
import moment from 'moment'
import Trash from '../../assets/trash.svg'
import Check from '../../assets/checkTrue.svg'
import Info from '../../assets/infoIcon.svg'
import Button from '../../components/Button'

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
  ContainerUpdate,
  ColumnName,
} from './styles'

import Carousel from 'react-elastic-carousel'

import api from '../../services/api'

import Title from '../../components/Titles'

function Plans({ users, tests, machines, refresh }) {
  const { RangePicker } = DatePicker
  const { TextArea } = Input;
  const { Paragraph } = Typography;

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('siger:userData'))
  )

  const [loading, setLoading] = useState([])
  const [plans, setPlans] = useState([])

  const [plansUpdate, setPlansUpdate] = useState('')
  const [planResults, setplanResults] = useState('')


  const [filters, setFilters] = useState({
    dates: [],
    user: '',
    test: '',
    machine: '',
    status: '',
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
  const filterStatus = async (status) => {
    setFilters({
      ...filters,
      status,
    })

    const { data: plans } = await api.get('/plans/', {
      params: { ...filters, status },
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
    {
      /* console.log(plansUpdate) */
    }
    const planSituation = plansUpdate
    /* console.log(planSituation + planResults) */



    
    await api
      .patch(
        `${!!currentUser.isAdm ? `/users/${plan.users_id}` : ''}/plans/${
          plan.id
        }/${planSituation}/${planResults}/status`
      )
      .then(async () => {
        toast.success(
          `
          Teste computado com sucesso!!!
          
          ${
            plansUpdate === 'APROVADO'
              ? 'O teste está dentro dos parâmetros'
              : ''
          }
          ${
            plansUpdate === 'ATENÇÃO-PERTO DA TOLERÂNCIA'
              ? '⚠️Cuidado, o teste está dentro dos parâmeros, mas está perto dos limites de tolerância'
              : ''
          }
          ${
            plansUpdate === 'REPROVADO'
              ? '🔴🔴🔴🔴ATENÇÃO o TESTE ESTÁ FORA dos parâmetros de tolerância, AJUSTE E REFAÇA'
              : ''
          }

          `
        )

        const { data: plans } = await api.get('/plans/', {
          params: filters,
        })
        setPlans(plans)
      })
  }

  return (
    <Container>
      <ContainerPlans>
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
            <Block>
              <Label>Status</Label>
              <Select onChange={(event) => filterStatus(event.target.value)}>
                <option value={null} />
                <option value={true}>Feito</option>
                <option value={false}>Ainda não realizado</option>
              </Select>
            </Block>
          </ConteinerFilters>
        </Filters>

        <ContainerTitles>
          <ColumnName style={{ width: '150px' }}>Usuário</ColumnName>
          <ColumnName style={{ width: '150px' }}>Teste</ColumnName>
          <ColumnName style={{ width: '150px' }}>Máquina</ColumnName>
          <ColumnName style={{ width: '75px' }}>Data</ColumnName>
          <ColumnName style={{ width: '50px' }}>Feito?</ColumnName>
          <ColumnName style={{ width: '100px' }}>Resultado</ColumnName>
          <ColumnName style={{ width: '150px' }}>Opções</ColumnName>
        </ContainerTitles>

        {loading ? (
          <div>Carregando</div>
        ) : (
          <Carousel
            verticalMode
            itemsToShow={8}
            style={{ width: '80em', justifySelf: 'center' }}
          >
            {plans.length != 0 &&
              plans.map((plan) => (
                <ContainerCarousel
                  key={plan.id}
                  isDone={moment(plan.date) < moment() && !plan.status}
                >
                  {moment(plan.date) < moment() && !plan.status ? (
                    <Alert
                      message="Teste Pendente"
                      type="warning"
                      showIcon
                      closable
                      className="alert"
                    />
                  ) : (
                    ''
                  )}

                  <Popover
                    content={
                      <>
                        <p>
                          {' '}
                          {moment(plan.updatedAt, 'YYYY-MM-DD').format(
                            'DD/MM/YYYY'
                          )}
                        </p>
                      </>
                    }
                    title="Última atualização"
                    trigger="hover"
                  >
                    <button className="infoIcon" style={{ margin: '0 10px' }}>
                      {plan.users.name}
                    </button>
                  </Popover>

                  <Popover
                    content={
                      <>
                        <p>Tolerância: {plan.tests.tolerance}</p>
                        <p>Tipo: {plan.tests.type}</p>
                        <p>
                          Frequência recomendada:{' '}
                          {plan.tests.recommendedFrequency}
                        </p>
                        <p>
                          Tipo de tratamento da máquina:{' '}
                          {plan.tests.recommendedMachineType}
                        </p>
                        <p>
                          Parâmetros a serem medidos:{' '}
                          <Paragraph copyable>{plan.tests.description}</Paragraph>
                        </p>
                      </>
                    }
                    title="Informações"
                    trigger="hover"
                  >
                    <button className="infoIcon" style={{ margin: '0 10px' }}>
                      {/* <img style={{width: '20px'}} src={Info} alt="info icon" /> */}
                      {plan.tests.name} 
                    </button>
                  </Popover>

                  {/* </P> */}

                  <P style={{width: '150px'}}>{plan.machines.name}</P>
                  <P>{moment(plan.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</P>

                  <P style={{ width: '50px' }}>
                    {/*                   {(!!currentUser.isAdm ||
                      currentUser.id === plan.users_id) && (
                    )} */}
                    {plan.status ? (
                      <img
                        className="addIcon" // check verde ou icone que deixe claro que está ativado
                        src={Check}
                        alt="add icon"
                      />
                    ) : (
                      '-'
                    )}
                  </P>

                  {!!plan.situation ? (
                    <P  highlight={plan.situation} style={{ width: '100px', fontWeight: '700' }}> {plan.situation} </P>
                  ) : (
                    <P style={{ width: '100px' }}>-</P>
                  )}

                  {!!currentUser.isAdm || currentUser.id === plan.users_id ? (
                    <P>
                      <Popconfirm
                        title="Tem certeza que deseja enviar este teste?
                        Ao confirmar não será mais possível mudar sua opção."
                        onConfirm={() => setPlanStatus(plan)}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <Button
                          disabled={plan.status || plansUpdate == '' || planResults == ''}
                          className={'submit'}
                        >
                          Enviar
                        </Button>
                      </Popconfirm>
                    </P>
                  ) : (
                    <P style={{ width: '90px' }}></P>
                  )}

                  {!!currentUser.isAdm /* ||
                      currentUser.id === plan.users_id */ && (
                    <P style={{ width: '50px' }}>
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
                    </P>
                  )}
                </ContainerCarousel>
              ))}
          </Carousel>
        )}
      </ContainerPlans>

      <ContainerUpdate>
        <Title className="update-title">Atualize o resultado do teste</Title>

        <p className="text-update">
        Antes de enviar os resultados, certifique-se de adicionar os <b>valores numéricos com ordem de grandeza correta</b> ao preencher o <b>input de texto</b>. Para enviar os resultados de cada teste, selecione a resposta que melhor se adequa ao <b>regime de tolerância</b> e clique no botão "enviar".
        
        </p>
        <Radio.Group
          className="radio-group"
          onChange={(event) => setPlansUpdate(event.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value={'APROVADO'}>APROVADO</Radio.Button>
          <Radio.Button style={{ display: 'table'}} value={'ATENÇÃO-PERTO DA TOLERÂNCIA'}>
            ATENÇÃO-PERTO DA TOLERÂNCIA
          </Radio.Button>
          <Radio.Button value={'REPROVADO'}>REPROVADO</Radio.Button>
        </Radio.Group>
        <TextArea
      showCount
      maxLength={100}
      className="TextArea"
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          setplanResults(planResults + '&');
        }
      }}
      onChange={(event) => setplanResults(event.target.value)}
      placeholder="Exemplo padrão:
      Variável: valor unidade
      X1: 5 cm
      X2: 5.1 cm
      Y1: 4.9 cm
      Y2: 5 cm
      "
      value={planResults}
      
    />

      </ContainerUpdate>
    </Container>
  )
}

export default Plans
