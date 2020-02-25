import React from 'react';
import './login.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    constructor() {
        super();
        this.state = ({
            correo: '',
            contraseña: ''
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { correo, contraseña } = this.state;

        try {
            await auth.signInWithEmailAndPassword(correo, contraseña);
            this.setState({
                correo: '',
                contraseña: ''
            }, () => {
                alert('Gracias por logearte')
            })

        } catch (error) {
            alert(error)
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onClickGoogle = (e) => {
        e.preventDefault();
        signInWithGoogle();
    }

    render() {

        const { correo, contraseña } = this.state;

        return (
            <div className="login">
                <div className="cuadrados">
                    <div className="cuadrado cuadrado1"></div>
                    <div className="cuadrado cuadrado2"></div>
                    <div className="cuadrado cuadrado3"></div>
                    <div className="cuadrado cuadrado4"></div>
                    <div className="cuadrado cuadrado5"></div>
                    <div className="cuadrado cuadrado6"></div>
                    <div className="cuadrado cuadrado7"></div>
                    <div className="cuadrado cuadrado8"></div>
                    <div className="cuadrado cuadrado9"></div>
                    <div className="cuadrado cuadrado10"></div>
                    <div className="cuadrado cuadrado11"></div>
                </div>
                <form className="form" onSubmit={this.onSubmit}>
                    <h1>Iniciar sesion</h1>

                    <div className="campos">
                        <div className="campo">
                            <label htmlFor="correo">Correo: </label>
                            <input type="text" name="correo" onChange={this.onChange} value={correo} />
                        </div>

                        <div className="campo">
                            <label htmlFor="contraseña">Contraseña: </label>
                            <input type="password" name="contraseña" onChange={this.onChange} value={contraseña} />
                        </div>
                    </div>

                    <div className="botones">
                        <button className="boton" type="submit">Iniciar</button>
                        <button className="boton" onClick={this.onClickGoogle}>G</button>
                    </div>

                    <p>¿No tienes cuenta? <span onClick={() => this.props.history.push('/register')}>Registrarse</span></p>

                </form>
            </div>
        )
    }
}

export default withRouter(Login);