import { useDispatch, useSelector } from "react-redux";
import { cpuPlay, startGame } from "../app/cardsSlice";
import { RootState } from "../app/store";
import { usePlayMutation, useStartGameMutation } from "../app/api/apiSlice";
import CardsCpuLeft from "./CardsCpuLeft";
import CardsCpuRight from "./CardsCpuRight";
import CardsCpuTop from "./CardsCpuTop";
import CardsPlayer from "./CardsPlayer";
import CardsPlayed from "./CardsPlayed";
import Deck from "./Deck";
import styles from "../styles/App.module.scss";
import { useEffect, useState } from "react";

//CRIAR CARTAS FO E CH COLORIDAS
//CRIAR WINNER
//CRIAR TELA RECONEXÃO SESSION ANTERIOR
//CRIAR SAIR

function MainGame() {
  const dispatch = useDispatch();
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const cpuLeftId = useSelector((state: RootState) => state.cards.cpuLeftId);
  const cpuTopId = useSelector((state: RootState) => state.cards.cpuTopId);
  const cpuRightId = useSelector((state: RootState) => state.cards.cpuRightId);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);
  const [startMutation] = useStartGameMutation();
  const [play] = usePlayMutation();
  const [next, setNext] = useState("");

  const newGameStart = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const data = await startMutation({ playerId, sessionId }).unwrap();
      dispatch(
        startGame({
          cpuLeftId: data.cpuLeftId,
          cpuRightId: data.cpuRightId,
          cpuTopId: data.cpuTopId,
          lastCard: data.lastCard,
          lastColor: data.lastColor,
          nextPlayer: data.nextPlayer,
          playersCards: data.nextCards,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkNext = () => {
      if (nextPlayer === cpuLeftId) {
        setNext("Esquerdo");
      } else if (nextPlayer === cpuTopId) {
        setNext("Topo");
      } else if (nextPlayer === cpuRightId) {
        setNext("Direita");
      } else {
        setNext("Jogador");
      }
    };

    nextPlayer !== "" && checkNext();
  });

  useEffect(() => {
    const cpuTurn = async () => {
      if (nextPlayer !== playerId) {
        try {
          const data = await play({
            card: ".",
            id: nextPlayer,
            sessionId,
          }).unwrap();
          dispatch(
            cpuPlay({
              lastCard: data.lastCard,
              lastColor: data.lastColor,
              nextPlayer: data.nextPlayer,
              playersCards: data.nextCards,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    };

    cpuTurn();
  }, [nextPlayer]);

  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        <CardsCpuTop />
      </div>
      <div className={styles.container_middle}>
        <CardsCpuLeft />
        <div className={styles.middle_center}>
          <div className={styles.middle_cards}>
            <Deck />
            <CardsPlayed />
          </div>
          {nextPlayer === "" ? (
            <button onClick={(e) => newGameStart(e)}>PLAY</button>
          ) : (
            <p>Próximo: {next}</p>
          )}
        </div>
        <CardsCpuRight />
      </div>
      <div className={styles.maxWidth}>
        <CardsPlayer />
      </div>
    </div>
  );
}

export default MainGame;
