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
    setActiveCycleId(id); // toda vez que um novo ciclo for criado, setamos o id do ciclo atual no estado activeCycleId

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

Agora que conseguimos tornar um ciclo em ativo, vamos criar o código responsável por calcular e exibir em tela o valor restante para finalização do ciclo.

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

Agora continuar o desenvolvimento do nosso countdown, criando a lógica responsável por diminuir o contador de tempo.

- Para calcular a diferença entre duas datas em segundos, iremos baixar a biblioteca `date-fns` com o comando seguintes:

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

### Resolvendo bugs no Countdown - useEffect

- Alterações no Home.tsx:

``` TSX
import { useEffect, useState } from "react";
// [...]

export const Home = () => {
  // [...]

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number; // criando a variável interval

    if (activeCycle) { // se existir um ciclo ativo
      interval = setInterval(() => { // atribuindo o intervalo da função set interval a variável interval
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate) // calcula a diferença em segundos entre a data atual e a data que o ciclo começou
        );
      }, 1000); // a cada 1 segundo será calculado e setado um novo estado para amountSecondsPassed(setAmountSecondsPassed)
    }

    return () => {
      clearInterval(interval); // quando o useEffect é chamado novamente, a variável interval é limpa
    };
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
    setAmountSecondsPassed(0); // toda vez que um novo ciclo for criado, zeramos o contador de quantos segundos já se passaram

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

### Mudando o title da página

Vamos adicionar uma funcionalidade que reflete o tempo restante no título da página.

- Alterações no Home.tsx:

``` TSX
import { useEffect, useState } from "react";
// [...]

export const Home = () => {
  // [...]

  useEffect(() => {
    if (activeCycle) { // se existir um ciclo ativo
      document.title = `${minutes}:${seconds}`; // iremos alterar o título da página para aquantidade de minutos e segundos restantes
    }
  }, [minutes, seconds, activeCycle]); // sempre que os minutos, segundos, e o ciclo mudarem

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        {/*[...]*/}
      </form>
    </HomeContainer>
  );
};
```

### Interromper ciclo

Vamos desenvolver a funcionalidade de interromper um ciclo para cadastrarmos um outro, e também anotar a data para manter um histórico de quando o ciclo foi interrompido.

- Alterações no Home.tsx:

``` TSX
import { useEffect, useState } from "react";
import { HandPalm, Play } from "phosphor-react";
// [...]

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

