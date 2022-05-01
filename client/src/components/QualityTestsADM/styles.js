import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-bottom: 50px;
  margin-top: 50px;
`
export const ContainerItens = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  border-bottom: 2px solid #cad2d3;
  padding: 10px 0;

  button {
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
  }
`
export const P = styled.div`
  width: 180px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
export const Label = styled.p`
  align-self: flex-start;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  color: #000000;
  margin-bottom: 3px;
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
