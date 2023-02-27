import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const NewCycleForm = () => {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  }); // a função useForm retorna um objeto, e podemos pegar o que iremos usar(e armazenar em constantes) com o object destructuring

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register("task")}
      />
      {/*O operador spreed pega todas as informações que o register possui e passa para o TaskInput*/}
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
      />
      {/*O operador spreed pega todas as informações que o register possui e passa para o MinutesAmountInput*/}
      <span>minutos.</span>
    </FormContainer>
  );
};
