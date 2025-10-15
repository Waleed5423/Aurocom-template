import { useEffect, useCallback, useState } from 'react';
import { socketService } from '@/src/app/api/webhooks/lib/socket';
import { useAuth } from './useAuth';

export const useSocket = () => {
  const { isAuthenticated, user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      socketService.disconnect();
      setIsConnected(false);
      return;
    }

    const socket = socketService.connect();

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    socket.emit('joinUser', user.id);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, [isAuthenticated, user]);

  const emitEvent = useCallback((event: string, data: any) => {
    const socket = socketService.getSocket();
    if (socket && isConnected) {
      socket.emit(event, data);
    }
  }, [isConnected]);

  const onEvent = useCallback((event: string, callback: (data: any) => void) => {
    const socket = socketService.getSocket();
    if (socket) {
      socket.on(event, callback);
    }

    return () => {
      if (socket) {
        socket.off(event, callback);
      }
    };
  }, []);

  const disconnect = useCallback(() => {
    socketService.disconnect();
    setIsConnected(false);
  }, []);

  return {
    isConnected,
    emitEvent,
    onEvent,
    disconnect,
    socket: socketService.getSocket(),
  };
};

