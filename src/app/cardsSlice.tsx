import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ArrayPlayers {
  playerId: string;
  cards: string[];
}

interface State {
  chooseColor: boolean;
  chooseCard: string;
  cpuTopId: string;
  cpuLeftId: string;
  cpuRightId: string;
  lastCard: string;
  lastColor: string;
  nextPlayer: string;
  playersCards: ArrayPlayers[];
  playerId: string;
  sessionId: string;
  winner: string;
}

const initialState: State = {
  chooseColor: false,
  chooseCard: "",
  cpuTopId: "",
  cpuLeftId: "",
  cpuRightId: "",
  lastCard: "",
  lastColor: "",
  nextPlayer: "",
  playersCards: [],
  playerId: "",
  sessionId: "",
  winner: "",
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    newSession: (state, action) => {
      state.sessionId = action.payload.sessionId;
      state.playerId = action.payload.playerId;
    },
    startGame: (state, action) => {
      const {
        cpuTopId,
        cpuLeftId,
        cpuRightId,
        lastCard,
        lastColor,
        nextPlayer,
        playersCards,
      } = action.payload;

      state.cpuTopId = cpuTopId;
      state.cpuLeftId = cpuLeftId;
      state.cpuRightId = cpuRightId;
      state.lastCard = lastCard;
      state.lastColor = lastColor;
      state.nextPlayer = nextPlayer;
      state.playersCards = playersCards;
    },
    cpuPlay: (state, action) => {
      const { lastCard, lastColor, nextPlayer, playersCards, winner } =
        action.payload;

      state.lastCard = lastCard;
      state.lastColor = lastColor;
      state.nextPlayer = nextPlayer;
      state.playersCards = playersCards;
      state.winner = winner;
    },
    playerTurn: (state, action) => {
      const { lastCard, lastColor, nextPlayer, playersCards, winner } =
        action.payload;

      state.lastCard = lastCard;
      state.lastColor = lastColor;
      state.nextPlayer = nextPlayer;
      state.playersCards = playersCards;
      state.winner = winner;
    },
    choose: (
      state,
      action: PayloadAction<{ chooseCard: string; chooseColor: boolean }>
    ) => {
      state.chooseCard = action.payload.chooseCard;
      state.chooseColor = action.payload.chooseColor;
    },
  },
});

export const { choose, cpuPlay, newSession, playerTurn, startGame } =
  cardsSlice.actions;
export default cardsSlice.reducer;
