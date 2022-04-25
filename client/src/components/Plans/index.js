import React, {  useState, useEffect } from "react";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { DatePicker } from "antd";
import moment from "moment";
import Trash from "../../assets/trash.svg";
import checkTrue from "../../assets/checkTrue.svg";
import checkNull from "../../assets/checkNull.svg";

import {
    Label,
    Select,
    Container,
    ContainerCarousel,
    ContainerPlans,
    ContainerTitles,
    P,
    Filters,
    Block,
    ConteinerFilters
  } from "./styles";

import Carousel from "react-elastic-carousel";

import api from "../../services/api";

import Title from "../../components/Titles";

function Plans() {
    const { RangePicker } = DatePicker;



    const [tests, setTests] = useState([]);
    const [machines, setmachines] = useState([]);
    const [users, setusers] = useState([]);
    const [plans, setPlans] = useState([]);
    const [filters, setFilters] = useState({
        dates: [],
        user: "",
      });
    
    useEffect(() => {
        startUp();
      }, []);

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
      const filterTest = async (test) => {
        setFilters({
          ...filters,
          test,
        });
    
        const { data: plans } = await api.get("/plans/", {
          params: { ...filters, test },
        });
        setPlans(plans);
      };
      const filterMachine = async (machine) => {
        setFilters({
          ...filters,
          machine,
        });
    
        const { data: plans } = await api.get("/plans/", {
          params: { ...filters, machine },
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

      async function deletePlan(plan_Id) {
        // Tentar colocar mensagem de erro para quando deletar um isADm
    
        /* await api.delete(`/plans/${plan_Id}`); // deletando no back
    
        const newPlans = users.filter((plan) => plan.id !== plan_Id); // deletando no front
    
        setusers(newPlans); */
      }
    
      async function updatePlan(plan_Id/* , allUsers */) {
        /* await api.put(`/users/${user_Id}/status`);  */// atualizando no back
    
        /*         await api.ger
      
            const newusers = users.filter( user=> user.id  );  */
        /* const { data: plans } = await api.get("/plans");
        setusers(data); */
        startUp()
    
          /* setusers(newusers ); */
      }


    return  (
        <Container>
          <Title>Planejamentos</Title>

          <Filters>
            <p className="filtersTitle">Filtros</p>
          <ConteinerFilters>
          <Block>
            <Label>Datas</Label>
            <RangePicker format="DD/MM/YYYY" onChange={filterDates} className= "RangerPicker"/>

            </Block>
          <Block>
            
            <Label>Usuário</Label>
            <Select
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
          </Block>

          <Block>
            <Label>Testes</Label>
            <Select
              onChange={(event) => filterTest(event.target.value)}
              >
              <option value={null} />
              {tests &&
                tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.name}
                  </option>
                ))}
            </Select>
          </Block>

          <Block> 
            <Label>Máquina</Label>
            <Select
              onChange={(event) => filterMachine(event.target.value)}
              >
              <option value={null} />
              {machines &&
                machines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.name}
                  </option>
                ))}
            </Select>
          </Block>
          </ConteinerFilters>
          </Filters>
          <ContainerPlans>
            <ContainerTitles>
              <P style={{ fontWeight: "700" }}>Usuário</P>
              <P style={{ fontWeight: "700" }}>Teste</P>
              <P style={{ fontWeight: "700" }}>Tolerância</P>
              <P style={{ fontWeight: "700" }}>Máquina</P>
              <P style={{ fontWeight: "700" }}>Data</P>
              <P style={{ fontWeight: "700" }}>Opções</P>
            </ContainerTitles>

            <Carousel
              verticalMode
              itemsToShow={8}
              style={{ width: "90%", justifySelf: "center" }}
            >
              {plans.length != 0 &&
                plans.map((plan) => (
                  <ContainerCarousel key={plan.id}>
                    <P>{plan.users.name}</P>
                    <P>{plan.tests.name}</P>
                    <P>{plan.tests.tolerance}</P>
                    <P>{plan.machines.name}</P>
                    <P>
                      {moment(plan.date, "YYYY-MM-DD").format("DD/MM/YYYY")}
                    </P>
                    <P>
                      <button onClick={() => startUp(plan.id)}>
                        {plan.status ? (
                          <img
                            className="addIcon" // check verde ou icone que deixe claro que está ativado
                            src={checkTrue}
                            alt="check true icon"
                          />
                        ) : (
                          <img
                            className="addIcon" // X vermelho ou icone que deixe claro que está ativado
                            src={checkNull}
                            alt="check null icon"
                          />
                        )}
                      </button>
                      <button onClick={() => deletePlan(plan.id)}>
                        <img src={Trash} alt="lata de lixo" />
                      </button>
                    </P>
                  </ContainerCarousel>
                ))}
            </Carousel>
          </ContainerPlans>
        </Container>
    )
}

export default Plans