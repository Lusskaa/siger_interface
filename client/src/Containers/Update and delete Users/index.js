import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom'


import Trash from '../../assets/trash.svg'
import addIcon from '../../assets/iconADD.svg'

import Carousel from 'react-elastic-carousel'

import HeaderPage from "../../components/Header";
import LinkPage from "../../components/LinkPages";

import api from '../../services/api'

import Button from '../../components/Button'

import { Title } from "../../components/Titles/styles";

import LogoSiger from '../../assets/logoSiger.svg'

import {
    Body,
    Header,
    ImgLogoSuperior,
    Main,
    Container,
    ContainerTests,
    ContainerTitles,
    P,
    ContainerCarousel
} from './styles'

function UpdateAndDeleteUsers(){


/*     const schema = Yup.object().shape({
        name: Yup.string().required('O seu nome é obrigatório'),
        type: Yup.string().required('O tipo de máquina é obrigatório')

      })

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      })

      const onSubmit = async machineData => {
        try {
           const {status}= await api.post('Machines', {
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
            
            
            
        } catch (err) {
            
            toast.error('Falha no sistema, tente novamente')
            
        }
    } */

    const [users, setusers] = useState()

    useEffect(()=>{

        async function loadUsers(){
            const {data} = await api.get('/users')
            setusers(data)
        }
        loadUsers()

        
        
        
    }, [])
    async function deleteUser(user_Id) {

        // Tentar colocar mensagem de erro para quando deletar um isADm
  
        await api.delete(`/users/${user_Id}`) // deletando no back

        const newusers = users.filter( user=> user.id !== user_Id); // deletando no front
  
        setusers(newusers );
      
      }


    async function setStatus(user_Id, allUsers) {
  
        await api.patch(`/users/${user_Id}/status`) // atualizando no back

/*         await api.ger
  
        const newusers = users.filter( user=> user.id  );  */
        const {data} = await api.get('/users')
        setusers(data)
  
      /*   setusers(newusers ); */
      
      }



    return(
        <Body>
            <HeaderPage/>
            <LinkPage/>

            <Main>
                <Link to = '/' className="home" ><strong>Voltar para Home</strong></Link>


                <Container> 
                    <Title style={{ width: '600px'}}> Atualizar status e deletar usuários</Title>
                    
                    <ContainerTests>
                        <ContainerTitles>
                            <P style={{fontWeight: '700'}}>Nome</P> 
                            <P style={{fontWeight: '700'}}>E-mail</P>
                            <P style={{fontWeight: '700'}}>Status</P>
                            <P style={{fontWeight: '700', width: '80px'}}>Tornar ativo</P>
                            <P style={{fontWeight: '700', width: '45px' }}>Deletar</P>
                        </ContainerTitles>
                            <Carousel verticalMode itemsToShow={8} style ={{width: "90%", justifySelf: "center"}}>
                            {
                                users && users.map(user =>(
                                        <ContainerCarousel key={user.id}>
                                        
                                                <P>{user.name}</P>
                                                <P>{user.email}</P>
                                                <P>{(!user.isactive && 'Não ativado') || (user.isactive && 'Ativado')}</P>

                                                <button onClick={()=> setStatus(user.id)}><img className="addIcon" src={addIcon} alt="add icon"/></button>
                                                <button onClick={()=> deleteUser(user.id)}><img src={Trash} alt="lata de lixo"/></button>
                                                

                                                

                                        </ContainerCarousel>
                                    ) 
                                )
                            }

                            </Carousel>
                    </ContainerTests>

        </Container> 




            </Main>



            
        </Body>





    )
}
export default UpdateAndDeleteUsers