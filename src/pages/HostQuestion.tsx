import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";
import * as store from "../store";

interface IParams {
  id: string;
}

export const HostQuestion: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({ match }) => {
  const [question, setQuestion] = useState({ id: "", round: "" });

  useEffect(() => {
    const questionRaw = store.getItem("question")(match.params.id);
    if (questionRaw) setQuestion(questionRaw);
  }, [match.params.id]);

  return (
    <>
      <h1>Question</h1>

      <button>Start</button>
      <button>Accept</button>
      <button>Reject</button>

      <Link to={`/host-round/${question.round}`}>Return to round</Link>
    </>
  );
};

export default withRouter(HostQuestion);
