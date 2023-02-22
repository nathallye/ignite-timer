import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export const Home = () => {
  const { register, handleSubmit, watch } = useForm(); // a função useForm retorna um objeto, e podemos pegar o que iremos usar(e armazenar em constantes) com o object destructuring

  function handleCreateNewCycle(data: any) {
    console.log(data); // data retorna os dados do input = {task: 'Assistir aulas de inglês', minutesAmount: 20}
  }

  const task = watch("task"); // watch fica observando as alteções em task
  const isSubmitDisable = !task; // variável auxiliar para armazer um valor booleano, se task existe(não é null)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          /> {/*O operador spreed pega todas as informações que o register possui e passa para o TaskInput*/}

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
          /> {/*O operador spreed pega todas as informações que o register possui e passa para o MinutesAmountInput*/}

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
