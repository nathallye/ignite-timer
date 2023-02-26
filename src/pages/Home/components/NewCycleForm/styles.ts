import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /*Para quando a tela for menor a linha quebrar*/
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: 0.5rem;

  color: ${props => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;
`;

const BaseInput = styled.input`
  background: transparent;

  border: 0;
  border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
  height: 2.5rem;
  padding: 0 0.5rem;

  color: ${(props) => props.theme["gray-100"]};
  font-size: 1.125rem;
  font-weight: bold;

  &:focus {
    border-color: ${(props) => props.theme["green-500"]};
    box-shadow: none;
  }

  &::placeholder {
    color: ${(props) => props.theme["gray-500"]};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;
