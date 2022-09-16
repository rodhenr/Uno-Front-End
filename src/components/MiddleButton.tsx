import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../app/cardsSlice";
import { RootState } from "../app/store";
import { useStartGameMutation } from "../app/api/apiSlice";

import Next from "./Next";

import styles from "../styles/App.module.scss";

function MiddleButton() {
  const dispatch = useDispatch();

  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);

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
    <div>
      {nextPlayer === "" ? (
        <div className={styles.middle_single_option}>
          <button onClick={(e) => newGameStart(e)}>PLAY</button>
        </div>
      ) : (
        <Next />
      )}
    </div>
  );
}

export default MiddleButton;
