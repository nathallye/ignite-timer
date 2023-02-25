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

- Para instalar o Styled Components iremos rodar os comandos seguintes:

```
> npm i styled-components
> npm i @types/styled-components
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

### Configurando temas

- Em `src` iremos criar uma pasta `styles` e dentro dela a pasta `themes`, nas pasta `themes` vamos criar uma arquivo chamado `default.ts`. Neste arquivo, iremos definir um tema padrão da nossa aplicação:

``` TS
export const defaultTheme = {
    white: "#FFF",

    "gray-100": "#E1E1E6",
    "gray-300": "#C4C4CC",
    "gray-400": "#8D8D99",
    "gray-500": "#7C7C8A",
    "gray-600": "#323238",
    "gray-700": "#29292E",
    "gray-800": "#202024",
    "gray-900": "#121214",

    "green-300": "#00B37E",
    "green-500": "#00875F",
    "green-700": "#015F43",

    "red-500": "#AB222E",
    "red-700": "#7A1921",

    "yellow-500": "#FBA94C"
}
```

- Agora, no componente principal(App) basta envolver os componentes que irão usar esse tema, pelo componente `ThemeProvider`:

``` TSX
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

import { Button } from "./components/Button/Button";

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
    </ThemeProvider>
  );
};
```

- Feito isso, conseguimos acessar esse tema via props:

``` TSX
import styled from "styled-components";

export const ButtonContainer = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background-color: ${props => props.theme["green-500"]};
  color: ${props => props.theme.white};
`;
```

#### Tipagem de temas

- Em `src` iremos criar uma pasta `@types` e dentro dela um arquivo chamado `styled.d.ts`(arquivo de definição de tipos):

``` TS
import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme; // pegando o tipo que o TS já infere

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
```

### Estilos globais

- Em `src/styles` iremos criar um arquivo chamado `global.ts`(em aplicação com styled component não iremos trabalhar com arquivos css):

``` TS
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme["green-500"]};
  }

  body {
    background: ${props => props.theme["gray-900"]};
    color: ${props => props.theme["gray-300"]};
  }

  body, input, textarea, button {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`;
```

- Agora, no componente principal(App) iremos importar esse componente `GlobalStyle`:

``` TSX
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";

import { GlobalStyle } from "./styles/global";
import { Button } from "./components/Button/Button";

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Button />
    </ThemeProvider>
  );
};
```

## React Router

O React Router permite "roteamento do lado do cliente". Navegação entre páginas.

- Vamos rodar o comando seguinte para instalar o pacote react router:

```
> npm install react-router-dom
```

### Criando os arquivos de rotas

- Em `src` vamos criar a pasta `pages` e nela os arquivos/componentes `History.tsx` e `Home.tsx`(serão nossas páginas).

- Feito isso, em `src` iremos criar um arquivo chamado `Router.tsx` que irá guardar as definições de rotas da aplicação:

``` TSX
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { History } from "./pages/History";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};
```

- Agora, iremos importá-lo dentro do componente principal(App) da aplicação (iremos excluir o componente Button, pois ele foi usado apenas como exemplo) envolvendo-o pelo componente `BrowserRouter` do React Router Dom:

``` TSX
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};
```

### Layout de rotas

- Em `src` vamos criar a pasta `layouts` e nela o arquivo/componente `DefaultLayout.tsx`:

``` TSX
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet /> {/* renderiza o conteúdo dinamicamente */}
    </>
  );
};
```

- Feito isso, no arquivo de rotas(`Router.tsx`) iremos envolver as rotas da aplicação, pela rota padrão(DefaultLayout):

``` TSX
import { Routes, Route } from "react-router-dom";

import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";
import { History } from "./pages/History";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
};
```

## React Hook Form

Documentação: https://react-hook-form.com/.

**Controlled x Uncontrolled**

- `Controlled`: matemos em tempo real a informação do input do usuário, guardado no estado, toda vez que uma alteração é feita o React irá recalcular todo conteúdo do componente do estado que mudou:

``` TSX
const [task, setTask] = useState("");
  {/*[...]*/}

  <TaskInput
    id="task"
    list="task-suggestions"
    placeholder="Dê um nome para o seu projeto"
    onChange={(e) => setTask(e.target.value)}
    value={task}
  />

  {/*[...]*/}
  <StartCountdownButton disabled={!task} type="submit">
    <Play size={24} />
    Começar
  </StartCountdownButton>
```

- `Uncontrolled`: buscamos a informação do input, somente quando precisarmos dela, sem controle de estado, usando as próprias funções JS.

- Vamos instalar o React Hook Form com o comando seguinte:

```
npm i react-hook-form
```

- Usando o React Hook Form:

``` TSX
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
// [...]

export const Home = () => {
  const { register, handleSubmit, watch } = useForm(); // a função useForm retorna um objeto, e podemos pegar o que iremos usar(e armazenar em constantes) com o object destructuring

  const createNewCycleHandler = (data: any) =>  {
    console.log(data); // data retorna os dados do input = {task: 'Assistir aulas de inglês', minutesAmount: 20}
  }

  const task = watch("task"); // watch fica observando as alteções em task
  const isSubmitDisable = !task; // variável auxiliar para armazer um valor booleano, se task existe(não é null)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")} {/**O operador spreed pega todas as ações que o register possui e passa para o TaskInput
              * function register(name: string) {
                return {
                  onChange: () => void,
                  onBlur: () => void,
                  onFocus: () => void,
                  ....
                }
              } *
            **/}
          />

          <datalist id="task-suggestions">
            {" "}
            {/* lista de opções para o input*/}
            <option value="Trabalhar" />
            <option value="Assistir aulas de inglês" />
            <option value="Assistir aulas de react" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })} {/*O operador spreed pega todas as ações que o register possui e passa para o MinutesAmountInput*/}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
};
```

### Biblioteca de validação de forms - Zod

Documentação: https://github.com/colinhacks/zod.

- Vamos rodar o comando seguinte para instalar e integrar o Zod ao React Hook Form:

```
npm i zod
npm i @hookform/resolvers
```

- Usando o Zod intregado ao React Hook Form para validar forms:

``` TSX
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// [...]

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

