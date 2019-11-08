import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import uuidv1 from "uuid/v1";
import * as store from "../datastore";

interface IParams {
  id: string;
}

export const HostRound: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({ history, match }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionsRaw = store.getItem("questions")(match.params.id);
    if (questionsRaw) setQuestions(questionsRaw);
  }, [match.params.id]);

  const handleClickNewQuestion = () => {
    const newQuestion = {
      id: uuidv1(),
      round: match.params.id
    };

    store.setItem("questions")(match.params.id, [...questions, newQuestion.id]);
    store.setItem("question")(newQuestion.id, newQuestion);

    history.push(`/host-question/${newQuestion.id}`);
  };

  const handleClickEndRound = () => {
    const room = store.getItem()("room");

    if (room) {
      history.push(`/host-room/${room.id}`);
    }
  };

  return (
    <>
      <h1>Round</h1>
      <button onClick={handleClickNewQuestion}>New question</button>
      <button onClick={handleClickEndRound}>End round</button>
    </>
  );
};

export default withRouter(HostRound);
