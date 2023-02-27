import { useContext } from "react";
import { useFormContext } from "react-hook-form";

import { CyclesContext } from "../../Home";

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />{/*O operador spreed pega todas as informações que o register possui e passa para o TaskInput*/}

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
        disabled={!!activeCycle}
        {...register("minutesAmount", { valueAsNumber: true })}
      />{/*O operador spreed pega todas as informações que o register possui e passa para o MinutesAmountInput*/}

      <span>minutos.</span>
    </FormContainer>
  );
};
