/* Db Interfaces */

export interface Events {
  Id?: number;
  Name?: string;
  Description?: string;
  Running?: boolean;
  DateSet?: Date;
}

export interface Group {
  Id?: number;
  Name?: string;
  Description?: string;
  Avatar?: string;
}

export interface User {
  Username?: string;
  Password?: string;
  Name?: string;
  Surname?: string;
  Email?: string;
  CodiceToken?: string;
  CodiceTokenExpiration?: Date;
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
