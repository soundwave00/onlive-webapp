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
