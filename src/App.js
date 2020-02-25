import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Welcome from './pages/welcome/welcome';
import Register from './components/register/register';

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

    const mostarUnaVezLogeado = () => {
      if (this.state.currentUser) {
        return (
          <div className="">
            <h1>Hola humanoides, estoy logea3</h1>
          </div>
        )
      }
    }

    return (
      <Router>
        <div className="app">
          <Route path="/login" exact component={Welcome} />
          <Route path="/register" component={Register} />
          {mostarUnaVezLogeado()}
        </div>
      </Router>
    )
  }
}

export default App;