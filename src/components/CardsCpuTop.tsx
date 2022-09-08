import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/CardsCpuTop.module.scss";

function CardsCpuTop() {
  const selectCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const selectPlayer = useSelector((state: RootState) => state.cards.cpuTopId);
  const cpuCards = selectCards.filter((i) => i.playerId === selectPlayer);

  return (
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
  );
}
// Necessário enviar o número de cartas p/ usar no SCSS
export default CardsCpuTop;
