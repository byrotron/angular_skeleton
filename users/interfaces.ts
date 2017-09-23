import { ISktnRole } from './../roles/interfaces';
export interface ISktnUser {

  id?: number;
  
  name: string;
  surname: string;
  email: string;
  status: boolean;
  role: ISktnRole;
  lastLogin: Date;

}