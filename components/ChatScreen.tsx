import { Avatar, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import { IChat } from '../utils/interfaces';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';
import firebase from 'firebase';
import { getRecipientEmail } from '../utils/usersData';
import TimeAgo from 'timeago-react';

interface ChatScreenProps {
  messages: any;
  chat: IChat;
}

export const ChatScreen: FC<ChatScreenProps> = ({ messages, chat }) => {
  const [ user ] = useAuthState(auth);
  const [input, setInput] = useState('');
  const endOfMessage = useRef(null);
  const [recipientSnapshot] = useCollection(db.collection('users')
  .where('email', '==', getRecipientEmail(chat.users, user)));

  const [ recipient, setRecipient ] = useState<any>();
  const router = useRouter();

  const [ messagesSnapshot ] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id as string)
      .collection('messages')
      .orderBy('timestamp', 'asc'),
  );

  

// const recipientEmail = getRecipientEmail(chat.users, user)

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message
          key={message.id}
          user={message.user}
          message={message}
        />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessage.current.scrollIntoView({
      behavoir: 'smooth',
      block: 'start'
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('users').doc(user.uid).set({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    },
    {merge: true});

    db.collection('chats').doc(router.query.id as string).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    })
    setInput('');
    scrollToBottom();
  };

  

  useEffect(() => {
    if(recipientSnapshot) {
      const recipientData = recipientSnapshot.docs[0]?.data()
      if(recipientData) {
        setRecipient(recipientData);
      }
    }
  }, [recipientSnapshot, chat.users]);

  return (
    <Container>
      <Header>
        {recipient && recipient.email && (
          <>
          {recipient.photoURL ? 
            (<Avatar src={recipient.photoURL} />) : 
            (<Avatar>{recipient.email[0]}</Avatar>)
          }
          <HeaderInfo>
            <h3>{recipient.email}</h3>
            <p>Last active{' '} 
              {recipient.lastSeen.toDate() ? 
                <TimeAgo datetime={recipient.lastSeen.toDate()} /> : 
                'Unavailable'
              }
            </p>
          </HeaderInfo>
          </>
        )}
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessage} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <MicIcon />
        <button hidden type='submit' disabled={!input} onClick={(e) => sendMessage(e)}>Send Message</button>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  height: 80px;
  padding: 11px;
  border: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  flex: 1;
  margin-left: 15px;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: grey;
  }
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 84vh;
`;

const EndOfMessage = styled.div`
  margin-bottom: 15px;
`;

const HeaderIcons = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #fff;
  z-index: 100;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`
