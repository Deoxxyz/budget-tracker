import React, { useEffect, useRef, useState, useContext } from 'react';
import { Grid, Button } from '@material-ui/core';
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import { Details, Main } from './components';
import useStyles from './styles';
import fire from './fire';
import Login from './Login';
import DataTable from "./components/DataTable/DataTable"
import './App.css';
import { ExpenseTrackerContext } from './context/context';

const App = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const { getTransactions } = useContext(ExpenseTrackerContext);
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        // eslint-disable-next-line
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        // eslint-disable-next-line
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
    localStorage.clear();
   
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
        localStorage.setItem("uid", user.uid);
        getTransactions()
      } else {
        setUser("");
      }
    })
  }

  useEffect(() => {
    authListener();

  }, [user]);

  return (
    <div className="App">
      {user ? (
        <SpeechlyCom handleLogout={handleLogout} />
      ) : (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
};


const SpeechlyCom = ({ handleLogout }) => {
  const classes = useStyles();
  const { speechState } = useSpeechContext();
  const main = useRef(null);
  const [page, setPage] = useState("main");

  const executeScroll = () => main.current.scrollIntoView()

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }

    if (window.navigator.userAgentData.mobile) {
      window.navigator.vibrate(100);
    }
  }, [speechState]);

  return (
    <section className="hero">
      <nav>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h2>Expense Tracker</h2>
          </Grid>
          <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
            <h1 style={{ marginRight: "20px" }} onClick={() => setPage("table")}>Data Table</h1>
            <h1 onClick={handleLogout}>Log out</h1>
          </Grid>
        </Grid>
      </nav>
      {page === "main" ? (
        <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
          <Grid item xs={12} sm={4} className={classes.mobile}>
            <Details title="Income" />
          </Grid>
          <Grid ref={main} item xs={12} sm={3} className={classes.main}>
            <Main />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.desktop}>
            <Details title="Income" />
          </Grid>
          <Grid item xs={12} sm={4} className={classes.last}>
            <Details title="Expense" />
          </Grid>
          <PushToTalkButtonContainer>
            <PushToTalkButton />
            <ErrorPanel />
          </PushToTalkButtonContainer>
        </Grid>
      ) : (
        <Grid container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100vh' }} >
          <Grid item xs={10}>
            <Grid item xs={1}>
              <Button onClick={() => setPage("main")} className="backbutton" fullWidth={false}>{"< Back"}</Button>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={10}>
            <DataTable />
          </Grid>
        </Grid>
      )}

    </section >
  )
}

export default App;
