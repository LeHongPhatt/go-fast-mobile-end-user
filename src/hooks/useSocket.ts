import { useCallback, useEffect, useMemo } from 'react';
import { Socket, io } from 'socket.io-client';
import { IUseSocket } from 'types';
import { useAuth } from './useAuth';

export const useSocket = (props: IUseSocket) => {
  const { user } = useAuth();
  const socket: Socket = useMemo(() => {
    return io(props.uri, {
      extraHeaders: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      ...props.opts,
    });
  }, []);

  const onConnect = useCallback(
    (cb: () => void) => {
      socket.on('connect', cb);
    },
    [socket],
  );

  const onConnectError = useCallback(
    (cb: (arr) => void) => {
      socket.on('connect_error', cb);
    },
    [socket],
  );

  const onDisconnect = useCallback(
    (cb: (arr) => void) => {
      socket.on('disconnect', cb);
    },
    [socket],
  );

  const onReconnect = useCallback(
    (cb: (arr) => void) => {
      socket.on('reconnect', cb);
    },
    [socket],
  );

  useEffect(() => {
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  return {
    socket,
    onConnect,
    onConnectError,
    onDisconnect,
    onReconnect,
  };
};
