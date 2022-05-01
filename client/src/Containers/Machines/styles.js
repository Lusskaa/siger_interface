import styled from 'styled-components'

export const Body = styled.div`
  height: 100%;
  width: 100vw;
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
    margin-bottom: 20px;

    border-radius: 10px;
    border: none;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;

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

export const ContainerRegister = styled.div`
  width: 954px;
  background: rgba(242, 191, 145, 0.3);
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin-bottom: 40px;
  padding-bottom: 20px;
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
  margin-top: 10px;
`

export const Container = styled.div`
  width: 100%;
`

export const P = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
`
export const ContainerMachines = styled.div`
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
  }
`
