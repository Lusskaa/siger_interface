import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import api from "../../services/api";

import Button from "../../components/Button";
import TitlePage from "../../components/Titles";

import LogoSiger from "../../assets/logoSiger.svg";
import LogoUnb from "../../assets/logoUnB.svg";
import LogoIf from "../../assets/logoIF.svg";
import LogoHub from "../../assets/logoHub.svg";
import {
  Body,
  Header,
  ImgLogoSuperior,
  Main,
  ImgLogo,
  ContainerItens,
  Input,
  Footer,
  ContainerImages,
  ErrorMessage,
  TitleSingUp,
  ContainerRegister,
  Lable,
  SignInLink,
} from "./styles";

function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required("O seu nome é obrigatório"),
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    password: Yup.string()
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 dígitos"),
    confirmPassword: Yup.string()
      .required("A senha é obrigatória")
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userData) => {
    try {
      const { status, data } = await api.post(
        "users",
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
        { validateStatus: () => true }
      );
      console.log(data);

      if (status === 201 || status === 200) {
        toast.success("Cadastro criado com sucesso");
      } else if (status === 409) {
        toast.error(
          "E-mail já cadastrado, faça Login para continuar ou crie outra conta"
        );
      } else {
        throw new Error();
      }

      if (!data.isActive) {
        toast.warning(
          "Aguarde até que um admin da sua instituição valide seu acesso"
        );
      }
    } catch (err) {
      toast.error("Falha no sistema, tente novamente");
    }
  };
  return (
    <Body>
      <Header>
        <h1>Sistema Integrado de gerenciamento em Radioterapia </h1>

        <ImgLogoSuperior src={LogoSiger} alt="Logo Siger" />
      </Header>

      <Main>
        <TitlePage>Cadastro</TitlePage>

        <ContainerRegister>
          <ContainerItens>
            <h2 class="logintext">Novo usuário</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Lable>Nome</Lable>
              <Input
                type="text"
                placeholder="Nome completo"
                {...register("name")}
                error={errors.name?.message}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>

              <Lable>E-mail</Lable>
              <Input
                placeholder="E-mail"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>

              <Lable>Password</Lable>
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />
              <ErrorMessage>{errors.password?.message}</ErrorMessage>

              <Lable>Confirmar Senha</Lable>
              <Input
                placeholder="Confirme sua senha"
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />
              <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

              <Button type="submit" style={{ alignSelf: "flex-start" }}>
                Cadastrar
              </Button>

              <SignInLink>
                Já possui uma conta?{" "}
                <Link style={{ color: "#0D0D0D" }} to="/login">
                  {" "}
                  <strong>Sign in</strong>
                </Link>{" "}
                now.
              </SignInLink>
            </form>
          </ContainerItens>

          <ImgLogo src={LogoSiger} alt="Logo Siger" />
        </ContainerRegister>
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
  );
}
export default Register;
