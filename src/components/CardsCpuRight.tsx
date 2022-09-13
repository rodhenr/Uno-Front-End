import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/CardsCpuRight.module.scss";

function CardsCpuRight() {
  const selectCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const selectPlayer = useSelector(
    (state: RootState) => state.cards.cpuRightId
  );
  const cpuCards = selectCards.filter((i) => i.playerId === selectPlayer);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);

  return nextPlayer ? (
    <div className={styles.container}>
      {cpuCards.length > 0 ? (
        Array(cpuCards[0].cards[0])
          .fill("")
          .map((i) => {
            return (
              <div className={styles.cards} key={uuidv4()}>
                <img src={"./images/back.png"} alt={i} />
              </div>
            );
          })
      ) : (
        <div className={styles.cards}></div>
      )}
    </div>
  ) : (
    <div></div>
  );
}
// Necessário enviar o número de cartas p/ usar no SCSS
export default CardsCpuRight;
