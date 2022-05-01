import React from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import Button from '../../components/Button'

import { useUser } from '../../hooks/UserContext'

import LogoSiger from '../../assets/logoSiger.svg'
import LogoUnb from '../../assets/logoUnB.svg'
import LogoIf from '../../assets/logoIF.svg'
import LogoHub from '../../assets/logoHub.svg'
import {
  Body,
  Header,
  ImgLogoSuperior,
  Main,
  ImgLogo,
  ContainerItens,
  Input,
  SignInLink,
  Footer,
  ContainerImages,
  ErrorMessage,
} from './styles'

function Login() {
  const history = useHistory()

  const { putUserData, userData } = useUser()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 dígitos'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (clientData) => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password,
      }),
      {
        pending: 'Verificando usuário 🤔',
        success: 'Seja bem vindo(a) ao Siger 🎉',
        error: 'Verifique seu E-mail e senha',
      }
    )

    if (!data.isActive) {
      toast.warning(
        'Aguarde até que um admin da sua instituição valide seu acesso'
      )
    }

    putUserData(data)
    setTimeout(() => {
      history.push('/')
    }, 1000)
  }
  return (
    <Body>
      <Header>
        <h1>Sistema Integrado de gerenciamento em Radioterapia </h1>

        <ImgLogoSuperior src={LogoSiger} alt="Logo Siger" />
      </Header>

      <Main>
        <ImgLogo src={LogoSiger} alt="Logo Siger" />

        <ContainerItens>
          <h2 className="logintext">Fazer Login</h2>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="E-mail"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <ErrorMessage>{errors.email?.message}</ErrorMessage>

            <Input
              placeholder="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />

            <ErrorMessage>{errors.password?.message}</ErrorMessage>

            <Button type="submit">Login</Button>
          </form>

          <SignInLink>
            {' '}
            Não possui uma conta?{' '}
            <Link style={{ color: '#0D0D0D' }} to="/cadastro">
              {' '}
              <strong>Sign up</strong>
            </Link>
          </SignInLink>
        </ContainerItens>
      </Main>

      <Footer>
        <h4>Colaboradores</h4>

        <ContainerImages>
          <img src={LogoUnb} alt="Logo Unb" />
          <img src={LogoHub} alt="Logo Hub" />
          <img src={LogoIf} alt="Logo If" />
        </ContainerImages>
      </Footer>
    </Body>
  )
}
export default Login
