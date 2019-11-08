import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as store from '../datastore';
import React, { useContext } from 'react';
import SocketContext from '../components/SocketContext/Context';

interface IParams {
  roomName: string;
  playerName: string;
}

export const PlayerRoom: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({ match, history }) => {
  const roomName = match.params.roomName;
  const playerNameParam = match.params.playerName;
  const player = store.getItem()(`${roomName}:${playerNameParam}`);

  const { joinRoom, sendJson } = useContext(SocketContext);

  if (player) {
    // Should we join with a unique player ID?
    // Using player defined IDs seems open to abuse
    joinRoom({ playerId: player.id, playerName: player.playerName, roomName });
  }

  // useEffect(() => {

  // })

  const handleClick = () => {
    sendJson({
      message: 'player click',
      playerId: player.id,
      playerName: player.playerName,
      roomName
    });
  };

  return (
    <>
      <h1>Player room</h1>
      <p>
        {player.playerName} in {roomName}
      </p>
      <button onClick={handleClick}>Blurgh</button>
    </>
  );
};

export default withRouter(PlayerRoom);
