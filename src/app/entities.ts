/* Db Interfaces */

export interface Events {
  Id?: number;
  Name?: string;
  Description?: string;
  Running?: boolean;
  DateSet?: Date;
  Genres?: string;
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
  Avatar?: string;
}

export interface Genres {
  Id?: number;
  Genre?: string;
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
