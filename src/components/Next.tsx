import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../app/store";

import styles from "../styles/App.module.scss";

function Next() {
  const [next, setNext] = useState("");

  const cpuLeftId = useSelector((state: RootState) => state.cards.cpuLeftId);
  const cpuTopId = useSelector((state: RootState) => state.cards.cpuTopId);
  const cpuRightId = useSelector((state: RootState) => state.cards.cpuRightId);
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);

  useEffect(() => {
    const checkNext = () => {
      if (nextPlayer === cpuLeftId) {
        setNext("Player 2");
      } else if (nextPlayer === cpuTopId) {
        setNext("Player 3");
      } else if (nextPlayer === cpuRightId) {
        setNext("Player 4");
      } else {
        setNext(playerId);
      }
    };

    nextPlayer !== "" && checkNext();
  });

  return (
    <div className={styles.middle_options}>
      <p>Turno: {next}</p>
    </div>
  );
}

export default Next;
