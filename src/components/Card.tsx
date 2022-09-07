import styles from "../styles/Card.module.scss";

interface Props {
  cardType: string;
  isPlayer: boolean;
  position: string;
}

function Card({ cardType, isPlayer, position }: Props) {
  return isPlayer ? (
    <div className={styles.containerPlayer}>
      <img src={`./images/${cardType}.png`} alt={cardType} />
    </div>
  ) : position === "left" ? (
    <div className={styles.containerLeft}>
      <img src={`./images/${cardType}.png`} alt={cardType} />
    </div>
  ) : position === "right" ? (
    <div className={styles.containerRight}>
      <img src={`./images/${cardType}.png`} alt={cardType} />
    </div>
  ) : (
    <div className={styles.containerTop}>
      <img src={`./images/${cardType}.png`} alt={cardType} />
    </div>
  );
}

export default Card;
