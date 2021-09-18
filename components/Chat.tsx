import { Avatar } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUser } from '../utils/interfaces';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { getRecipientEmail } from '../utils/usersData';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import firebase from 'firebase';

interface ChatProps {
  id: string;
  users: Array<string>;
}

const Chat: FC<ChatProps> = ({ id, users }) => {
  const [ user ] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(db.collection('users')
  .where('email', '==', getRecipientEmail(users, user)))
  const [ recipient, setRecipient ] = useState<any>();
  const router = useRouter();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  }

  useEffect(() => {
    if(recipientSnapshot) {
      const recipientData = recipientSnapshot.docs[0]?.data()
      if(recipientData) {
        setRecipient(recipientData);
      }
    }
  }, [recipientSnapshot, users]);

  return (
    <Container onClick={enterChat}>
      {recipient && recipient.lastSeen && (
        <>
        {recipient.photoURL ? (<UserAvatar src={recipient.photoURL} />) : (<UserAvatar>{recipient.email[0]}</UserAvatar>)}
        <p>{recipient.email}</p>
        </>
      )}
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
