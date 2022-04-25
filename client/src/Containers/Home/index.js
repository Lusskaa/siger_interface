import React from "react";

import HomePrincipalImage from "../../assets/people.svg";
import TitlePage from "../../components/Titles";

import HeaderPage from "../../components/Header";
import LinkPage from "../../components/LinkPages";

import { Container, HomeImg, ContainerWelcome, Welcome } from "./styles";
import QualityTestsADM from "../../components/QualityTestsADM";
import Plans from "../../components/Plans";


function Home() {
  return (
    <Container>
      <HeaderPage />
      <LinkPage />

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
          controle de qualidade das máquinas que possuem em sua instituição.
          Basta escolher o teste cadastrado, a máquina e a frequência ao qual o
          teste deve ser feito.
        </Welcome>
      </ContainerWelcome>

      

      <Plans/>
      <QualityTestsADM/>
    </Container>
  );
}

export default Home;
