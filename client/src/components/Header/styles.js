import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #cad2d3;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
  height: 90px;
  margin-bottom: 60px;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 29px;
    color: #000000;
    margin-left: 34px;
    width: 500px;
    align-self: center;
    justify-self: center;

    margin-top: 0px;
  }
`
export const ContainerLeft = styled.div``
export const ContainerMiddle = styled.div``
export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-right: 20px;
`
export const ContainerText = styled.div`
  p {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    align-items: center;

    color: #555555;
  }
`
export const Line = styled.div`
  height: 50px;
  border-left: 0.5px solid #bababa;
`
export const GetOutLink = styled.a`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #9b07e6;
`

export const ImgLogoSuperior = styled.img`
  width: 65px;
  margin: 5px 10px 5px 10px;
`

export const ImgUserIcon = styled.img`
  width: 30px;
`
