import React, { useEffect, useState } from "react"
import Carousel from 'react-elastic-carousel'
import {Container, ContainerItens, ContainerTests, ContainerTitles,  P} from './styles'

import api from '../../services/api'

import  Title  from "../Titles"

function QualityTests () {
    const [tests, setTests] = useState()

    useEffect(()=>{

        async function loadTests(){
            const {data} = await api.get('/tests')
            /* console.log(data) */
            setTests(data)
        }

        loadTests()
    }, [])

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
                </ContainerTitles>
                <Carousel verticalMode itemsToShow={8} style ={{width: "90%", justifySelf: "center"}}>
                    {
                    tests && tests.map(test =>(
                        <ContainerItens key={test.id}>
                        
                                <P>{test.name}</P>
                                  <P>{test.type}</P>
                                  <P>{test.tolerance}</P>
                                  <P>{test.recommendedfrequency}</P>
                                  <P>{test.recommendedmachine}</P>
                                  

                                

                        </ContainerItens>
                    ) )
                    }
                </Carousel>
            </ContainerTests>

        </Container>  
    )
}

export default QualityTests