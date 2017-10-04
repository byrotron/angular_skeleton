export interface ISktnEditableListGroup {
  
  id?: number;
  name: string;

}

export interface ISktnEditableList {

  id?: number;
  name: string;
  group: ISktnEditableListGroup;
  items?: ISktnEditableListItem[];
  status: 'waiting' | 'requesting' | 'complete';
  loading?: boolean;

}

export interface ISktnEditableListItem {

  id?: number;
  value: string;
  status?: boolean;
  
}