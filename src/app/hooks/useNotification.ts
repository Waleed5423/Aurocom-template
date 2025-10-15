import { useEffect, useCallback } from 'react';
import { useStore } from '@/src/app/api/webhooks/store';
import { socketService } from '@/src/app/api/webhooks/lib/socket';
import { useAuth } from './useAuth';

export const useNotification = () => {
  const { isAuthenticated, user } = useAuth();
  const { notifications, addNotification, removeNotification } = useStore();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const socket = socketService.connect();

    socket.on('newNotification', (data) => {
      addNotification({
        type: 'info',
        title: data.title || 'New Notification',
        message: data.message,
        duration: 5000,
      });
    });

    socket.on('orderStatusChanged', (data) => {
      addNotification({
        type: 'info',
        title: 'Order Updated',
        message: `Order ${data.orderNumber} status changed to ${data.status}`,
        duration: 5000,
      });
    });

    socket.on('paymentConfirmed', (data) => {
      addNotification({
        type: 'success',
        title: 'Payment Confirmed',
        message: `Payment for order ${data.orderNumber} has been confirmed`;
        duration: 5000,
      });
    });

    return () => {
      socket.off('newNotification');
      socket.off('orderStatusChanged');
      socket.off('paymentConfirmed');
    };
  }, [isAuthenticated, user, addNotification]);

  const notifySuccess = useCallback((title: string, message: string, duration?: number) => {
    addNotification({
      type: 'success',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  const notifyError = useCallback((title: string, message: string, duration?: number) => {
    addNotification({
      type: 'error',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  const notifyWarning = useCallback((title: string, message: string, duration?: number) => {
    addNotification({
      type: 'warning',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  const notifyInfo = useCallback((title: string, message: string, duration?: number) => {
    addNotification({
      type: 'info',
      title,
      message,
      duration,
    });
  }, [addNotification]);

  return {
    notifications,
    
    addNotification,
    removeNotification,
    
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    
    clearAll: () => {
      notifications.forEach(notification => {
        removeNotification(notification.id);
      });
    }
  };
};

