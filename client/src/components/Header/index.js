import React from 'react'
import {
  Header,
  ImgLogoSuperior,
  ContainerRight,
  ImgUserIcon,
  ContainerLeft,
  ContainerMiddle,
  ContainerText,
  GetOutLink,
  Line,
} from './styles'

import LogoSiger from '../../assets/logoSiger.svg'
import LinkPage from '../LinkPages'

import { useUser } from '../../hooks/UserContext'

import { useHistory } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
function HeaderPage() {
  const { push } = useHistory()

  const user = localStorage.getItem('siger:userData')

  const { logout } = useUser()

  const logoutUser = () => {
    logout()
    push('/login')
  }

  return (
    <Header>
      <ContainerLeft>
        <h1>Sistema Integrado de gerenciamento em Radioterapia </h1>
      </ContainerLeft>

      <ContainerMiddle>
        <LinkPage />
      </ContainerMiddle>

      <ContainerRight>
        <Line />
        <ImgLogoSuperior src={LogoSiger} alt="Logo Siger" />
        <Avatar
          style={{
            backgroundColor: '#07bc0c',
          }}
          size="large"
          icon={<UserOutlined />}
        />
        <ContainerText>
          <p>Olá, {!!user && JSON.parse(user).name.split(' ', 1)}</p>
          <GetOutLink onClick={logoutUser}>Sair</GetOutLink>
        </ContainerText>
      </ContainerRight>
    </Header>
  )
}

export default HeaderPage
