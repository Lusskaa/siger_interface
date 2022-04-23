import styled from "styled-components";

export const ContainerButton = styled.button`
  background: ${(props) => (props.disabled ? "gray" : "#323232")};
  box-shadow: -4px 4px 18px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  width: 133px;
  height: 46px;
  border: none;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    opacity: ${(props) => (props.disabled ? 1 : 0.8)};
  }
  &:active {
    opacity: ${(props) => (props.disabled ? 1 : 0.6)};
  }
`;
