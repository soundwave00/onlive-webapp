export interface Response {
  rMessage?: string;
  rCode?: number;
}

export interface Live {
  Id?: number;
  Name?: string;
  Description?: string;
  Running?: boolean;
  DateSet?: Date;
}
