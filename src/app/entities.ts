export interface Response {
  rMessage?: string;
  rCode?: number;
}

export interface Events {
  Id?: number;
  Name?: string;
  Description?: string;
  Running?: boolean;
  DateSet?: Date;
  
  GroupName?: string;
}