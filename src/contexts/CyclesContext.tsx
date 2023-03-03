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
    if (action.type === 'ADD_NEW_CYCLE') {
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    }

    if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
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
    }

    return state;
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

    /*
    setCycles((state) => // vamos informar que o ciclo foi encerrado, chamando a função que altera o estado dos ciclos(setCycles)
      state.map((cycle) => { // irá ercorrer todos os ciclos
        if (cycle.id === activeCycleId) {  // e verifica cada ciclo, se ele está ativo(é igual a activeCycleId)
          return { ...cycle, finishedDate: new Date() }; // se verdadeiro, retorna todos os dados do ciclo, adicionando a data de interrupção dele
        } else { // se não, só retorna a ciclo sem alterações
          return cycle;
        }
      })
    );
    */
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
