import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.styles.scss';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import Login from './components/login/login';
import Register from './components/register/register';
import Header from './components/header/header';

import Home from './pages/home/home';
import Movimientos from './pages/movimientos/movimientos';
import Perfil from './pages/perfil/perfil';
import Cuentas from './pages/cuentas/cuentas';

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

    const { currentUser, isLoading } = this.state;

    return (
      <div className="app">
        <Router>
          {isLoading ? null : <Header />}
          <Route path="/" exact render={(props) => <Home currentUser={currentUser} isLoading={isLoading} />} />
          <Route path="/login" render={(props) => <Login currentUser={currentUser} />} />
          <Route path="/register" component={Register} />
          <Route path="/movimientos" component={Movimientos} />
          <Route path="/cuentas" component={Cuentas} />
          <Route path="/perfil" component={Perfil} />
        </Router>
      </div>
    )
  }
}

export default App;