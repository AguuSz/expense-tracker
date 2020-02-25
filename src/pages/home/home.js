import React from 'react';
import './home.styles.scss';
import { css } from "@emotion/core";

import { Redirect } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';
import { auth } from '../../firebase/firebase.utils';
import Header from '../../components/header/header';

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
                                <Header />
                                <div className="container">
                                    <h1>Expense Tracker</h1>

                                    <div className="cartas">
                                        <div className="carta balance">
                                            <h2>Balance</h2>

                                            <div className="filas">
                                                <div className="fila">
                                                    <h3>Billetera</h3>
                                                    <h3>$ 99.999</h3>
                                                </div>
                                                <div className="fila">
                                                    <h3>Banco</h3>
                                                    <h3>$ 99.999</h3>
                                                </div>
                                                <div className="fila">
                                                    <h3>Tarjeta C.</h3>
                                                    <h3>$ 99.999</h3>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="carta rendimiento">
                                            <h2>Rendimiento</h2>
                                        </div>

                                        <div className="carta ultimos-movimientos">
                                            <h2>Ultimos movimientos</h2>

                                            <div className="filas">
                                                <div className="fila">
                                                    <h3>550,05</h3>
                                                    <h3>+</h3>
                                                </div>
                                                <div className="fila">
                                                    <h3>550,05</h3>
                                                    <h3>+</h3>
                                                </div>
                                                <div className="fila">
                                                    <h3>550,05</h3>
                                                    <h3>+</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="boton" onClick={() => auth.signOut()}>Cerrar sesion</button>
                                </div>
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
                    size={300}
                    color={"#FFD082"}
                />
            </React.Fragment>
        )
    }
}

export default Home;