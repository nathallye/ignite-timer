import styled from "styled-components";

export const HistoryContainer = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 3.5rem;

  h1 {
    color: ${(props) => props.theme["gray-100"]};
    font-size: 1.5rem;
  }
`;

export const HistoryList = styled.div`
  flex: 1;

  margin-top: 2rem;

  overflow: auto; /*Se o elemento for mais que a tela, sera gerado uma barra de rolagem*/

  table {
    border-collapse: collapse;

    width: 100%;
    min-width: 600px;

    th {
      background-color: ${(props) => props.theme["gray-600"]};

      padding: 1rem;

      color: ${(props) => props.theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;
      text-align: left;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(props) => props.theme["gray-700"]};
      border-top: 4px solid ${(props) => props.theme["gray-800"]};

      padding: 1rem;

      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

const STATUS_COLORS = {
  yellow: "yellow-500",
  green: "green-500",
  red: "red-500"
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS; /*As cores são as chaves(keys) do (tipo - typeof) objeto STATUS_COLORS*/
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;

  gap: 0.5rem;

  &::before { /*Adiciona um novo elemento na antes(before) do elemento(nesse caso, do span)*/
    content: "";

    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
    border-radius: 50%;

    width: 0.5rem;
    height: 0.5rem;
  }
`;
