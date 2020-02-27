import React from 'react';
import './header.styles.scss';

import { withRouter } from 'react-router-dom';

const Header = ({ history }) => {
    return (
        <div className="header">
            <div className="container">
                <div className="inicio">
                    <p onClick={() => history.push('/')} className="enlace-header">Inicio</p>
                </div>

                <div className="resto-opciones">
                    <p onClick={() => history.push('/cuentas')} className="enlace-header">Cuentas</p>
                    <p onClick={() => history.push('/movimientos')} className="enlace-header">Movimientos</p>
                    <p onClick={() => history.push('/perfil')} className="enlace-header">Mi perfil</p>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Header);