import { io, Socket } from 'socket.io-client';
import { authService } from './auth';

class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;

  connect(): Socket {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    const token = authService.getToken();
    
    this.socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Socket connected');
      
      const user = authService.getCurrentUser();
      if (user) {
        this.socket?.emit('joinUser', user.id);
      }
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.isConnected = false;
    });

    return this.socket;
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isSocketConnected(): boolean {
    return this.isConnected && this.socket !== null;
  }

  onOrderStatusUpdate(callback: (data: any) => void): void {
    this.socket?.on('orderStatusChanged', callback);
  }

  onNotification(callback: (data: any) => void): void {
    this.socket?.on('newNotification', callback);
  }

  onPaymentConfirmed(callback: (data: any) => void): void {
    this.socket?.on('paymentConfirmed', callback);
  }

  offOrderStatusUpdate(callback: (data: any) => void): void {
    this.socket?.off('orderStatusChanged', callback);
  }

  offNotification(callback: (data: any) => void): void {
    this.socket?.off('newNotification', callback);
  }

  offPaymentConfirmed(callback: (data: any) => void): void {
    this.socket?.off('paymentConfirmed', callback);
  }

  markNotificationRead(notificationId: string): void {
    this.socket?.emit('markNotificationRead', notificationId);
  }
}

export const socketService = new SocketService();

