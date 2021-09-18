
export interface IUser {
  email: string;
  photoURL: string;
  lastSeen: string;
  uid: string;
}

export interface IChat {
  id: string;
  users: Array<string>;
}
