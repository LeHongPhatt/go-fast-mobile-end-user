import { useCallback } from 'react';
import { useSocket } from './useSocket';
import { IP_HOST } from '@env';

export const useCustomerSocket = () => {
  const { onConnect, onConnectError, socket } = useSocket({
    uri: `ws://${IP_HOST}/customer`,
    opts: {
      autoConnect: true,
      reconnection: true,
    },
  });

  const onFoundDriver = useCallback(
    (callback: (data: any) => void) => {
      socket.removeListener('customer:found-driver');
      socket.on('customer:found-driver', callback);
    },
    [socket],
  );

  const onFoundMotobikeDriver = useCallback(
    (callback: (data: any) => void) => {
      // socket.removeListener('customer:found-driver');
      socket.on('customer:found-driver-for-motorcycle-taxi', callback);
    },
    [socket],
  );

  const onCompleteMotoTaxi = useCallback(
    (callback: (data: any) => void) => {
      // socket.removeListener('customer:found-driver');
      socket.on('customer:completed-motorcycle-taxi', callback);
    },
    [socket],
  );

  const onOrderDelivered = useCallback(
    (callback: (data: any) => void) => {
      socket.removeListener('customer:order-delivered');
      socket.on('customer:order-delivered', callback);
    },
    [socket],
  );

  const onNotFoundDriver = useCallback(
    (callback: (data: any) => void) => {
      socket.removeListener('customer:not-found-driver');
      socket.on('customer:not-found-driver', callback);
    },
    [socket],
  );

  const onNotFoundMotoDriver = useCallback(
    (callback: (data: any) => void) => {
      socket.on('customer:not-found-driver-for-motorcycle-taxi', callback);
    },
    [socket],
  );

  const onCancelMotoDriver = useCallback(
    (callback: (data: any) => void) => {
      socket.on('customer:cancelled-motorcycle-taxi', callback);
    },
    [socket],
  );

  const onOrderDelivering = useCallback(
    (callback: (data: any) => void) => {
      socket.removeListener('customer:order-delivering');
      socket.on('customer:order-delivering', callback);
    },
    [socket],
  );

  const connect = useCallback(() => {
    socket.connect();
    socket.on('connect');
  }, [socket]);

  return {
    onOrderDelivered,
    onFoundDriver,
    onOrderDelivering,
    onConnect,
    onConnectError,
    onNotFoundDriver,
    isConnected: socket.connected,
    onFoundMotobikeDriver,
    socket,
    connect,
    onCompleteMotoTaxi,
    onNotFoundMotoDriver,
    onCancelMotoDriver,
  };
};
