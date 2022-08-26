import styles from "../styles/Card.module.scss";

interface Props {
  isPlayer: boolean;
  position: string;
}

function Card({ isPlayer, position }: Props) {
  return isPlayer ? (
    <div className={styles.containerPlayer}></div>
  ) : position === "left" ? (
    <div className={styles.containerLeft}></div>
  ) : position === "right" ? (
    <div className={styles.containerRight}></div>
  ) : (
    <div className={styles.containerTop}></div>
  );
}

export default Card;
