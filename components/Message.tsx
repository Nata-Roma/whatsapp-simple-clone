import moment from 'moment';
import { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase/firebase';

interface MessageProps {
  user: string;
  message: any;
}

const Message: FC<MessageProps> = ({ user, message }) => {
  const [ userLoggedIn ] = useAuthState(auth);

  const TypeofMessage = userLoggedIn.email === user ? Sender : Receiver;

  return (
    <Container>
      <TypeofMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
        </Timestamp>
      </TypeofMessage>
    </Container>
  );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
margin-left: auto;
background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
text-align: left;
background-color: whitesmoke;
`;

const Timestamp = styled.span`
  color: grey;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
