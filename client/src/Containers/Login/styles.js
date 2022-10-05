import styled from 'styled-components'

export const Body = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #cad2d3;
  align-items: center;

  h1 {
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: 29px;
    color: #000000;
    margin-left: 34px;
  }
`

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 40px 0 40px 0;
`

export const ImgLogo = styled.img`
  width: 458px;
  height: 439px;
  margin: 0 107px 0 107px;
`

export const ImgLogoSuperior = styled.img`
  width: 73px;
  height: 68px;
  margin: 5px 30px 5px 10px;
`

export const ContainerItens = styled.div`
  width: 672px;
  height: 439px;
  background: rgba(249, 190, 149, 0.35);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
  padding-top: 72px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 35px;
    color: #000000;
    margin-bottom: 25px;
  }
`

export const Input = styled.input`
  width: 321px;
  height: 46px;
  background: #f7f7f7;
  box-shadow: -4px 4px 8px;
  border-radius: 10px;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
  position: relative;
  padding: 10px 15px;

  ::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
  }
`
export const ErrorMessage = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #cc1717;
`

export const SignInLink = styled.p`
  margin-top: 0;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #969696;
  display: flex;
  gap: 4px;
`




export const Footer = styled.div`
  background: #0d0d0d;
  width: 100%;
 /*  height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;

  h4 {
    color: #ffffff;
    display: inline-block;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 10px;
    margin-left: 50px;
  }

  bottom: 0;
position: absolute;
`
export const ContainerImages = styled.div`
  height: 135px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 50px;
`
