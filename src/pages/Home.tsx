import React from "react";
import randomWords from "random-words";
import uuidv1 from "uuid/v1";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as store from "../store";

export const Home: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  const handleClick = () => {
    const newRoom = {
      name: randomWords({ exactly: 2, join: "-" }),
      id: uuidv1()
    };

    store.setItem()("room", newRoom);

    history.push(`/host-room/${newRoom.id}`);
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleClick}>Host</button>
    </>
  );
};

export default withRouter(Home);
