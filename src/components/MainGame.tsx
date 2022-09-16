import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { cpuPlay } from "../app/cardsSlice";
import { RootState } from "../app/store";
import { usePlayMutation } from "../app/api/apiSlice";

import CardsCpuLeft from "./CardsCpuLeft";
import CardsCpuRight from "./CardsCpuRight";
import CardsCpuTop from "./CardsCpuTop";
import CardsPlayer from "./CardsPlayer";
import ChooseColor from "./ChooseColor";
import Winner from "./Winner";
import MiddleCards from "./MiddleCards";
import MiddleButton from "./MiddleButton";

import styles from "../styles/App.module.scss";

function MainGame() {
  const dispatch = useDispatch();
  const winner = useSelector((state: RootState) => state.cards.winner);
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);
  const choosenColor = useSelector(
    (state: RootState) => state.cards.chooseColor
  );

  const [play] = usePlayMutation();

  useEffect(() => {
    const cpuTurn = async () => {
      if (winner === "" && nextPlayer !== playerId) {
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
      <div className={styles.container_top}>
        <CardsCpuTop />
        {nextPlayer && <p>PLAYER 3</p>}
      </div>

      <div className={styles.container_middle}>
        <div className={styles.playerTwo}>
          <CardsCpuLeft />
          {nextPlayer && <p>PLAYER 2</p>}
        </div>

        <div className={styles.middle_center}>
          <MiddleCards />
          <MiddleButton />
        </div>

        <div className={styles.playerFour}>
          {nextPlayer && <p>PLAYER 4</p>}
          <CardsCpuRight />
        </div>
      </div>

      <div className={styles.container_player}>
        {nextPlayer && <p>{playerId.toUpperCase()}</p>}
        <CardsPlayer />
      </div>
    </div>
  ) : (
    <Winner />
  );
}

export default MainGame;
