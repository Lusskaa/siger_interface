import React from "react"
import {ContainerLinks} from './styles'
import { Link} from 'react-router-dom'

function LinkPage () {
    return  (
        <ContainerLinks> 
            <Link className="links" to="/cadDelMachines" >Cadastrar/Deletar máquina</Link>
            <Link className="links" to="/cadDelTestes">Cadastrar/Deletar teste</Link>
            <Link className="links" to="/upDelUsers">Ativar/Deletar usuário</Link>
            <Link className="links" to="/createPlan">Criar Planejamento</Link>
        </ContainerLinks>  
    )
}

export default LinkPage