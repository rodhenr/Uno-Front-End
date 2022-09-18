import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { choose, playerTurn } from "../app/cardsSlice";
import { RootState } from "../app/store";

import { usePlayMutation } from "../app/api/apiSlice";

import styles from "../styles/Cards.module.scss";

interface Props {
  position: string;
}

interface ErrorType {
  data: {
    error: string | string[];
  };
  originalStatus: number;
}

function Cards({ position }: Props) {
  const dispatch = useDispatch();
  const [play] = usePlayMutation();
  const selectCards = useSelector(
    (state: RootState) => state.cards.playersCards
  );
  const playerId = useSelector((state: RootState) => state.cards.playerId);
  const cpuLeftId = useSelector((state: RootState) => state.cards.cpuLeftId);
  const cpuTopId = useSelector((state: RootState) => state.cards.cpuTopId);
  const cpuRightId = useSelector((state: RootState) => state.cards.cpuRightId);
  const sessionId = useSelector((state: RootState) => state.cards.sessionId);
  const playerCards = selectCards.filter((i) => i.playerId === playerId)[0];
  const cpuLeftCards = selectCards.filter((i) => i.playerId === cpuLeftId)[0];
  const cpuTopCards = selectCards.filter((i) => i.playerId === cpuTopId)[0];
  const cpuRightCards = selectCards.filter((i) => i.playerId === cpuRightId)[0];
  const nextPlayer = useSelector((state: RootState) => state.cards.nextPlayer);

  const getClassName = (cards: number) => {
    if (cards === 0) {
      return `${styles.cards}`;
    } else if (cards > 0 && cards <= 3) {
      return `${styles.cards} ${styles.maxThree}`;
    } else if (cards > 3 && cards <= 6) {
      return `${styles.cards} ${styles.maxSix}`;
    } else if (cards > 6 && cards <= 10) {
      return `${styles.cards} ${styles.maxTen}`;
    } else if (cards > 10) {
      return `${styles.cards} ${styles.max}`;
    }
  };

  const playCard = async (card: string) => {
    if (nextPlayer !== playerId) return;

    if (card.charAt(0) === "C" || card.charAt(0) === "F") {
      dispatch(choose({ chooseCard: card.substring(0, 2), chooseColor: true }));
      return;
    }

    try {
      const data = await play({ card, id: playerId, sessionId }).unwrap();
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
      if (error.originalStatus === 400) alert("Cartá Inválida!");
      if (error.originalStatus === 500)
        alert("Servidor com erro... Tente novamente.");
    }
  };

  const findData = (cardsArray: string[], position: string) => {
    const result =
      cardsArray.length > 0 && position === "bottom" ? (
        cardsArray.map((i) => {
          return (
            <div
              className={getClassName(cardsArray.length)}
              key={uuidv4()}
              onClick={() => {
                playCard(i);
              }}
            >
              <img src={`./images/${i}.png`} alt={i} />
            </div>
          );
        })
      ) : cardsArray.length > 0 ? (
        Array(cardsArray[0])
          .fill("")
          .map((i) => {
            return (
              <div
                className={getClassName(Number(cardsArray[0]))}
                key={uuidv4()}
              >
                <img src={"./images/back.png"} alt={i} />
              </div>
            );
          })
      ) : (
        <div className={styles.cards}></div>
      );

    return result;
  };

  const dataArray = [
    {
      cardsArray: playerCards?.cards ? playerCards.cards : [],
      position: "bottom",
      id: playerId,
      class: styles.container_player,
      class2: styles.playerOne,
    },
    {
      cardsArray: cpuLeftCards?.cards ? cpuLeftCards.cards : [],
      position: "left",
      id: "PLAYER 2",
      class: styles.container_left,
      class2: styles.playerTwo,
    },
    {
      cardsArray: cpuTopCards?.cards ? cpuTopCards.cards : [],
      position: "top",
      id: "PLAYER 3",
      class: styles.container_top,
      class2: styles.playerThree,
    },
    {
      cardsArray: cpuRightCards?.cards ? cpuRightCards.cards : [],
      position: "right",
      id: "PLAYER 4",
      class: styles.container_right,
      class2: styles.playerFour,
    },
  ];

  const getData = (position: string) => {
    const result = dataArray.filter((i) => i.position === position)[0];

    return nextPlayer !== "" ? (
      <div className={result.class2}>
        {(position === "right" || position === "bottom") && (
          <p>{result.id.toUpperCase()}</p>
        )}
        <div className={result.class}>
          {findData(result.cardsArray, position)}
        </div>
        {(position === "left" || position === "top") && (
          <p>{result.id.toUpperCase()}</p>
        )}
      </div>
    ) : (
      <div></div>
    );
  };

  return getData(position);
}

export default Cards;
