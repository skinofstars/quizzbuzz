import React, { useContext, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import * as store from '../datastore';

import SocketContext from '../components/SocketContext/Context';

interface IParams {
  id: string;
}

export const HostRoom: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({ match, history }) => {
  const [room, setRoom] = useState({ name: '', id: '' });
  const [rounds, setRounds] = useState<Array<string>>([]);
  // const [players, setPlayers] = useState({});

  const { sendJson, joinRoom } = useContext(SocketContext);

  useEffect(() => {
    // Room
    const roomData = store.getItem()('room');
    if (roomData) setRoom(roomData);

    joinRoom({ roomName: roomData.name, roomId: roomData.id });

    // Rounds
    const roundsData = store.getItem('rounds')(match.params.id);
    if (roundsData) setRounds(roundsData);

    // Players
  }, [match.params.id]);

  const handleClick = () => {
    const newRound = uuidv1();

    store.setItem('rounds')(match.params.id, [...rounds, newRound]);

    sendJson({
      action: { type: 'START_ROUND', data: { roomName: room.name } }
    });

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
