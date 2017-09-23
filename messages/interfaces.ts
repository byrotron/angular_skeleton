export interface ISktnMessage {

  type: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
  
}