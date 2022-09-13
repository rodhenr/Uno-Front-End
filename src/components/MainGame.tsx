import { useEffect, useState } from "react";
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

//OPÇÃO DE ESCOLHER QUAL COR AO USAR CH
//CRIAR FORMA DE RECONECTAR NA SESSION ANTERIOR (PASSAR COOKIE NO BACKEND?)
//PASSAR QUANTIDADE DE CARTAS PARA CSS
//FAZER AS JOGADAS ACONTECEREM PASSO A PASSO
//REFATORAR ESSE COMPONENTE

function MainGame() {
  const dispatch = useDispatch();
  const winner = useSelector((state: RootState) => state.cards.winner);
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
      if (winner === "" && nextPlayer !== playerId) {
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
              winner: data.winner,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    };

    cpuTurn();
  }, [nextPlayer]);

  return winner === "" ? (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        <CardsCpuTop />
        <p>PLAYER 3</p>
      </div>
      <div className={styles.container_middle}>
        <div className={styles.playerTwo}>
          <CardsCpuLeft />
          <p>PLAYER 2</p>
        </div>

        <div className={styles.middle_center}>
          <div className={styles.middle_cards}>
            <Deck />
            <CardsPlayed />
          </div>
          {nextPlayer === "" ? (
            <div className={styles.middle_single_option}>
              <button onClick={(e) => newGameStart(e)}>PLAY</button>
            </div>
          ) : (
            <div className={styles.middle_options}>
              <p>Turno: {next}</p>
            </div>
          )}
        </div>
        <div className={styles.playerFour}>
          <p>PLAYER 4</p>
          <CardsCpuRight />
        </div>
      </div>
      <div className={styles.maxWidth}>
        {nextPlayer && <p>{playerId.toUpperCase()}</p>}
        <CardsPlayer />
      </div>
    </div>
  ) : (
    <div className={styles.winner}>
      <p>
        {winner === cpuLeftId ? (
          <p>O vencedor foi o PLAYER 2!</p>
        ) : winner === cpuRightId ? (
          <p>O vencedor foi o Player4!</p>
        ) : winner === cpuTopId ? (
          <p>O vencedor foi o Player3!</p>
        ) : (
          <p>Você venceu!</p>
        )}
      </p>
    </div>
  );
}

export default MainGame;
