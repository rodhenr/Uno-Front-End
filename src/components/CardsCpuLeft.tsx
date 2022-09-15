import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/CardsCpuLeft.module.scss";

function CardsCpuLeft() {
  const selectCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const selectPlayer = useSelector((state: RootState) => state.cards.cpuLeftId);
  const cpuCards = selectCards.filter((i) => i.playerId === selectPlayer);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);
  const leftRef = useRef<HTMLDivElement>(null);

  const getClassName = () => {
    const length =
      leftRef.current !== null ? leftRef.current.childNodes.length : 0;
    console.log(length);

    if (length === 0) {
      return `${styles.cards}`;
    } else if (length > 0 && length <= 3) {
      return `${styles.cards} ${styles.maxThree}`;
    } else if (length > 3 && length <= 6) {
      return `${styles.cards} ${styles.maxSix}`;
    } else if (length > 6 && length <= 10) {
      return `${styles.cards} ${styles.maxTen}`;
    } else if (length > 10) {
      return `${styles.cards} ${styles.max}`;
    }
  };

  return nextPlayer ? (
    <div className={styles.container} ref={leftRef}>
      {cpuCards.length > 0 ? (
        Array(cpuCards[0].cards[0])
          .fill("")
          .map((i) => {
            return (
              <div className={getClassName()} key={uuidv4()}>
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
export default CardsCpuLeft;
