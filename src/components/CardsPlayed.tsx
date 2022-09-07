import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "../styles/CardsPlayed.module.scss";

function CardsPlayed() {
  const lastCard = useSelector((state: RootState) => state.cards.lastCard);

  return (
    <div className={styles.container}>
      {lastCard && <img src={`./images/${lastCard}.png`} alt={lastCard} />}
    </div>
  );
}

export default CardsPlayed;
