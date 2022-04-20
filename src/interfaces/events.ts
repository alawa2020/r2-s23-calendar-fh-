export interface Event {
  _id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  user: User;
}

export interface User {
  uid: string;
  name: string;
}