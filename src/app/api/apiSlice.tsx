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
        url: `/start`,
        method: "POST",
        body: { playerId, sessionId },
      }),
    }),
  }),
});

export const { useNewGameMutation, useStartGameMutation } = cardsApi;