export const Home = () => {
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema) // passando uma configuração para resolver, que recebe o zodResolver com o schema de validações
  });

  // [...]

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        {/*[...]*/}
      </form>
    </HomeContainer>
  );
};
```

### TypeScript no Formulário com Zod

- Vamos usar o Zod para facilitar a passagem de valores padrão para o form:

**Obs.:**

`Interface` x `Type`: Interface - quando criamos um tipo do zero; Type quando criamos uma tipagem a partir de outra já existente.

Toda vez que precisamos utilizar uma variável JS dentro do TS precisamos converter em uma tipagem(algo específico do TS) com o `typeof`(antes dela) para que ele consiga entender.

``` TSX
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// [...]

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; // definindo os campos do form e seus tipos a partir a inferência do zod do schema de validação(newCycleFormValidationSchema)

export const Home = () => {
  const { register, handleSubmit, watch } = useForm<NewCycleFormData>({ // passando o tipo do form
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { // definindo valores padrão para o form
      task: "",
      minutesAmount: 0,
    },
  });

  // [...]

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        {/*[...]*/}
      </form>
    </HomeContainer>
  );
};
```

### Resetando formulário

- Vamos usar a função `reset` do `useForm` para resetar o formulário:

``` TSX
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// [...]

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const createNewCycleHandler = (data: any) => {
    console.log(data);
    reset();
  }

  // [...]

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        {/*[...]*/}
      </form>
    </HomeContainer>
  );
};
```

## Funcionalidades da aplicação

### Iniciando um novo ciclo

- Alterações no Home.tsx:

``` TSX
import { useState } from "react";
// [...]

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  // [...]

  const createNewCycleHandler = (data: NewCycleFormData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    // toda vez qua alteramos o estado e esse estado depende da sua versao anterior(antes de alterar),
    // é mais seguro setarmos o valor de estado em formato de função, onde pegamos o estado atual(state), copiamos e por fim adicionamos a nova informação
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id); // setamos o id do ciclo atual no estado activeCycleId

    reset();
  };

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // [...]

  console.log(activeCycle);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        <FormContainer>
          {/*[...]*/}
      </form>
    </HomeContainer>
  );
};
```

### Criando o Countdown

- Alterações no Home.tsx:

``` TSX
import { useState } from "react";
// [...]

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const createNewCycleHandler = (data: NewCycleFormData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    reset();
  };

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // se tiver um ciclo ativo, iremos converter o tempo em segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // se tiver um ciclo ativo, iremos subtrair do total de segundos do ciclos a quantidade de segundos que se passaram

  const minutesAmount = Math.floor(currentSeconds / 60); // convertendo a quantidade de segundos restantes para minutos, para mostrar em tela
  const secondsAmount = currentSeconds % 60; // pegando a quantidade de segundos que sobram na conversão para minutos

  const minutes = String(minutesAmount).padStart(2, "0"); // convertendo os minutos em string para usarmos o método padStart para informar que quando não tivermos 2 caracteres, iremos incluir um 0 na frente
  const seconds = String(secondsAmount).padStart(2, "0"); // convertendo os segundos em string para usarmos o método padStart para informar que quando não tivermos 2 caracteres, iremos incluir um 0 na frente

  // [...]

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        <FormContainer>
          {/*[...]*/}
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
};
```

### useEffect

Permite executar efeitos colaterais em componentes funcionais!

Esse hook recebe dois parâmetros, o primeiro vai ser o que ele chama de *EffectCallback*, que nada mais é que uma função que será chamada quando ele for gerar esse "efeito colateral" e o segundo parâmetro(opcional) é a lista de dependências que ele chama de *DependencyList*:

``` TSX

useEffect(() => { // function callback, que será chamada sempre que o(s) valor(es) passado no "DependencyList" (segundo parametro passado para a função) modificar
  // EffectCallback
}, []) // DependencyList
```

Quando não passamos nenhuma dependência para o *useEffect*, ele será renderizado uma única vez na criação do componente, podemos ser usado para realizar uma chamada para uma API por exemplo.


### Reduzindo o Countdown

- Para calcular a diferença entre duas datas em segundos, iremos baixar a biblioteca `date-fns` com o comando seguinteÇ

```
npm i date-fns
```

- Alterações no Home.tsx:

``` TSX
import { useEffect, useState } from "react";
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";
// [...]

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    if (activeCycle) { // se existir um ciclo ativo
      setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate), // calcula a diferença em segundos entre a data atual e a data que o ciclo começou
        )
      }, 1000); // a cada 1 segundo será calculado e setado um novo estado para amountSecondsPassed(setAmountSecondsPassed)
    }
  }, [activeCycle]); // toda vez que o estado de activeCycle for alterado, o useEffect será chamado

  const createNewCycleHandler = (data: NewCycleFormData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);

    reset();
  };

  // [...]

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        {/*[...]*/}
      </form>
    </HomeContainer>
  );
};
```
