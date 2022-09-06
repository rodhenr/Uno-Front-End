import Card from "./Card";
import styles from "../styles/CardsVertical.module.scss";

interface Props {
  position: string;
}

function CardsVertical({ position }: Props) {
  const cards = ["", "", "", "", "", "", "", "", ""];

  return position === "left" ? (
    <div className={styles.containerLeft}>
      {cards.map((i) => {
        return <Card isPlayer={false} position={"left"} />;
      })}
    </div>
  ) : (
    <div className={styles.containerRight}>
      {cards.map((i) => {
        return <Card isPlayer={false} position={"right"} />;
      })}
    </div>
  );
}

export default CardsVertical