export const Home = () => {
  // [...]

  const interruptCycleHandler = () => {
    setCycles( // ao interromper um ciclo, será chamada a função que altera o estado dos ciclos(setCycles)
      cycles.map((cycle) => { // irá ercorrer todos os ciclos
        if (cycle.id === activeCycleId) { // e verifica cada ciclo, se ele está ativo(é igual a activeCycleId)
          return { ...cycle, interruptedDate: new Date() }; // se verdadeiro, retorna todos os dados do ciclo, adicionando a data de interrupção dele
        } else { // se não, só retorna a ciclo sem alterações
          return cycle;
        }
      })
    );
    setActiveCycleId(null); // por fim, muda o estado da variável que armazena o id do ciclo ativo para null
  };

  // [...]

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle} /*se activeCycle for verdadeiro, irá desabilitar o input*/}
            {...register("task")}
          />
          <datalist id="task-suggestions">
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
            disabled={!!activeCycle} {/*se activeCycle for verdadeiro, irá desabilitar o input*/}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        {/*[...]*/}

        {activeCycle ? ( {/*se o ciclo estiver ativo*/}
          <StopCountdownButton onClick={interruptCycleHandler} type="button"> {/*renderiza o butão de Interromper*/}
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (  {/*se não, renderiza o butão de Começar*/}
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
```

### Ciclo completo

Para também ter o histórico de todos os ciclos que foram completos, vamos agora desenvolver a funcionalidade que vai anotar a data de finalização de um ciclo quando ele chegar ao fim.

- Alterações no Home.tsx:

``` TSX
import { useEffect, useState } from "react";
// [...]

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export const Home = () => {
  // [...]
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // se tiver um ciclo ativo, iremos converter o tempo em segundos

  useEffect(() => {
    let interval: number; // criando a variável interval

    if (activeCycle) { // se existir um ciclo ativo
      interval = setInterval(() => { // atribuindo o intervalo da função set interval a variável interval
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate); // calcula a diferença em segundos entre a data atual e a data que o ciclo começou, e armazena o resultado na variável

        if (secondsDifference >= totalSeconds) { // se a diferença de segundos, for maior ou igual que o total de segundos
          setCycles((state) => // vamos informar que o ciclo foi encerrado, chamando a função que altera o estado dos ciclos(setCycles)
            state.map((cycle) => { // irá ercorrer todos os ciclos
              if (cycle.id === activeCycleId) {  // e verifica cada ciclo, se ele está ativo(é igual a activeCycleId)
                return { ...cycle, finishedDate: new Date() }; // se verdadeiro, retorna todos os dados do ciclo, adicionando a data de interrupção dele
              } else { // se não, só retorna a ciclo sem alterações
                return cycle;
              }
            })
          )
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);

        } else { // se a diferença de segundos, não for maior ou igual que o total de segundos
          setAmountSecondsPassed(secondsDifference); // vamos continuar setando o valor de quantos segundos se passaram
        }
      }, 1000); // a cada 1 segundo será calculado e setado um novo estado para amountSecondsPassed(setAmountSecondsPassed)
    }

    return () => {
      clearInterval(interval); // quando o useEffect é chamado novamente, a variável interval é limpa
    };
  }, [activeCycle, totalSeconds, activeCycleId]); // toda vez que o estado de activeCycle for alterado, o useEffect será chamado

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

### Separando componentes

Agora vamos começar a criar uma organização melhor para o nosso projeto, para tirar toda a responsabilidade de somente da página Home e separar em diversos componentes que possuem responsabilidades diferentes. Para isso, criamos os componentes `Countdown`(que ficará responsável pelo *CountdownContainer* e seu conteúdo e aplicações de estilos) e `NewCyclewForm`(que ficará responsável pelo *FormContainer* e seu conteúdo e aplicações de estilos).

### Prop Drilling no React

O Prop Drilling é um termo utilizado para quando temos propriedades que estão se repassando em diversas camadas da nossa árvore de componentes.
Solução: Context API -> Permite compartilhamos informações entre vários componentes ao mesmo tempo.

### Convertendo o Countdown para contexto

### Convertendo o NewCycleForm para contexto

### Contexto entre rotas

#### Reset no formulário

### Listagem do histórico

#### Formatação de data

### Criando reducer de ciclos

Agora vamos aprender um novo conceito, chamado de `userReducer` que serve para armazenar informações mais complexas e que demandam muitas Iremos aplicar o `userReducer` nos ciclos da nossa aplicação.

`useReducer`: Uma alternativa para `useState`. Aceita um reducer do tipo `(state, action) => newState` e retorna o estado atual, junto com um método `dispatch`.

*useReducer é geralmente preferível em relação ao useState* quando se tem uma *lógica de estado complexa* que envolve múltiplos sub-valores, ou *quando o próximo estado depende do estado anterior*. useReducer também possibilita a otimização da performance de componentes que disparam atualizações profundas porque é possível passar o dispatch para baixo, ao invés de callbacks.

- Alterações em `CycleContext`:

``` TSX
import { createContext, ReactNode, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setAmountSecondsPassedHandler: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycleHandler: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    switch (action.type) {
      case "ADD_NEW_CYCLE":
        return {
          ...state,
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.newCycle.id
        }

      case "INTERRUPT_CURRENT_CYCLE":
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null
        }

      case "MARK_CURRENT_CYCLE_AS_FINISHED":
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() };
            } else {
              return cycle;
            }
          }),
          activeCycleId: null
        }

      default:
        return state;
    }
  },
  {
    cycles: [],
    activeCycleId: null
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const setAmountSecondsPassedHandler = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    });
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    });

    setAmountSecondsPassed(0); // zeramos o contador de quantos segundos já se passaram
  };

  const interruptCycleHandler = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    });
  };

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setAmountSecondsPassedHandler,
        createNewCycle,
        interruptCycleHandler
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
```
