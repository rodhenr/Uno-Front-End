import CardsHorizontal from "./components/CardsHorizontal";
import CardsPlayed from "./components/CardsPlayed";
import CardsVertical from "./components/CardsVertical";
import Deck from "./components/Deck";
import styles from "./styles/App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.maxWidth}>
        <CardsHorizontal position={"top"} />
      </div>
      <div className={styles.container_middle}>
        <CardsVertical position="left" />
        <div className={styles.middle_center}>
          <div className={styles.middle_cards}>
            <Deck />
            <CardsPlayed />
          </div>
          <button>PLAY</button>
        </div>
        <CardsVertical position="right" />
      </div>
      <div className={styles.maxWidth}>
        <CardsHorizontal position={"down"} />
      </div>
    </div>
  );
}

export default App;
