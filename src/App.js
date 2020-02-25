import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { css } from "@emotion/core";

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { ClockLoader } from 'react-spinners'

import Welcome from './pages/welcome/welcome';
import Register from './components/register/register';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
      isLoading: true
    }
  }

  unsuscribeFromAuth = null;

  componentDidMount() {
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //Si el usuario esta con la sesion iniciada
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }, isLoading: false
          });
        })
      } else { //En caso de que no este iniciada la sesion
        this.setState({ currentUser: null, isLoading: false });
      }
    })
  }

  //Para evitar leaks en la memoria
  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  render() {

    if (!this.state.isLoading) {
      return (
        <Router>
          <div className="app">
            <Route path="/login" exact component={Welcome} />
            <Route path="/register" component={Register} />
          </div>
        </Router>
      )
    } else {
      return (
        <div className="" >
          <ClockLoader
            css={override}
            size={250}
            //size={"150px"} this also works
            color={"#FFD082"}
            loading={this.state.isLoading}
          />
        </div>
      )
    }
  }
}


export default App;