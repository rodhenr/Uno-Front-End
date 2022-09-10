import { createSlice } from "@reduxjs/toolkit";

interface ArrayPlayers {
  playerId: string;
  cards: string[];
}

interface State {
  cpuTopId: string;
  cpuLeftId: string;
  cpuRightId: string;
  deckEmpty: boolean;
  lastCard: string;
  lastColor: string;
  nextPlayer: string;
  playersCards: ArrayPlayers[];
  playerId: string;
  sessionId: string;
  winner: string;
}

const initialState: State = {
  cpuTopId: "",
  cpuLeftId: "",
  cpuRightId: "",
  deckEmpty: false,
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
      const {
        deckEmpty,
        lastCard,
        lastColor,
        nextPlayer,
        playersCards,
        winner,
      } = action.payload;

      state.deckEmpty = deckEmpty;
      state.lastCard = lastCard;
      state.lastColor = lastColor;
      state.nextPlayer = nextPlayer;
      state.playersCards = playersCards;
      state.winner = winner;
    },
    playerTurn: (state, action) => {
      const {
        deckEmpty,
        lastCard,
        lastColor,
        nextPlayer,
        playersCards,
        winner,
      } = action.payload;

      state.deckEmpty = deckEmpty;
      state.lastCard = lastCard;
      state.lastColor = lastColor;
      state.nextPlayer = nextPlayer;
      state.playersCards = playersCards;
      state.winner = winner;
    },
  },
});

export const { cpuPlay, newSession, playerTurn, startGame } =
  cardsSlice.actions;
export default cardsSlice.reducer;
