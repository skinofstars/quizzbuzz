import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as store from '../datastore';
import uuidv1 from 'uuid/v1';
import paramCase from 'param-case';

interface IParams {
  id: string;
}

const PlayerJoinForm: React.FunctionComponent<any> = ({ addPlayer }) => {
  const [playerNameValue, setPlayerNameValue] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!playerNameValue) return;
    addPlayer(playerNameValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name{' '}
        <input
          type="text"
          name="playerName"
          value={playerNameValue}
          onChange={e => setPlayerNameValue(e.target.value)}
        />
      </label>

      <button>Join</button>
    </form>
  );
};

export const PlayerJoin: React.FunctionComponent<
  RouteComponentProps<IParams>
> = ({ match, history }) => {
  const addPlayer = (playerName: string) => {
    const roomName = match.params.id;
    // TODO review input safety
    // playerName is user input, the only tidy up we're doing is converting case
    const playerNameParam = paramCase(playerName);

    // save player
    store.setItem()(`${roomName}:${playerNameParam}`, {
      playerName,
      id: uuidv1()
    });

    // make connection?

    // redirect to room
    history.push(`/player-room/${roomName}/${playerNameParam}`);
  };

  return (
    <>
      <h1>Join room</h1>
      <h2>{match.params.id}</h2>

      <PlayerJoinForm addPlayer={addPlayer} />
    </>
  );
};

export default withRouter(PlayerJoin);
