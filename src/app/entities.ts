/* Db Interfaces */

export interface Response {
  rMessage?: string;
  rCode?: number;
  body?: any;
}

export interface Events {
  Id?: number;
  Name?: string;
  Description?: string;
  Running?: boolean;
  DateSet?: Date;

  GroupName?: string;
}

export interface User {
  Username: string;
  Password?: string;
  Name?: string;
  Surname?: string;
  Email: string;
  CodiceToken?: string;
}

/* Component Interfaces */

export interface monthEvents {
  day?: number;
  month?: string;
  groupName?: string;
  button?: string;
  buttonIcon?: string;
  event?: any;
}
