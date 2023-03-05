import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { differenceInSeconds } from "date-fns";

import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction
} from "../reducers/cycles/actions";

interface CreateCycleData {
  task: string;
  minutesAmount: number;
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

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null
  }, (initialState) => { // initialState é exatamente o valor do segundo parâmetro do reducer
    const storedStateAsJSON = localStorage.getItem("@ignite-timer:cycles-state-v1.0.0");

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON);
    }

    return initialState;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState); // local storage só salva dados em formato de string

    localStorage.setItem("@ignite-timer:cycles-state-v1.0.0", stateJSON);
  }, [cyclesState]);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  const setAmountSecondsPassedHandler = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const markCurrentCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id: id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0); // zeramos o contador de quantos segundos já se passaram
  };

  const interruptCycleHandler = () => {
    dispatch(interruptCurrentCycleAction());
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
