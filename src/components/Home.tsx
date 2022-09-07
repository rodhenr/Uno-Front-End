import React, { useState } from "react";
import { useNewGameMutation } from "../app/api/apiSlice";
import { newSession } from "../app/cardsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styles from "../styles/Home.module.scss";

interface ErrorType {
  data: {
    error: string | string[];
  };
  status: number;
}

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [newGame] = useNewGameMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const session = await newGame(name).unwrap();

      if (session.sessionId) {
        dispatch(newSession({ playerId: name, sessionId: session.sessionId }));
        navigate("/game");
      }
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o err
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="name">Nome</label>
      <input
        id="name"
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => handleInput(e)}
      />
      <button onClick={(e) => submit(e)} disabled={!name}>
        Jogar
      </button>
    </div>
  );
}

export default Home;
