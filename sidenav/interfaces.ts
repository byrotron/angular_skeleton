export interface ISktnSidenav {

  items: ISktnSidenavItem[];

}

export interface ISktnSidenavItem {

  label?: string;
  group?: string;

  disabled?: boolean;
  action?: string;
  active?: boolean;
  link?: string[];
  icon?: string;
  classes?: string[]

}