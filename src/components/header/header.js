import React from 'react';
import './header.styles.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <div className="inicio">
                    <p className="enlace-header">Inicio</p>
                </div>

                <div className="resto-opciones">
                    <p className="enlace-header">Cuentas</p>
                    <p className="enlace-header">Movimientos</p>
                    <p className="enlace-header">Mi perfil</p>
                </div>
            </div>
        </div>
    )
}

export default Header;