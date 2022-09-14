import { useDispatch, useSelector } from "react-redux";
import { choose, playerTurn } from "../app/cardsSlice";
import { RootState } from "../app/store";
import { usePlayMutation } from "../app/api/apiSlice";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/CardsPlayer.module.scss";

function CardsPlayer() {
  const [play] = usePlayMutation();
  const dispatch = useDispatch();
  const selectCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const selectPlayer = useSelector((state: RootState) => state.cards.playerId);
  const playerCards = selectCards.filter((i) => i.playerId === selectPlayer);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);

  const playCard = async (card: string) => {
    if (nextPlayer !== selectPlayer) return;

    if (card.charAt(0) === "C" || card.charAt(0) === "F") {
      dispatch(choose({ chooseCard: card.substring(0, 2), chooseColor: true }));
      return;
    }

    try {
      const data = await play({ card, id: selectPlayer, sessionId }).unwrap();
      dispatch(
        playerTurn({
          lastCard: data.lastCard,
          lastColor: data.lastColor,
          nextPlayer: data.nextPlayer,
          playersCards: data.nextCards,
          winner: data.winner,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return nextPlayer ? (
    <div className={styles.container}>
      {playerCards.length > 0 ? (
        playerCards[0].cards.map((i) => {
          return (
            <div
              className={styles.cards}
              key={uuidv4()}
              onClick={() => {
                playCard(i);
              }}
            >
              <img src={`./images/${i}.png`} alt={i} />
            </div>
          );
        })
      ) : (
        <div className={styles.cards}></div>
      )}
    </div>
  ) : (
    <div></div>
  );
}
// Necessário enviar o número de cartas p/ usar no SCSS
export default CardsPlayer;
