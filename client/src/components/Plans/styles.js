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
  width: 200px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
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
  background-color: ${props => props.isDone ? '#FFF1F1' : ''};

  .alert {
    position: absolute;
    /* left: 1em; */
    
  }

  .trash-btn {
    background: none;
    border: none;
    cursor: pointer;
  }

  .infoIcon{
    background: none;
    border: none;
    cursor: pointer;
    width: 90px;
    width: 150px;
  }

  .ant-switch-checked {
    background: #07bc0c;
  }

`
export const P = styled.p`
  width: 150px;
  display: flex;
  justify-content: center;
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
  width: 100%;
`
export const ContainerTitles = styled.div`
  display: flex;
  align-items: center;
`
