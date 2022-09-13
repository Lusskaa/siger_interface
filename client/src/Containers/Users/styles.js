import styled from 'styled-components'

export const Body = styled.div`
  height: 100%;
  width: 100vw;
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
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0 40px 0;

  .home {
    color: black;
    background: #cad2d3;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    height: 40px;
    width: 240px;

    border-radius: 10px;
    border: none;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 20px;

    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
  }
`

export const ImgLogo = styled.img`
  width: 358px;
  height: 339px;
`


export const Information = styled.div`
  width: 500px;
  height: 300px;
  background: rgba(242, 191, 145, 0.3);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

  p{

  }
`
export const TitleSingUp = styled.p`
  width: 200px;
  border-bottom: 3px solid #cad2d3;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-left: 50px;
  align-self: flex-start;

  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 25px;
`

export const ImgLogoSuperior = styled.img`
  width: 73px;
  height: 68px;
  margin: 5px 30px 5px 10px;
`
export const Lable = styled.p`
  align-self: flex-start;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;

  color: #000000;
`

export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 400px;
  margin-top: 25px;
  flex-wrap: wrap;

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 35px;
    color: #000000;
    margin-bottom: 10px;
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

  width: 100%;
  height: 40px;
  background: #f7f7f7;
  box-shadow: -2px 2px 3px;
  border-radius: 10px;
  border: none;
  position: relative;
  padding: 10px 15px;

  ::placeholder {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
  }
`
export const Select = styled.select`
  width: 321px;
  height: 46px;
  background: #f7f7f7;
  box-shadow: -4px 4px 8px;
  border-radius: 10px;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
  position: relative;
  padding: 10px 15px;

  width: 100%;
  height: 40px;
  background: #f7f7f7;
  box-shadow: -2px 2px 3px;
  border-radius: 10px;
  border: none;
  position: relative;
  padding: 10px 15px;
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
  margin-bottom: 62px;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #969696;
  align-self: flex-start;

  a {
    cursor: pointer;
  }

  strong {
    color: #323232;
  }
`



export const Container = styled.div`
  width: 100%;
`

export const P = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;

  
`
export const ContainerTests = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const ContainerTitles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 30px;
`

export const ContainerCarousel = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-items: center;
  border-bottom: 2px solid #cad2d3;

  button {
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
  }

  .addIcon {
    height: 35px;
    
  }
`
