import firebase from 'firebase';

export const getRecipientEmail = (users: Array<string>, currectUser: firebase.User) =>
  users?.filter((user) => user !== currectUser.email)[0];
