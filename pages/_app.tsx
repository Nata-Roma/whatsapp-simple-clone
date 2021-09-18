import '../styles/globals.css';
import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from '../utils/theme';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import Loading from '../components/loading/Loading';
import firebase from 'firebase/app';
import { auth, db } from '../firebase/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  const [ user, loading ] = useAuthState(auth);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(
    () => {
      if (user) {
        db.collection('users').doc(user.uid).set(
          {
            email: user.email,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user.photoURL,
          },
          { merge: true },
        );
      }
    },
    [ user ],
  );

  return (
    <StyledThemeProvider theme={theme}>
      <MaterialThemeProvider theme={theme}>
        <CssBaseline />
        {loading && <Loading />}
        {!loading && !user && <Login />}
        {user && <Component {...pageProps} />}
      </MaterialThemeProvider>
    </StyledThemeProvider>
  );
}
export default MyApp;
