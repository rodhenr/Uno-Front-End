import { useDispatch, useSelector } from "react-redux";
import { choose, playerTurn } from "../app/cardsSlice";
import { RootState } from "../app/store";

import { usePlayMutation } from "../app/api/apiSlice";

import styles from "../styles/App.module.scss";

interface ErrorType {
  data: {
    error: string | string[];
  };
  originalStatus: number;
}

function ChooseColor() {
  const dispatch = useDispatch();
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);
  const choosenCard = useSelector((state: RootState) => state.cards.chooseCard);

  const [play] = usePlayMutation();

  const chooseFunc = async (color: string) => {
    if (nextPlayer !== playerId || choosenCard === "") return;

    const newCard = choosenCard + color;

    try {
      const data = await play({
        card: newCard,
        id: playerId,
        sessionId,
      }).unwrap();
      dispatch(choose({ chooseCard: "", chooseColor: false }));
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
      const error = err as ErrorType;
      if (error.originalStatus === 500)
        alert("Servidor com erro... Tente novamente.");
    }
  };

  return (
    <div className={styles.container_choose}>
      <p>Escolha uma cor</p>
      <div className={styles.choose}>
        <div
          className={styles.choose_green}
          onClick={() => {
            chooseFunc("G");
          }}
        ></div>
        <div
          className={styles.choose_yellow}
          onClick={() => {
            chooseFunc("Y");
          }}
        ></div>
        <div
          className={styles.choose_red}
          onClick={() => {
            chooseFunc("R");
          }}
        ></div>
        <div
          className={styles.choose_blue}
          onClick={() => {
            chooseFunc("B");
          }}
        ></div>
      </div>
      <button
        className={styles.choose_button}
        onClick={() => {
          dispatch(choose({ chooseCard: "", chooseColor: false }));
        }}
      >
        CANCELAR
      </button>
    </div>
  );
}

export default ChooseColor;
