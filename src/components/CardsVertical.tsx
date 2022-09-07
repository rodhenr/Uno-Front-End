import Card from "./Card";
import styles from "../styles/CardsVertical.module.scss";

interface Props {
  position: string;
}

function CardsVertical({ position }: Props) {
  const cards = ["back", "back", "back", "back", "back", "back", "back", "back", "back", "back"];

  return position === "left" ? (
    <div className={styles.containerLeft}>
      {cards.map((i) => {
        return <Card isPlayer={false} position={"left"} cardType={i} />;
      })}
    </div>
  ) : (
    <div className={styles.containerRight}>
      {cards.map((i) => {
        return <Card isPlayer={false} position={"right"} cardType={i}/>;
      })}
    </div>
  );
}

export default CardsVertical