import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { playerTurn } from "../app/cardsSlice";
import { useBuyCardMutation } from "../app/api/apiSlice";
import styles from "../styles/Deck.module.scss";

function Deck() {
  const dispatch = useDispatch();
  const [buy] = useBuyCardMutation();
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);
  const deckEmpty = useSelector((state: RootState) => state.cards.deckEmpty);

  const buyNewCard = async () => {
    if (nextPlayer !== playerId) return;

    try {
      const data = await buy({ id: playerId, sessionId }).unwrap();
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

  return deckEmpty ? (
    <div className={styles.noCards}></div>
  ) : (
    <div
      className={styles.container}
      onClick={() => {
        buyNewCard();
      }}
    >
      <img src={`./images/back.png`} alt="deck" />
    </div>
  );
}

export default Deck;
