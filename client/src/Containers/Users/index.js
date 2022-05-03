import React, { useEffect, useState } from 'react'
import Trash from '../../assets/trash.svg'

import {Popconfirm} from 'antd' // Popover

import onIcon from '../../assets/onIcon.svg'
import offIcon from '../../assets/offIcon.svg'

import Carousel from 'react-elastic-carousel'

import HeaderPage from '../../components/Header'

import api from '../../services/api'

import { Title } from '../../components/Titles/styles'

import {
  Body,
  Main,
  Container,
  ContainerTests,
  ContainerTitles,
  P,
  ContainerCarousel,
} from './styles'

function UpdateAndDeleteUsers() {
  const [users, setusers] = useState()

  useEffect(() => {
    async function loadUsers() {
      const { data } = await api.get('/users')
      setusers(data)
    }
    loadUsers()
  }, [])
  async function deleteUser(user_Id) {
    // Tentar colocar mensagem de erro para quando deletar um isADm

    await api.delete(`/users/${user_Id}`) // deletando no back

    const newusers = users.filter((user) => user.id !== user_Id) // deletando no front

    setusers(newusers)
  }

  async function setStatus(user_Id, allUsers) {
    await api.patch(`/users/${user_Id}/status`) // atualizando no back

    const { data } = await api.get('/users')
    setusers(data)
  }

  return (
    <Body>
      <HeaderPage />

      <Main>
        <Container>
          <Title style={{ width: '350px' }}> Ativar e deletar usuários</Title>

          <ContainerTests>
            <ContainerTitles>
              <P style={{ fontWeight: '700' }}>Nome</P>
              <P style={{ fontWeight: '700' }}>E-mail</P>
              <P style={{ fontWeight: '700', width: '80px' }}>Opções</P>
            </ContainerTitles>
            <Carousel
              verticalMode
              itemsToShow={8}
              style={{ width: '90%', justifySelf: 'center' }}
            >
              {users &&
                users.map((user) => (
                  <ContainerCarousel key={user.id}>
                    <P>{user.name}</P>
                    <P>{user.email}</P>
                    <P>
                      <button onClick={() => setStatus(user.id)}>
                        {user.isActive ? (
                          <img
                            className="addIcon" // check verde ou icone que deixe claro que está ativado
                            src={onIcon}
                            alt="add icon"
                          />
                        ) : (
                          <img
                            className="addIcon" // X vermelho ou icone que deixe claro que está ativado
                            src={offIcon}
                            alt="add icon"
                          />
                        )}
                      </button>

                      <Popconfirm
                        title="Tem certeza que deseja remover este usuário? Todos os testes destinados a ele serão removidos"
                        onConfirm={() => deleteUser(user.id)}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <button className="trash-btn">
                          <img src={Trash} alt="lata de lixo" />
                        </button>
                      </Popconfirm>

                    </P>
                  </ContainerCarousel>
                ))}
            </Carousel>
          </ContainerTests>
        </Container>
      </Main>
    </Body>
  )
}
export default UpdateAndDeleteUsers
