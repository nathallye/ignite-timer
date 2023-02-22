import styled from "styled-components";

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.5rem;
  }
`;

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

export const CountdownContainer = styled.div`
  display: flex;

  gap: 1rem;

  color: ${(props) => props.theme["gray-100"]};
  font-family: "Roboto Mono", monospace;
  font-size: 10rem;
  line-height: 8rem;

  span {
    background: ${(props) => props.theme["gray-700"]};

    border-radius: 8px;
    padding: 2rem 1rem;
  }
`;

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  width: 4rem;
  padding: 2rem 0;

  color: ${(props) => props.theme["gray-500"]};

  overflow: hidden;
`;


export const StartCountdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.theme["green-500"]};
  border: 0;
  border-radius: 8px;

  width: 100%;
  padding: 1rem;
  gap: 0.5rem;

  color: ${(props) => props.theme["gray-100"]};;

  cursor: pointer;

  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-700"]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
