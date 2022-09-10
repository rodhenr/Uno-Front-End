import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "../styles/CardsPlayed.module.scss";

function CardsPlayed() {
  const lastCard = useSelector((state: RootState) => state.cards.lastCard);
  const lastColor = useSelector((state: RootState) => state.cards.lastColor);

  return (
    <div className={styles.container}>
      {lastCard ? (
        lastCard.substring(0, 2) === "FO" ||
        lastCard.substring(0, 2) === "CH" ? (
          <img
            src={`./images/${lastCard.substring(0, 2)}${lastColor}.png`}
            alt={lastCard}
          />
        ) : (
          <img src={`./images/${lastCard}.png`} alt={lastCard} />
        )
      ) : null}
    </div>
  );
}

export default CardsPlayed;
