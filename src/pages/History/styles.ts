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
