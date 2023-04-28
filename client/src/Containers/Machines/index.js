import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Popconfirm } from 'antd'
import Trash from '../../assets/trash.svg'

import Carousel from 'react-elastic-carousel'

import api from '../../services/api'

import Button from '../../components/Button'
import TitlePage from '../../components/Titles'
import HeaderPage from '../../components/Header'

import { Title } from '../../components/Titles/styles'

import LogoSiger from '../../assets/logoSiger.svg'

import {
  Body,
  Main,
  ImgLogo,
  ContainerItens,
  Input,
  ErrorMessage,
  ContainerRegister,
  Lable,
  Select,
  Container,
  ContainerMachines,
  ContainerTitles,
  P,
  ContainerCarousel,
} from './styles'

function RegisterAndDeleteMachines() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    type: Yup.string().required(
      'O tipo de tratamento que a máquina executa é obrigatório'
    ),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (machineData) => {
    const { status } = await api.post(
      '/machines',
      {
        name: machineData.name,
        type: machineData.type,
      },
      { validateStatus: () => true }
    )

    if (status === 201 || status === 200) {
      toast.success('Máquina criada com sucesso')
    }

    const { data } = await api.get('/machines')
    setmachines(data)
    reset()
  }

  const [machines, setmachines] = useState()

  useEffect(() => {
    async function loadMachines() {
      const { data } = await api.get('/machines')
      setmachines(data)
    }
    loadMachines()
  }, [])
  async function deletemachine(machine_Id) {
    await api
      .delete(`/machines/${machine_Id}`) // deletando no back
      .then(async () => {
        toast.success('Máquina deletada com sucesso')

        const newMachines = machines.filter(
          (machine) => machine.id !== machine_Id
        ) // deletando no front

        setmachines(newMachines)
      })
  }

  return (
    <Body>
      <HeaderPage />

      <Main>
        <TitlePage style={{ width: '400px' }}>
          Cadastrar e excluir Máquinas
        </TitlePage>

        <ContainerRegister>
          <ContainerItens>
            <h2 className="logintext">Nova máquina</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Lable>Nome</Lable>
              <Input
                type="text"
                placeholder="Nome da máquina. ex: Acelerador linear sala x"
                {...register('name')}
                error={errors.name?.message}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>

              <Lable>Tipo de tratamento</Lable>

              <Select {...register('type')} error={errors.type?.message}>
                <option />
                <option>3D</option>
                <option>IMRT</option>
                <option>SRS/SBRT</option>
                <option>TODAS</option>
                <option>OUTRA</option>
              </Select>
              <ErrorMessage>{errors.type?.message}</ErrorMessage>

              <Button type="submit" style={{ alignSelf: 'flex-start' }}>
                Cadastrar
              </Button>
            </form>
          </ContainerItens>

          <ImgLogo src={LogoSiger} alt="Logo Siger" />
        </ContainerRegister>

        <Container>
          <Title style={{ width: '350px' }}> Máquinas Cadastradas</Title>

          <ContainerMachines>
            <ContainerTitles>
              <P style={{ fontWeight: '700' }}>Nome</P>
              <P style={{ fontWeight: '700' }}>Tipo</P>
              <P style={{ fontWeight: '700', width: '45px' }}>Deletar</P>
            </ContainerTitles>
            <Carousel
              verticalMode
              itemsToShow={3}
              style={{ width: '90%', justifySelf: 'center' }}
            >
              {machines &&
                machines.map((machine) => (
                  <ContainerCarousel key={machine.id}>
                    <P>{machine.name}</P>
                    <P>{machine.type}</P>

                    <Popconfirm
                      title="Tem certeza que deseja remover esta máquina? Ao remove-la
                      todos os planos criados com ela também serão removidos"
                      onConfirm={() => deletemachine(machine.id)}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <button>
                        <img src={Trash} alt="lata de lixo" />
                      </button>
                    </Popconfirm>
                  </ContainerCarousel>
                ))}
            </Carousel>
          </ContainerMachines>
        </Container>
      </Main>
    </Body>
  )
}
export default RegisterAndDeleteMachines
