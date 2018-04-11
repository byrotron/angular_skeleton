export interface ISktnSidenav {

  items: ISktnSidenavItem[];

}

export interface ISktnSidenavItem {

  label?: string;
  group?: string;

  disabled?: boolean;
  
  controller?: string;
  action?: string;

  show?: boolean;
  active?: boolean;
  link?: string[];
  icon?: string;
  classes?: string[]

}