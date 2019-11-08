import React, { useState, useEffect } from 'react';
import SocketContext from './Context';
import Sockette from 'sockette';
import qs from 'qs';

interface IState {
  sendJson?: any;
  send?: any;
  close?: any;
  joinRoom?: object;
  lastMessage?: any;
}

interface IHostRoomParams {
  roomName: string;
  roomId: string;
}

interface IPlayerRoomParams {
  roomName: string;
  playerName: string;
  playerId: string;
}

const SocketProvider = (props: any) => {
  // const connectionParams
  // const connection
  // const hasConnection
  // const message

  const [connection, setConnection] = useState<Sockette>();
  // const [hasConnection, setHasConnection] = useState<any>();
  // const [onMessage, setOnMessage] = useState<any>();
  const [value, setValue] = useState<IState>();

  const [lastMessage, setLastMessage] = useState<any>();

  const joinRoom = (params: IHostRoomParams | IPlayerRoomParams) => {
    if (connection) {
      console.log('connection exists');
      return;
    }
    console.log('newConnection', params);

    try {
      let conn = new Sockette(
        `${window.env.WSS_HOST}?${qs.stringify(params)}`,
        {
          onmessage: e => {
            console.log('message', e.data);
            setLastMessage(e.data);
            // setOnMessage(e);
          }
        }
      );

      // keep alive, 60 seconds
      setInterval(conn.reconnect, 60e3);

      setConnection(conn);

      setValue({
        ...value,
        sendJson: conn.json,
        send: conn.send,
        lastMessage
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('SocketProvider useEffect');
    // if (connectionParams && !connection) joinRoom();

    // let onMessage: any | null;
    // setValue({ ...value, sendJson: ws.json, send: ws.send, close: ws.close });
    // setValue({ ...value, sendJson: () => {}, send: () => {}, close: () => {} });
  }, []);

  return (
    <SocketContext.Provider value={{ ...value, joinRoom }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
