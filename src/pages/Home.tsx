import React, { useContext } from 'react';
import randomWords from 'random-words';
import uuidv1 from 'uuid/v1';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import * as store from '../datastore';
import SocketContext from '../components/SocketContext/Context';

export const Home: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  const { joinRoom } = useContext(SocketContext);
  const existingRoom = store.getItem()('room');

  const handleHostClick = () => {
    if (existingRoom) return;

    const room = {
      name: randomWords({ exactly: 2, join: '-' }),
      id: uuidv1()
    };

    store.setItem()('room', room);

    joinRoom({ roomName: room.name, roomId: room.id });

    history.push(`/host-room/${room.id}`);
  };

  if (existingRoom) {
    joinRoom({
      roomId: existingRoom.id,
      roomName: existingRoom.name
    });
  }

  return (
    <>
      <h1>Home</h1>
      {existingRoom ? (
        <div>
          <Link to={`/host-room/${existingRoom.id}`}>{existingRoom.name}</Link>
        </div>
      ) : null}
      <button onClick={handleHostClick}>Host</button>
    </>
  );
};

export default withRouter(Home);
