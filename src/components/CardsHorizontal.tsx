import Card from "./Card";
import styles from "../styles/CardsHorizontal.module.scss";

interface Props {
  position: string;
}

function CardsHorizontal({ position }: Props) {
  const cardsPlayer = [
    "00B",
    "00B",
    "00B",
    "00B",
    "00B",
    "00B",
    "00B",
    "00B",
    "00B",
    "00B",
  ];
  const cardsTop = [
    "back",
    "back",
    "back",
    "back",
    "back",
    "back",
    "back",
    "back",
    "back",
    "back",
  ];

  return position === "down" ? (
    <div className={styles.containerDown}>
      {cardsPlayer.map((i) => {
        return <Card isPlayer={true} position={"down"} cardType={i} />;
      })}
    </div>
  ) : (
    <div className={styles.containerTop}>
      {cardsTop.map((i) => {
        return <Card isPlayer={false} position={"top"} cardType={i} />;
      })}
    </div>
  );
}

export default CardsHorizontal;
