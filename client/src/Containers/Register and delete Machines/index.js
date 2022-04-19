import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'


import Trash from '../../assets/trash.svg'

import Carousel from 'react-elastic-carousel'



import api from '../../services/api'

import Button from '../../components/Button'
import TitlePage from '../../components/Titles'
import HeaderPage from '../../components/Header'
import LinkPage from "../../components/LinkPages"

import { Title } from "../../components/Titles/styles";

import LogoSiger from '../../assets/logoSiger.svg'

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
    ContainerTests,
    ContainerTitles,
    P,
    ContainerCarousel
} from './styles'

function RegisterAndDeleteMachines(){
    

    const schema = Yup.object().shape({
        name: Yup.string().required('O seu nome é obrigatório'),
        type: Yup.string().required('O tipo de máquina é obrigatório')

      })

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      })

      const onSubmit = async machineData => {
        try {
           const {status}= await api.post('/machines', {
                name: machineData.name,
                type: machineData.type,


                
                
            },{validateStatus:()=> true} )
            
            
            if (status === 201 || status === 200) {
                
                toast.success('Máquina criada com sucesso')
                
            } else if (status === 409) {
                
                toast.error('Máquina já cadastrada, para o mesmo nome e tipo')
            } else{
                throw new Error()
            }

            const {data} = await api.get('/machines')
            setmachines(data)
            
            
            
        } catch (err) {
            
            toast.error('Falha no sistema, tente novamente')
            
        }
    }

    const [machines, setmachines] = useState()

    useEffect(()=>{

        async function loadMachines(){
            const {data} = await api.get('/machines')
            setmachines(data)
        }
        loadMachines()

        
        
        
    }, [])
    async function deletetest(machine_Id) {
  
        await api.delete(`/machines/${machine_Id}`) // deletando no back
  
        const newMachines = machines.filter( machine=> machine.id !== machine_Id); // deletando no front
  
        setmachines(newMachines );
      
      }



    return(
        <Body>
            <HeaderPage/>
            <LinkPage/>


            <Main>
                <Link to = '/' className="home" ><strong>Voltar para Home</strong></Link>
                <TitlePage style={{width: '400px'}}>Cadastrar e excluir testes (QT)</TitlePage>
                

                <ContainerRegister>

                    <ContainerItens>
                        <h2 class="logintext">Nova máquina</h2>
                        <form noValidate onSubmit={handleSubmit(onSubmit)}> 

                            <Lable>Nome</Lable>
                            <Input
                            type= "text" 
                            placeholder="Nome da máquina. ex: Acelerador linear sala x"  
                            {...register('name')} 
                            error={errors.name?.message}/>
                            <ErrorMessage>{errors.name?.message}</ErrorMessage>

                            <Lable>Tipo</Lable>

                            <Select {...register('type')} error={errors.type?.message}>
                                <option>Non-IMRT</option>
                                <option>IMRT</option>
                                <option>SRS/SBRT</option>
                            </Select>
                            <ErrorMessage>{errors.type?.message}</ErrorMessage>

                           
                            
                            <Button type="submit" style={{alignSelf: "flex-start"}} >Cadastrar</Button>
                            <Link to = '/'  style={{alignSelf: "flex-start", color: '#0D0D0D'}} ><strong>Voltar para Home</strong></Link>

                           
                        
                        </form>

            
                    </ContainerItens>

                    <ImgLogo src={LogoSiger} alt="Logo Siger"/>

                </ContainerRegister>

                <Container> 
                    <Title style={{ width: '600px'}}> Testes de controle de qualidade cadastrados</Title>
                    
                    <ContainerTests>
                        <ContainerTitles>
                            <P style={{fontWeight: '700'}}>Nome</P> 
                            <P style={{fontWeight: '700'}}>Tipo</P>
                            <P style={{fontWeight: '700', width: '45px' }}>Deletar</P>
                        </ContainerTitles>
                            <Carousel verticalMode itemsToShow={3} style ={{width: "90%", justifySelf: "center"}}>
                            {
                                machines && machines.map(machine =>(
                                    <ContainerCarousel key={machine.id}>
                                    
                                            <P>{machine.name}</P>
                                            <P>{machine.type}</P>

                                            <button onClick={()=> deletetest(machine.id)}><img src={Trash} alt="lata de lixo"/></button>
                                            

                                            

                                    </ContainerCarousel>
                                ) )
                                }
                            </Carousel>
                        </ContainerTests>

                    </Container> 




            </Main>



            
        </Body>





    )
}
export default RegisterAndDeleteMachines