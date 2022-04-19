import React from "react"
import {Header, ImgLogoSuperior} from './styles'

import LogoSiger from '../../assets/logoSiger.svg'

function HeaderPage () {
    return  (
        <Header> 
            <h1>Sistema Integrado de gerenciamento em Radioterapia </h1>

            <ImgLogoSuperior src={LogoSiger} alt="Logo Siger" />
        </Header>  
    )
}

export default HeaderPage