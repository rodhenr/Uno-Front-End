import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { cpuPlay } from "../app/cardsSlice";
import { RootState } from "../app/store";
import { usePlayMutation } from "../app/api/apiSlice";

import ChooseColor from "./ChooseColor";
import Winner from "./Winner";
import MiddleCards from "./MiddleCards";
import MiddleButton from "./MiddleButton";

import styles from "../styles/App.module.scss";
import Cards from "./Cards";

// Refatorar código
// Fazer um CATCH correto
// Arrumar Winner quebrado

function MainGame() {
  const dispatch = useDispatch();
  const winner = useSelector((state: RootState) => state.cards.winner);
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);
  const playersCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const choosenColor = useSelector(
    (state: RootState) => state.cards.chooseColor
  );

  const [play] = usePlayMutation();

  useEffect(() => {
    const cpuTurn = async () => {
      if (playersCards.length > 0 && winner === "" && nextPlayer !== playerId) {
        setTimeout(async () => {
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
        }, 1000);
      }
    };

    cpuTurn();
  }, [nextPlayer]);

  return winner === "" ? (
    <div className={styles.container}>
      {choosenColor && <ChooseColor />}
      <Cards position="top" />

      <div className={styles.container_middle}>
        <Cards position="left" />

        <div className={styles.middle_center}>
          <MiddleCards />
          <MiddleButton />
        </div>

        <Cards position="right" />
      </div>

      <Cards position="bottom" />
    </div>
  ) : (
    <Winner />
  );
}

export default MainGame;
