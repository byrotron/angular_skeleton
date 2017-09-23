export interface ISktnDataTableEvent {
  page: number;
  limit: number;
  orderby: string;
  direction: string;
  filter?: string;
}