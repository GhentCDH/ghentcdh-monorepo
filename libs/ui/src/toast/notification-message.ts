export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type NotificationMessage = {
  id: number;
  message: string;
  type: NotificationType;
  duration: number;
};
