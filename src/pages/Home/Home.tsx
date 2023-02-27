import { createContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HandPalm, Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from "./styles";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setAmountSecondsPassedHandler: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm; // a função useForm retorna um objeto(que foi armazenada em newCycleForm), e podemos pegar o que iremos usar(e armazenar em constantes) com o object destructuring

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const setAmountSecondsPassedHandler = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  }

  const markCurrentCycleAsFinished = () => {
    setCycles((state) => // vamos informar que o ciclo foi encerrado, chamando a função que altera o estado dos ciclos(setCycles)
      state.map((cycle) => { // irá ercorrer todos os ciclos
        if (cycle.id === activeCycleId) {  // e verifica cada ciclo, se ele está ativo(é igual a activeCycleId)
          return { ...cycle, finishedDate: new Date() }; // se verdadeiro, retorna todos os dados do ciclo, adicionando a data de interrupção dele
        } else { // se não, só retorna a ciclo sem alterações
          return cycle;
        }
      })
    );
  }

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

  const task = watch("task"); // watch fica observando as alteções em task
  const isSubmitDisable = !task; // variável auxiliar para armazer um valor booleano, se task existe(não é null)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycleHandler)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setAmountSecondsPassedHandler
          }}
        >

          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCycleHandler} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
};
