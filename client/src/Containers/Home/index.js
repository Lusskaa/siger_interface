import React, { useEffect, useState} from "react";

import HomePrincipalImage from "../../assets/people.svg";
import TitlePage from "../../components/Titles";

import HeaderPage from "../../components/Header";
import LinkPage from "../../components/LinkPages";

import { Container, HomeImg, ContainerWelcome, Welcome } from "./styles";
import QualityTestsADM from "../../components/QualityTestsADM";
import Plans from "../../components/Plans";

import api from "../../services/api";



function Home() {

  const [refreshTable, setRefreshTable] = useState([]);
  const [tests, setTests] = useState([]);
  const [machines, setmachines] = useState([]);
  const [users, setusers] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("siger:userData"))
  );

  useEffect(() => {
    const promises = [api.get("/tests"), api.get("/machines")];
    if (!!currentUser.isAdm) {
      promises.push(api.get("/users"));
    }

    Promise.all(promises).then((responses) => {
      setTests(responses[0].data);
      setmachines(responses[1].data);

      if (!!currentUser.isAdm) {
        setusers(responses[2].data);
      }
    });
  }, []);

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

      

      <Plans
          users={users}
          tests={tests}
          machines={machines}
          refresh={refreshTable}
        />
      <QualityTestsADM/>
    </Container>
  );
}

export default Home;
