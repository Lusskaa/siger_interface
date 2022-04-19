import styled from "styled-components"

export const ContainerLinks = styled.div `


    display: flex;
    align-items: center;
    width: 100%;
    gap: 20px;
    
    justify-content: center;
    margin: 20px 0;


    .links {
        color: black;
        background: #CAD2D3;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration:none;
        cursor: pointer;
        height: 40px;
        width: 240px;

        border-radius: 10px;
        border: none;
        font-style: normal;
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;

        &:hover{
            opacity: 0.8;
        }
        &:active{
            opacity: 0.6;
        }
    }
`

