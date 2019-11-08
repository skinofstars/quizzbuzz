import { createContext } from 'react';

interface IState {
  sendJson?: any;
  send?: any;
  close?: any;
  joinRoom?: any;
}

const SocketContext = createContext<IState>({
  sendJson: null,
  send: null,
  close: null
});

export default SocketContext;
