import { ISktnRole } from './../roles/interfaces';
export interface ISktnUser {

  id?: number;
  
  name: string;
  surname: string;
  email: string;
  status: {
    id: number;
    name: string
  };
  role: ISktnRole;
  last_login: any;

  loading?: boolean;
}