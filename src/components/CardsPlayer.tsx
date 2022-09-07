import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "../styles/CardsPlayer.module.scss";

function CardsPlayer() {
  const selectCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const selectPlayer = useSelector((state: RootState) => state.cards.playerId);

  const playerCards = selectCards.filter((i) => i.playerId === selectPlayer);

  return (
    <div className={styles.container}>
      {playerCards.length > 0 ? (
        playerCards[0].cards.map((i) => {
          return (
            <div className={styles.cards}>
              <img src={`./images/${i}.png`} alt={i} />
            </div>
          );
        })
      ) : (
        <div className={styles.cards}></div>
      )}
    </div>
  );
}
// Necessário enviar o número de cartas p/ usar no SCSS
export default CardsPlayer;
