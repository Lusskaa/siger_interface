import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import api from "../../services/api";

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
} from "./styles";

import moment from "moment";

function PlanCalendar() {
  const [refreshTable, setRefreshTable] = useState([]);
  const [sendingForm, setSendingForm] = useState(false);

  const [tests, setTests] = useState([]);
  const [machines, setmachines] = useState([]);
  const [users, setusers] = useState([]);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("siger:userData"))
  );

  const [preview, setPreview] = useState([]);

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
    reset,
  } = useForm({
    defaultValues: {
      user: !!currentUser.isAdm ? "" : currentUser.id,
    },
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
    setSendingForm(true);
    api
      .post(
        !!currentUser.isAdm ? `/users/${preview[0].users_id}/plans` : "/plans",
        preview,
        {
          validateStatus: () => true,
        }
      )
      .then(() => {
        toast.success("Teste criado com sucesso");

        reset();
        setPreview([]);
        setRefreshTable(!refreshTable);
      })
      .finally(() => setSendingForm(false));
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
        <form noValidate disabled>
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

              <Label>Data da última vez que o teste foi feito</Label>
              <input type="date" {...register("date")} />
              <ErrorMessage>{errors.date?.message}</ErrorMessage>

              <Label>Frequência (dias)</Label>
              <input
                type="number"
                placeholder="Dias"
                {...register("frequency")}
              />
              <ErrorMessage>{errors.frequency?.message}</ErrorMessage>

              <Label>Repetições</Label>
              <input
                type="number"
                placeholder="Repetições"
                {...register("replay")}
              />
              <ErrorMessage>{errors.replay?.message}</ErrorMessage>

              <Button onClick={handleSubmit(createPreview)}>Simular</Button>
            </ContainerItens>
            <ImgLogo src={LogoSiger} alt="Logo Siger" />
          </ContainerRegister>

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
            disabled={preview.length == 0 || sendingForm}
            onClick={handleSubmit(onSubmit)}
          >
            Cadastrar
          </Button>
        </form>

        <Plans
          users={users}
          tests={tests}
          machines={machines}
          refresh={refreshTable}
        />
      </Main>
    </Body>
  );
}
export default PlanCalendar;
