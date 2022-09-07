import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../app/cardsSlice";
import { RootState } from "../app/store";
import { useStartGameMutation } from "../app/api/apiSlice";
import CardsCpuLeft from "./CardsCpuLeft";
import CardsCpuRight from "./CardsCpuRight";
import CardsCpuTop from "./CardsCpuTop";
import CardsPlayer from "./CardsPlayer";
import CardsPlayed from "./CardsPlayed";
import Deck from "./Deck";
import styles from "../styles/App.module.scss";

function MainGame() {
  const dispatch = useDispatch();
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const [startMutation] = useStartGameMutation();

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
          <button onClick={(e) => newGameStart(e)}>PLAY</button>
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
