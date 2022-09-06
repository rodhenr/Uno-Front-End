import Card from "./Card";
import styles from "../styles/CardsHorizontal.module.scss";

interface Props {
  position: string;
}

function CardsHorizontal({ position }: Props) {
  const cardsPlayer = ["", "", "", "", "", "", "", "", ""];
  const cardsTop = ["", "", "", "", "", "", "", "", ""];

  return position === "down" ? (
    <div className={styles.containerDown}>
      {cardsPlayer.map((i) => {
        return <Card isPlayer={true} position={"down"} />;
      })}
    </div>
  ) : (
    <div className={styles.containerTop}>
      {cardsTop.map((i) => {
        return <Card isPlayer={false} position={"top"} />;
      })}
    </div>
  );
}

export default CardsHorizontal;
