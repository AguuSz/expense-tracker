import React from 'react';
import './home.styles.scss';
import { css } from "@emotion/core";

import { Redirect } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import { auth } from '../../firebase/firebase.utils';

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const Home = ({ currentUser, isLoading }) => {

    if (!isLoading) {
        return (
            <div>
                {
                    currentUser ?
                        (
                            <div className="home">
                                <h1>Bienvenido a la app</h1>
                                <h2>Gracias por utilizarla</h2>
                                <button onClick={() => auth.signOut()}>Cerrar sesion</button>
                            </div>
                        )
                        :
                        (
                            <Redirect to="/login" />
                        )
                }
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <ClockLoader
                    css={override}
                    size={150}
                    color={"#FFD082"}
                />
            </React.Fragment>
        )
    }
}

export default Home;