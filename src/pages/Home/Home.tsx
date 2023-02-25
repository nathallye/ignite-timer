import { useEffect, useState } from "react";
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { differenceInSeconds } from "date-fns";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

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
  }); // a função useForm retorna um objeto, e podemos pegar o que iremos usar(e armazenar em constantes) com o object destructuring

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

    // toda vez qua alteramos o estado e esse estado depende da sua versão anterior(antes de alterar),
    // é mais seguro setarmos o valor de estado em formato de função, onde pegamos o estado atual(state), copiamos e por fim adicionamos a nova informação
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id); // setamos o id do ciclo atual no estado activeCycleId
    setAmountSecondsPassed(0); // zeramos o contador de quantos segundos já se passaram

    reset();
  };

  //const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // se tiver um ciclo ativo, iremos converter o tempo em segundos
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // se tiver um ciclo ativo, iremos subtrair do total de segundos do ciclos a quantidade de segundos que se passaram

  const minutesAmount = Math.floor(currentSeconds / 60); // convertendo a quantidade de segundos restantes para minutos, para mostrar em tela
  const secondsAmount = currentSeconds % 60; // pegando a quantidade de segundos que sobram na conversão para minutos

  const minutes = String(minutesAmount).padStart(2, "0"); // convertendo os minutos em string para usarmos o método padStart para informar que quando não tivermos 2 caracteres, iremos incluir um 0 na frente
  const seconds = String(secondsAmount).padStart(2, "0"); // convertendo os segundos em string para usarmos o método padStart para informar que quando não tivermos 2 caracteres, iremos incluir um 0 na frente

  const task = watch("task"); // watch fica observando as alteções em task
  const isSubmitDisable = !task; // variável auxiliar para armazer um valor booleano, se task existe(não é null)

  useEffect(() => {
    if (activeCycle) { // se existir um ciclo ativo
      document.title = `${minutes}:${seconds}`; // iremos alterar o título da página para aquantidade de minutos e segundos restantes
    }
  }, [minutes, seconds, activeCycle]); // sempre que os minutos, segundos, e o ciclo mudarem

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          />{" "}
          {/*O operador spreed pega todas as informações que o register possui e passa para o TaskInput*/}
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
            {...register("minutesAmount", { valueAsNumber: true })}
          />{" "}
          {/*O operador spreed pega todas as informações que o register possui e passa para o MinutesAmountInput*/}
          <span>minutos.</span>
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
