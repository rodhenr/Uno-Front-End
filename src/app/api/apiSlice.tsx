import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Session {
  sessionId: string;
}

interface GetStart {
  playerId: string;
  sessionId: string;
}

interface ArrayPlayers {
  playerId: string;
  cards: string[];
}

interface StartGame {
  cpuTopId: string;
  cpuLeftId: string;
  cpuRightId: string;
  lastCard: string;
  lastColor: string;
  nextCards: ArrayPlayers[];
  nextPlayer: string;
  playerId: string;
}

interface Play {
  deckEmpty: boolean;
  lastCard: string;
  lastColor: string;
  nextCards: ArrayPlayers[];
  nextPlayer: string;
  winner: string;
}

interface PlaySettings {
  card: string;
  id: string;
  sessionId: string;
}

interface BuyCard {
  id: string;
  sessionId: string;
}

interface Skipping {
  nextPlayer: string;
}

export const cardsApi = createApi({
  reducerPath: "cards",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    newGame: builder.mutation<Session, string>({
      query: (playerId) => ({
        url: "/new",
        method: "POST",
        body: { playerId },
      }),
    }),
    startGame: builder.mutation<StartGame, GetStart>({
      query: ({ playerId, sessionId }) => ({
        url: "/start",
        method: "POST",
        body: { playerId, sessionId },
      }),
    }),
    play: builder.mutation<Play, PlaySettings>({
      query: ({ card, id, sessionId }) => ({
        url: "/session/play",
        method: "POST",
        body: { card, id, sessionId },
      }),
    }),
    buyCard: builder.mutation<Play, BuyCard>({
      query: ({ id, sessionId }) => ({
        url: "/session/buy",
        method: "POST",
        body: { id, sessionId },
      }),
    }),

    skipTurn: builder.mutation<Skipping, BuyCard>({
      query: ({ id, sessionId }) => ({
        url: "/session/skip",
        method: "POST",
        body: { id, sessionId },
      }),
    }),
  }),
});

export const {
  useBuyCardMutation,
  useNewGameMutation,
  usePlayMutation,
  useSkipTurnMutation,
  useStartGameMutation,
} = cardsApi;
