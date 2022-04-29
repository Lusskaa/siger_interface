import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


import api from "../../services/api";



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
  Select
} from "./styles";

function RegisterAndDeleteTests() {
  const [refreshTable, setRefreshTable] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
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
    reset,
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
      } else if (status === 400) {
        toast.error(
          "Teste já cadastrado, para o mesmo nome nem a tolerância nem a frequência deve ser a mesma"
        );
      } else {
        throw new Error();
      }

      reset()
      setRefreshTable(!refreshTable);
    } catch (err) {
      toast.error("Falha no sistema, tente novamente");
    }
  };

  return (
    <Body>
      <HeaderPage />

      <Main>
        <TitlePage style={{ width: "600px" }}>
          Cadastrar testes de controle de qualidade
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
                <option/>
                <option>Dosimétrico</option>
                <option>Mecânico</option>
                <option>Gating respiratório</option>
                <option>Segurança</option>
              </Select>
              <ErrorMessage>{errors.type?.message}</ErrorMessage>

              <Lable>Frequência Recomendada</Lable>
  
              <Select {...register("recommendedFrequency")} error={errors.recommendedFrequency?.message}>
                <option/>
                <option>Diário</option>
                <option>Semanal</option>
                <option>Mensal</option>
                <option>Bimestral</option>
                <option>Trimestral</option>
                <option>Semestral</option>
                <option>Anual</option>
              </Select>
              <ErrorMessage>
                {errors.recommendedFrequency?.message}
              </ErrorMessage>

              <Lable> Maquina recomendada </Lable>

              <Select
                {...register("recommendedMachineType")}
                error={errors.recommendedMachineType?.message}
              >
                <option/>
                <option>Non-IMRT</option>
                <option>IMRT</option>
                <option>SRS/SBRT</option>
              </Select>
              <ErrorMessage>
                {errors.recommendedMachineType?.message}
              </ErrorMessage>

              <Lable>Tolerância</Lable>
              <Input
                placeholder="Coloque aqui a(s) tolerância(s) de seu teste"
                type="text"
                {...register("tolerance")}
                error={errors.tolerance?.message}
              />
              <ErrorMessage>{errors.tolerance?.message}</ErrorMessage>

              <Lable>
                O teste é funcional? Se sim, coloque no campo
                toleância a palavra 'Funcional'
              </Lable>
  {/*             <Input
                placeholder="Confirme sua senha"
                type="checkbox"
                {...register("isfunctional")}
                style={{ boxShadow: "none" }}
              /> */}

              <Button type="submit" style={{ alignSelf: "flex-start" }}>
                Cadastrar
              </Button>
            </form>
          </ContainerItens>

          <ImgLogo src={LogoSiger} alt="Logo Siger" />
        </ContainerRegister>

        <QualityTestsADM refresh={refreshTable} />
      </Main>
    </Body>
  );
}
export default RegisterAndDeleteTests;
