import CardsPlayed from "./CardsPlayed";
import Deck from "./Deck";

import styles from "../styles/App.module.scss";

function MiddleCards() {
  return (
    <div className={styles.middle_cards}>
      <Deck />
      <CardsPlayed />
    </div>
  );
}

export default MiddleCards;
