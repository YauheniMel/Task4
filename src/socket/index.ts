import { connect, Socket } from 'socket.io-client';

export const socket = {
  // @ts-ignore
  _instance: null as Socket,
  get instance() {
    if (!this._instance) {
      const token = sessionStorage.getItem('token');

      this._instance = connect(process.env.REACT_APP_BASE_URL, {
        auth: { token }
      });
    }
    return this._instance;
  },
  set instance(instance: Socket) {
    this._instance = instance;
  }
};
