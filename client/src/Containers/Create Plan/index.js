import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Carousel from "react-elastic-carousel";

import api from "../../services/api";

import Title from "../../components/Titles";

import HeaderPage from "../../components/Header";
import LinkPage from "../../components/LinkPages";

import Button from "../../components/Button";
import TitlePage from "../../components/Titles";

import LogoSiger from "../../assets/logoSiger.svg";

import {
  Body,
  Main,
  ImgLogo,
  ContainerItens,
  ErrorMessage,
  ContainerRegister,
  Lable,
  Select,
  Container,
  ContainerCarousel,
  ContainerTests,
  ContainerTitles,
  P,
} from "./styles";

function PlanCalendar() {
  const schema = Yup.object().shape({
    name: Yup.string().required("O seu nome é obrigatório"),
    replay: Yup.string().required("A Tolerância é obrigatória"),
    date: Yup.date().required("O tipo de teste é obrigatório"),
    frequency: Yup.string().required(
      "A frequência recomendada do teste é obrigatória"
    ),
    machine: Yup.string().required(
      "A recomendação de máquina é obrigatória"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (planData) => {

// Ccolocar o while


/*     console.log(JSON.stringify(planData, null, 2)); */
    try {
      const { status } = await api.post(
        "/plans",
        {
          /*                 name: testData.name,
                type: testData.type,
                recommendedfrequency: testData.recommendedfrequency,
                recommendedmachine: testData.recommendedmachine,
                tolerance: testData.tolerance,
                isfunctional: testData.isfunctional */
        },
        { validateStatus: () => true }
      );

      if (status === 201 || status === 200) {
        toast.success("Teste criado com sucesso");
      } else if (status === 409) {
        toast.error(
          "Teste já cadastrado, para o mesmo nome nem a tolerância nem a frequência deve ser a mesma"
        );
      } else {
        throw new Error();
      }

      const { data } = await api.get("/tests");
      setTests(data);
    } catch (err) {
      toast.error("Falha no sistema, tente novamente");
    }
  };

  const [tests, setTests] = useState();
  const [machines, setmachines] = useState();
  const [users, setusers] = useState();

  useEffect(() => {
    async function loadTests() {
      const { data } = await api.get("/tests");
      setTests(data);
    }
    loadTests();

    async function loadMachines() {
      const { data } = await api.get("/machines");
      setmachines(data);
    }
    loadMachines();

    async function loadUsers() {
      const { data } = await api.get("/users");
      setusers(data);
    }
    loadUsers();
  }, []);

  return (
    <Body>
      <HeaderPage />
      <LinkPage />

      <Main>
        <Link to="/" className="home">
          <strong>Voltar para Home</strong>
        </Link>
        <TitlePage style={{ width: "400px" }}>Cadastrar planos</TitlePage>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <ContainerRegister>
            <ContainerItens>
              <h2 class="logintext">Planejamento de testes</h2>

              <Lable>Usuário responsável</Lable>

              <Select {...register("name")} error={errors.name?.message}>
                <option />
                {users &&
                  users.map((user) => (
                    <option value={user.id}>{user.name}</option>
                  ))}
              </Select>
              <ErrorMessage>{errors.name?.message}</ErrorMessage>

              <Lable>Máquina selecionada</Lable>

              <Select
                {...register("machine")}
                error={errors.choiceMachine?.message}
              >
                <option />
                {machines &&
                  machines.map((machine) => (
                    <option value={machine.id}>{machine.name}</option>
                  ))}
              </Select>
              <ErrorMessage>{errors.choiceMachine?.message}</ErrorMessage>
            </ContainerItens>

            <ImgLogo src={LogoSiger} alt="Logo Siger" />
          </ContainerRegister>

          <Container>
            <Title style={{ width: "600px" }}>
              {" "}
              Selecione os testes de controle de qualidade e insira as
              informações
            </Title>

            <ContainerTests>
              <ContainerTitles>
                <P style={{ fontWeight: "700", margin: "0 10px" }}>Nome</P>
                <P style={{ fontWeight: "700", margin: "0 10px" }}>Tipo</P>
                <P style={{ fontWeight: "700", margin: "0 10px" }}>
                  Tolerância
                </P>
                <P style={{ fontWeight: "700", margin: "0 10px" }}>
                  Frequência recomendada
                </P>
                <P style={{ fontWeight: "700", margin: "0 10px" }}>Data base</P>
                <P style={{ fontWeight: "700", margin: "0 10px" }}>
                  Frequência de x em x dias
                </P>
                <P style={{ fontWeight: "700", margin: "0 10px" }}>
                  Número de repetições
                </P>
              </ContainerTitles>
              <Carousel
                verticalMode
                itemsToShow={8}
                style={{ width: "80em", justifySelf: "center" }}
              >
                {tests &&
                  tests.map((test) => (
                    <ContainerCarousel key={test.id}>
                      <P>{test.name}</P>
                      <P>{test.type}</P>
                      <P>{test.tolerance}</P>
                      <P>{test.recommendedfrequency}</P>
                      <input type="date" {...register("date")}></input>
                      <input
                        type="number"
                        placeholder="Dias"
                        {...register("frequency")}
                      ></input>
                      <input
                        type="number"
                        placeholder="Repetições"
                        {...register("replay")}
                      ></input>
                    </ContainerCarousel>
                  ))}
              </Carousel>
            </ContainerTests>
          </Container>

          <Button style={{ width: "800px" }} type="submit">
            Cadastrar
          </Button>
        </form>
      </Main>
    </Body>
  );
}
export default PlanCalendar;
