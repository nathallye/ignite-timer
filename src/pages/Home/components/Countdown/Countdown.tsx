import { useContext, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

import { CyclesContext } from "../../../../contexts/CyclesContext";

import { CountdownContainer, Separator } from "./styles";


export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setAmountSecondsPassedHandler
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; // se tiver um ciclo ativo, iremos converter o tempo em segundos

  useEffect(() => {
    let interval: number; // criando a variável interval

    if (activeCycle) { // se existir um ciclo ativo
      interval = setInterval(() => { // atribuindo o intervalo da função set interval a variável interval
        const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate)); // calcula a diferença em segundos entre a data atual e a data que o ciclo começou, e armazena o resultado na variável

        if (secondsDifference >= totalSeconds) { // se a diferença de segundos, for maior ou igual que o total de segundos
          markCurrentCycleAsFinished();

          setAmountSecondsPassedHandler(totalSeconds);
          clearInterval(interval);

        } else { // se a diferença de segundos, não for maior ou igual que o total de segundos
          setAmountSecondsPassedHandler(secondsDifference); // vamos continuar setando o valor de quantos segundos se passaram
        }
      }, 1000); // a cada 1 segundo será calculado e setado um novo estado para amountSecondsPassed(setAmountSecondsPassed)
    }

    return () => {
      clearInterval(interval); // quando o useEffect é chamado novamente, a variável interval é limpa
    };
  }, [activeCycle, totalSeconds, activeCycleId]); // toda vez que o estado de activeCycle for alterado, o useEffect será chamado

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; // se tiver um ciclo ativo, iremos subtrair do total de segundos do ciclos a quantidade de segundos que se passaram

  const minutesAmount = Math.floor(currentSeconds / 60); // convertendo a quantidade de segundos restantes para minutos, para mostrar em tela
  const secondsAmount = currentSeconds % 60; // pegando a quantidade de segundos que sobram na conversão para minutos

  const minutes = String(minutesAmount).padStart(2, "0"); // convertendo os minutos em string para usarmos o método padStart para informar que quando não tivermos 2 caracteres, iremos incluir um 0 na frente
  const seconds = String(secondsAmount).padStart(2, "0"); // convertendo os segundos em string para usarmos o método padStart para informar que quando não tivermos 2 caracteres, iremos incluir um 0 na frente

  useEffect(() => {
    if (activeCycle) {
      // se existir um ciclo ativo
      document.title = `${minutes}:${seconds}`; // iremos alterar o título da página para aquantidade de minutos e segundos restantes
    }
  }, [minutes, seconds, activeCycle]); // sempre que os minutos, segundos, e o ciclo mudarem

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
};
