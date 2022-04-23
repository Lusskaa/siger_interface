import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Carousel from "react-elastic-carousel";

import Trash from "../../assets/trash.svg";

import api from "../../services/api";

import Title from "../../components/Titles";

import { useHistory } from "react-router-dom";

import HeaderPage from "../../components/Header";
import LinkPage from "../../components/LinkPages";

import Button from "../../components/Button";
import TitlePage from "../../components/Titles";
import QualityTestsADM from "../../components/QualityTestsADM";

import LogoSiger from "../../assets/logoSiger.svg";

import {
  Body,
  Header,
  ImgLogoSuperior,
  Main,
  ImgLogo,
  ContainerItens,
  Input,
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

function RegisterAndDeleteTests() {
  const schema = Yup.object().shape({
    name: Yup.string().required("O seu nome é obrigatório"),
    tolerance: Yup.string().required("A Tolerância é obrigatória"),
    type: Yup.string().required("O tipo de teste é obrigatório"),
    recommendedFrequency: Yup.string().required(
      "A frequência recomendada do teste é obrigatória"
    ),
    recommendedMachineType: Yup.string().required(
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

  const onSubmit = async (testData) => {
    try {
      const { status } = await api.post(
        "tests",
        {
          name: testData.name,
          type: testData.type,
          recommendedFrequency: testData.recommendedFrequency,
          recommendedMachineType: testData.recommendedMachineType,
          tolerance: testData.tolerance,
          isfunctional: testData.isfunctional,
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

  useEffect(() => {
    async function loadTests() {
      const { data } = await api.get("/tests");
      setTests(data);
    }
    loadTests();
  }, []);
  async function deletetest(test_Id) {
    await api.delete(`/tests/${test_Id}`); // deletando no back

    const newTests = tests.filter((test) => test.id !== test_Id); // deletando no front

    setTests(newTests);
  }

  return (
    <Body>
      <HeaderPage />
      <LinkPage />

      <Main>
        <Link to="/" className="home">
          <strong>Voltar para Home</strong>
        </Link>
        <TitlePage style={{ width: "400px" }}>
          Cadastrar e excluir testes (QT)
        </TitlePage>

        <ContainerRegister>
          <ContainerItens>
            <h2 className="logintext">Novo Teste</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Lable>Nome</Lable>
              <Input
                type="text"
                placeholder="Nome do teste"
                {...register("name")}
                error={errors.name?.message}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>

              <Lable>Tipo</Lable>

              <Select {...register("type")} error={errors.type?.message}>
                <option>Dosimétrico</option>
                <option>Mecânico</option>
                <option>Gating respiratório</option>
                <option>Segurança</option>
              </Select>
              <ErrorMessage>{errors.type?.message}</ErrorMessage>

              <Lable>Frequência Recomendada</Lable>
              <Input
                placeholder="Diário, Semanal, Mensal, Anual"
                type="text"
                {...register("recommendedFrequency")}
                error={errors.recommendedFrequency?.message}
              />
              <ErrorMessage>
                {errors.recommendedFrequency?.message}
              </ErrorMessage>

              <Lable> Maquina recomendada </Lable>

              <Select
                {...register("recommendedMachineType")}
                error={errors.recommendedMachineType?.message}
              >
                <option>Non-IMRT</option>
                <option>IMRT</option>
                <option>SRS/SBRT</option>
              </Select>
              <ErrorMessage>{errors.recommendedMachineType?.message}</ErrorMessage>

              <Lable>Tolerância</Lable>
              <Input
                placeholder="Coloque aqui a(s) tolerância(s) de seu teste"
                type="text"
                {...register("tolerance")}
                error={errors.tolerance?.message}
              />
              <ErrorMessage>{errors.tolerance?.message}</ErrorMessage>

              <Lable>
                O teste é funcional? Se for, marque o box e acrescente no campo
                toleância 'Funcional'
              </Lable>
              <Input
                placeholder="Confirme sua senha"
                type="checkbox"
                {...register("isfunctional")}
                style={{ boxShadow: "none" }}
              />

              <Button type="submit" style={{ alignSelf: "flex-start" }}>
                Cadastrar
              </Button>
            </form>
          </ContainerItens>

          <ImgLogo src={LogoSiger} alt="Logo Siger" />
        </ContainerRegister>

        <Container>
          <Title style={{ width: "600px" }}>
            {" "}
            Testes de controle de qualidade cadastrados
          </Title>

          <ContainerTests>
            <ContainerTitles>
              <P style={{ fontWeight: "700" }}>Nome</P>
              <P style={{ fontWeight: "700" }}>Tipo</P>
              <P style={{ fontWeight: "700" }}>Tolerância</P>
              <P style={{ fontWeight: "700" }}>Frequência recomendada</P>
              <P style={{ fontWeight: "700" }}>Máquina recomendada</P>
              <P style={{ fontWeight: "700", width: "45px" }}>Deletar</P>
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
                    <P>{test.recommendedFrequency}</P>
                    <P>{test.recommendedMachineType}</P>
                    <button onClick={() => deletetest(test.id)}>
                      <img src={Trash} alt="lata de lixo" />
                    </button>
                  </ContainerCarousel>
                ))}
            </Carousel>
          </ContainerTests>
        </Container>
      </Main>
    </Body>
  );
}
export default RegisterAndDeleteTests;
