import styled from 'styled-components'

export const Label = styled.p`
  align-self: flex-start;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  color: #000000;
  margin-bottom: 3px;
`

export const ContainerItens = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  width: 400px;
  margin-top: 25px;
  flex-wrap: wrap;

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 35px;
    color: #000000;
    margin-bottom: 10px;
  }
`

export const Select = styled.select`
  border: none;
  width: 150px;
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

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const Block = styled.div`
  .RangerPicker {
    width: 230px;
    height: 40px;
    background: #f7f7f7;
    box-shadow: -2px 2px 3px;
    border-radius: 10px;
    border: none;
    padding: 10px 15px;
  }
`
export const ContainerCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  border-bottom: 2px solid #cad2d3;
  padding: 10px;
  background-color: ${(props) => (props.isDone ? '#FFF1F1' : '')};

  .alert {
    position: absolute;
    /* left: 1em; */
  }

  .trash-btn {
    background: none;
    border: none;
    cursor: pointer;
  }

  .infoIcon {
    background: none;
    border: none;
    cursor: pointer;
    width: 150px;
  }

  .ant-switch-checked {
    background: #07bc0c;
  }
`
export const P = styled.p`
  display: flex;
  justify-content: center;
  margin: 0 10px;
  
  .addIcon {
    width: 25px;
  }
  .submit {
    margin: 0;
    width: 90px;
  }
  border: ${(props) => ( props.highlight === "REPROVADO") ? ' 3px solid red' : ''};
  background-color: ${(props) => ( props.highlight === "REPROVADO") ? '#FFF1F1' : ''};
  
  border: ${(props) => ( props.highlight === "ATENÇÃO-PERTO DA TOLERÂNCIA") ? ' 3px solid yellow' : ''};
  background-color: ${(props) => ( props.highlight === "ATENÇÃO-PERTO DA TOLERÂNCIA") ? '#FAF8C5' : ''};
  
  border: ${(props) => ( props.highlight === "APROVADO") ? ' 3px solid green' : ''};
  background-color: ${(props) => ( props.highlight === "APROVADO") ? '#ACFABA' : ''};
  
  
`
export const ContainerTitles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* gap: 20px; */
  margin: 0 10px;
  
`

export const ColumnName = styled.p`
  font-weight: 700;
  
  text-align: center;
  margin: 0 10px;
`
export const Filters = styled.div`
  margin: 0 0 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .filtersTitle {
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 10px;

    align-self: center;
    border-bottom: 3px solid #cad2d3;
  }
`
export const ConteinerFilters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
`
export const ContainerPlans = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`

export const ContainerUpdate = styled.div`
  width: 20vw;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  background: rgba(242, 191, 145, 0.3);
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-right: 10vw;

  .text-update {
    width: 13vw;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    text-align: justify;
  }

  .update-title {
    width: 12vw;
    margin-left: 15px;
  }
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    
  }
`
