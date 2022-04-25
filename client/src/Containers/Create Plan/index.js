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
import Plans from "../../components/Plans";

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
  Label,
  Select,
  Container,
  ContainerCarousel,
  ContainerTests,
  ContainerTitles,
  P,
} from "./styles";

import { DatePicker } from "antd";

import moment from "moment";

function PlanCalendar() {
  const { RangePicker } = DatePicker;

  const [tests, setTests] = useState([]);
  const [machines, setmachines] = useState([]);
  const [users, setusers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [filters, setFilters] = useState({
    dates: [],
    user: "",
  });

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("siger:userData"))
  );

  const [preview, setPreview] = useState([]);

  useEffect(() => {
    startUp();
  }, []);

  const schema = Yup.object().shape({
    user: Yup.string().required("O usuário é obrigatório"),
    machine: Yup.string().required("A máquina é obrigatória"),
    test: Yup.string().required("O teste é obrigatório"),
    replay: Yup.string().required("A Tolerância é obrigatória"),
    date: Yup.date().required("O tipo de teste é obrigatório"),
    frequency: Yup.string().required(
      "A frequência recomendada do teste é obrigatória"
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  

  const createPreview = (planData) => {
    let dateCounter = moment(planData.date);
    let dateLimit = moment(planData.date);
    dateLimit = dateLimit.add(planData.replay * planData.frequency, "days");

    const preview = [];
    while (dateCounter.isSameOrBefore(dateLimit, "day")) {
      preview.push({
        users_id: !!currentUser.isAdm ? planData.user : currentUser.id,
        machines_id: planData.machine,
        tests_id: planData.test,
        date: dateCounter.format("YYYY-MM-DD"),
      });
      dateCounter = dateCounter.add(planData.frequency, "days");
    }
    setPreview(preview);
  };

  const onSubmit = async () => {
    try {
      const { status } = await api.post(
        !!currentUser.isAdm ? `/users/${preview[0].users_id}/plans` : "/plans",
        preview,
        {
          validateStatus: () => true,
        }
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

      const { data: plans } = await api.get("/plans");
      setPlans(plans);

    } catch (err) {
      toast.error("Falha no sistema, tente novamente");
    }
  };

  const filterDates = async (dates) => {
    const start = dates && dates.length ? dates[0].format("YYYY-MM-DD") : null;
    const end = dates && dates.length ? dates[1].format("YYYY-MM-DD") : null;
    setFilters({
      ...filters,
      start,
      end,
    });

    const { data: plans } = await api.get("/plans/", {
      params: { ...filters, start, end },
    });
    setPlans(plans);
  };

  const filterUser = async (user) => {
    setFilters({
      ...filters,
      user,
    });

    const { data: plans } = await api.get("/plans/", {
      params: { ...filters, user },
    });
    setPlans(plans);
  };

  const startUp = async () => {
    const { data: tests } = await api.get("/tests");
    setTests(tests);

    const { data: machines } = await api.get("/machines");
    setmachines(machines);

    const { data: users } = await api.get("/users");
    setusers(users);

    const { data: plans } = await api.get("/plans");
    setPlans(plans);
  };

  return (
    <Body>
      <HeaderPage />
      <LinkPage />

      <Main>
        <Link to="/" className="home">
          <strong>Voltar para Home</strong>
        </Link>
        <TitlePage style={{ width: "400px" }}>Cadastrar planos</TitlePage>
        <form noValidate onSubmit={handleSubmit(createPreview)}>
          <ContainerRegister>
            <ContainerItens>
              <h2 className="logintext">Planejamento de testes</h2>

              <Label>Usuário responsável</Label>
              {!!currentUser.isAdm ? (
                <>
                  <Select {...register("user")} error={errors.user?.message}>
                    <option />
                    {users &&
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </Select>
                  <ErrorMessage>{errors.user?.message}</ErrorMessage>
                </>
              ) : (
                currentUser.name
              )}

              <Label>Máquina selecionada</Label>
              <Select {...register("machine")} error={errors.machine?.message}>
                <option />
                {machines &&
                  machines.map((machine) => (
                    <option key={machine.id} value={machine.id}>
                      {machine.name}
                    </option>
                  ))}
              </Select>
              <ErrorMessage>{errors.machine?.message}</ErrorMessage>

              <Label>Teste selecionado</Label>
              <Select {...register("test")} error={errors.test?.message}>
                <option />
                {tests &&
                  tests.map((test) => (
                    <option key={test.id} value={test.id}>
                      {test.name}
                    </option>
                  ))}
              </Select>
              <ErrorMessage>{errors.test?.message}</ErrorMessage>

              <Label>Data do primeiro teste</Label>
              <input type="date" {...register("date")} />

              <Label>Frequência (dias)</Label>
              <input
                type="number"
                placeholder="Dias"
                {...register("frequency")}
              />

              <Label>Repetições</Label>
              <input
                type="number"
                placeholder="Repetições"
                {...register("replay")}
              />
              <Button type="submit">Simular</Button>
            </ContainerItens>
            <ImgLogo src={LogoSiger} alt="Logo Siger" />
          </ContainerRegister>
        </form>
        {preview.length != 0 && (
          <div>
            <p>O teste será planejado para as seguintes datas:</p>
            {preview
              .map((plan) =>
                moment(plan.date, "YYYY-MM-DD").format("DD/MM/YYYY")
              )
              .join(", ")}
            <p>Deseja cadastrá-los?</p>
          </div>
        )}
        <Button
          style={{ width: "800px" }}
          disabled={preview.length == 0}
          onClick={onSubmit}
        >
          Cadastrar
        </Button>

        
        <Container>
          <Title>Planejamentos</Title>

          <Label>Datas</Label>
          <RangePicker format="DD/MM/YYYY" onChange={filterDates} />
          <Label>Usuário</Label>
          <Select
            style={{ width: "25%" }}
            onChange={(event) => filterUser(event.target.value)}
          >
            <option value={null} />
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </Select>

          <ContainerTests>
            <ContainerTitles>
              <P style={{ fontWeight: "700", margin: "0 10px" }}>Usuário</P>
              <P style={{ fontWeight: "700", margin: "0 10px" }}>Teste</P>
              <P style={{ fontWeight: "700", margin: "0 10px" }}>Máquina</P>
              <P style={{ fontWeight: "700", margin: "0 10px" }}>Data</P>
              <P style={{ fontWeight: "700", margin: "0 10px" }}>Opções</P>
            </ContainerTitles>

            <Carousel
              verticalMode
              itemsToShow={8}
              style={{ width: "80em", justifySelf: "center" }}
            >
              {plans.length != 0 &&
                plans.map((plan) => (
                  <ContainerCarousel key={plan.id}>
                    <P>{plan.users.name}</P>
                    <P>{plan.tests.name}</P>
                    <P>{plan.machines.name}</P>
                    <P>
                      {moment(plan.date, "YYYY-MM-DD").format("DD/MM/YYYY")}
                    </P>
                    <P>butons: complete (changeStatus) & delete</P>
                  </ContainerCarousel>
                ))}
            </Carousel>
          </ContainerTests>
        </Container>

        <Plans/>

  
      </Main>
    </Body>
  );
}
export default PlanCalendar;
