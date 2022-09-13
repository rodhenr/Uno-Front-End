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

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submitEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    try {
      const data = await newGame(name).unwrap();

      if (data.sessionId) {
        dispatch(newSession({ playerId: name, sessionId: data.sessionId }));
        navigate("/game");
      }
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o err
      console.log(err);
    }
  };

  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const data = await newGame(name).unwrap();

      if (data.sessionId) {
        dispatch(newSession({ playerId: name, sessionId: data.sessionId }));
        navigate("/game");
      }
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o err
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <div className={styles.inputs}>
          <div className={styles.single_input}>
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => handleInputName(e)}
              onKeyDown={(e) => submitEnter(e)}
            />
          </div>
        </div>
        <button onClick={(e) => submit(e)} disabled={!name}>
          JOGAR
        </button>
      </div>
    </div>
  );
}

export default Home;
