import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import uuidv1 from "uuid/v1";
import * as store from "../store";

interface IParams {
  id: string;
}

export const HostRoom: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({ match, history }) => {
  const [room, setRoom] = useState({ name: "", id: "" });
  const [rounds, setRounds] = useState<Array<string>>([]);
  // const [players, setPlayers] = useState({});

  useEffect(() => {
    // Room
    const roomData = store.getItem()("room");
    if (roomData) setRoom(roomData);

    // Rounds
    const roundsData = store.getItem("rounds")(match.params.id);
    if (roundsData) setRounds(roundsData);

    // Players
  }, [match.params.id]);

  const handleClick = () => {
    const newRound = uuidv1();

    store.setItem("rounds")(match.params.id, [...rounds, newRound]);

    history.push(`/host-round/${newRound}`);
  };

  return (
    <>
      <h1>Host room</h1>
      <p>{room.name}</p>
      <button onClick={handleClick}>Start round</button>
    </>
  );
};

export default withRouter(HostRoom);
