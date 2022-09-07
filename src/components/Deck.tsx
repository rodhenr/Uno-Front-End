import styles from "../styles/Deck.module.scss";

function Deck() {
  return <div className={styles.container}>
          <img src={`./images/back.png`} alt="deck" />
  </div>;
}

export default Deck;
