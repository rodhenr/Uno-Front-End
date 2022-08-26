import CardsHorizontal from "./components/CardsHorizontal";
import CardsPlayed from "./components/CardsPlayed";
import CardsVertical from "./components/CardsVertical";
import Deck from "./components/Deck";
import styles from "./styles/App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <div>
        <CardsHorizontal />
      </div>
      <div className={styles.container_middle}>
        <CardsVertical />
        <div className={styles.middle_center}>
          <Deck />
          <CardsPlayed />
        </div>
        <CardsVertical />
      </div>
      <div>
        <CardsHorizontal />
      </div>
    </div>
  );
}

export default App;
