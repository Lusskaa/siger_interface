import React, { useEffect, useState } from "react"
import Carousel from 'react-elastic-carousel'
import {Container, ContainerItens, ContainerTests, ContainerTitles,  P} from './styles'

import Trash from '../../assets/trash.svg'

import api from '../../services/api'

import  Title  from "../Titles"

function QualityTestsADM () {
    const [tests, setTests] = useState()
    const user = localStorage.getItem("siger:userData");

    useEffect(()=>{

        async function loadTests(){
            const {data} = await api.get('/tests')
            /* console.log(data) */
            setTests(data)
        }
        loadTests()

        
        
        
    }, [])
    async function deletetest(test_Id) {
  
        await api.delete(`/tests/${test_Id}`) // deletando no back
  
        const newTests = tests.filter( test=> test.id !== test_Id); // deletando no front
  
        setTests(newTests);
      
      }

    return  (
        <Container> 
            <Title style={{ width: '600px'}}> Testes de controle de qualidade cadastrados</Title>
            
            <ContainerTests>
                <ContainerTitles>
                    <P style={{fontWeight: '700'}}>Nome</P> 
                    <P style={{fontWeight: '700'}}>Tipo</P>
                    <P style={{fontWeight: '700'}}>Tolerância</P>
                    <P style={{fontWeight: '700'}}>Frequência recomendada</P>
                    <P style={{fontWeight: '700'}}>Máquina recomendada</P>
                    { JSON.parse(user).isAdm ? (
                        <P style={{fontWeight: '700', width: '45px' }}>Deletar</P> 
                                    ) : (
                                     ''
                                    )}
                </ContainerTitles>
                <Carousel verticalMode itemsToShow={8} style ={{width: "90%", justifySelf: "center"}}>
                    {
                    tests && tests.map(test =>(
                        <ContainerItens key={test.id}>
                        
                                <P>{test.name}</P>
                                  <P>{test.type}</P>
                                  <P>{test.tolerance}</P>
                                  <P>{test.recommendedFrequency}</P>
                                  <P>{test.recommendedMachineType}</P>

                                  <button onClick={()=> deletetest(test.id)}>
                                    { JSON.parse(user).isAdm ? (
                                    <img src={Trash} alt="lata de lixo"/>
                                    ) : (
                                     ''
                                    )}
                                      
                                    
                                </button>
                                  

                                

                        </ContainerItens>
                    ) )
                    }
                </Carousel>
            </ContainerTests>

        </Container>  
    )
}

export default QualityTestsADM