import styled from "styled-components"

export const ContainerLinks = styled.div `


    display: flex;
    align-items: center;
    width: 100%;
    gap: 20px;
    
    justify-content: center;
    padding-right: 20px;

`


export const Link = styled.a `
        color:${props => props.isActive ? "blue" : "black"} ;
        cursor: pointer;
        text-decoration:none;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border: none;
        font-style: normal;
        font-weight: ${props => props.isActive ? 'bold' : 'normal'};
        font-size: 16px;
        line-height: 19px;
        

        &:hover{
            opacity: 0.8;
        }
        &:active{
            opacity: 0.6;
        }

`