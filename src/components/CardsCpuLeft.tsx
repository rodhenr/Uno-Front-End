import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import styles from "../styles/CardsCpuLeft.module.scss";

function CardsCpuLeft() {
  const selectCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const selectPlayer = useSelector((state: RootState) => state.cards.cpuLeftId);
  const cpuCards = selectCards.filter((i) => i.playerId === selectPlayer);

  console.log(cpuCards[0].cards[0])

  return (
    <div className={styles.container}>
      {cpuCards.length > 0 ? (
        Array(cpuCards[0].cards[0]).fill("")
          .map((i) => {
            return (
              <div className={styles.cards}>
                <img src={"./images/back.png"} alt={i} />
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
export default CardsCpuLeft;
