# Ignite Timer

## Criando um projeto React com o Vite

Para a criação do projeto React com o Vite utilizei o passo a passo que consta na documentação do Vite: https://vitejs.dev/guide/;

- Primeiramente, vamos executar o comando seguinte:

```
> npm create vite@latest
```

- Feito isso, temos que inserir o nome do projeto, selecionar o framework(React) e a variante (JS ou TS).

- Para abrirmos a aplicação, vamos primeiro instalar as dependências e em seguida rodar:

```
> npm install
> npm run dev
```

## Styled Components

- Para instalar o Styled Components iremos rodar os comandos seguintes?

```
npm i styled-components
npm i @types/styled-components
```

- O que o Styled Components resolve? É muito comum dentro do React precisarmos de estilizações que são baseadas em informações enviadas via props. Exemplo, temos um componente Button que a sua cor de fundo irá variar de acordo com a propriedade enviada pelo seu componente pai.

- `Button.tsx`:

``` TSX
import styles from "./Button.module.css";

interface ButtonProps {
  varient?: "primary" | "secondary" | "success" | "danger";
}

export const Button = ({ varient = "primary" }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[varient]}`}>Button</button>
  );
};
```

- `Button.module.css`:

``` CSS
.button {
  width: 100px;
  height: 40px;
}

.primary {
  background: purple;
}

.secondary {
  background: gray;
}

.success {
  background: green;
}

.danger {
  background: red;
}
```

- `App.tsx`:

``` TSX
import { Button } from "./components/Button/Button";

import styles from "./App.module.css";

import "./global.css";

export const App = () => {
  return (
    <>
      <Button varient="primary" />
      <Button varient="secondary" />
      <Button varient="success" />
      <Button varient="danger" />
      <Button />
    </>
  );
};
```

- Podemos simplificar o código com o Styled Components, assim...

- `Button.tsx`:

``` TSX
import { ButtonContainer, ButtonVariant } from "./Button.styles";

interface ButtonProps {
  variant?: ButtonVariant;
}

export const Button = ({ variant = "primary" }: ButtonProps) => {
  return (
    <ButtonContainer variant={variant}>Enviar</ButtonContainer>
  );
};
```

- `Button.styles.ts`:

``` TS
import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green"
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  ${props => {
    return css`
      background-color: ${buttonVariants[props.variant]}
    `
  }}
`;
```
