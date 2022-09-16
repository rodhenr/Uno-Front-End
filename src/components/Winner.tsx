import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import styles from "../styles/App.module.scss";

function Winner() {
  const winner = useSelector((state: RootState) => state.cards.winner);
  const cpuLeftId = useSelector((state: RootState) => state.cards.cpuLeftId);
  const cpuTopId = useSelector((state: RootState) => state.cards.cpuTopId);
  const cpuRightId = useSelector((state: RootState) => state.cards.cpuRightId);

  return (
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

export default Winner;
