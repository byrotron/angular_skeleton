import { ISktnRole } from './..';

export interface ISktnController {
  id: number;
  controller: string;
  label: string;
  description: string;
  actions: ISktnAction[];
}

export interface ISktnAction {
  id: number;
  action: string;
  label: string;
  description: string;
  privileges: ISktnPrivilege[];
}

export interface ISktnPrivilege {

  id: number;
  role_id: number;
  action_id: number;
  status: boolean;

}
