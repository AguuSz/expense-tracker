import React from 'react';
import './register.styles.scss';
import { withRouter } from 'react-router-dom';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class Register extends React.Component {

    constructor() {
        super();
        this.state = ({
            nombre: '',
            correo: '',
            contraseña: '',
            contraseña2: ''
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { nombre, correo, contraseña, contraseña2 } = this.state;

        if (contraseña !== contraseña2) {
            alert("Las contraseñas no coinciden")
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(correo, contraseña)

            await createUserProfileDocument(user, { nombre });

            this.setState({
                nombre: '',
                correo: '',
                contraseña: '',
                contraseña2: ''
            });

            alert('Te haz registrado correctamente')
        } catch (error) {
            alert(error)
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        const { nombre, correo, contraseña, contraseña2 } = this.state;

        return (
            <div className="register">
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
                    <h1>Crear cuenta</h1>

                    <div className="campos">
                        <div className="campo">
                            <label htmlFor="nombre">Nombre: </label>
                            <input type="text" name="nombre" onChange={this.onChange} value={nombre} />
                        </div>

                        <div className="campo">
                            <label htmlFor="correo">Correo: </label>
                            <input type="email" name="correo" onChange={this.onChange} value={correo} />
                        </div>

                        <div className="campo">
                            <label htmlFor="contraseña">Contraseña: </label>
                            <input type="password" name="contraseña" onChange={this.onChange} value={contraseña} />
                        </div>

                        <div className="campo">
                            <label htmlFor="contraseña">Confirme contraseña: </label>
                            <input type="password" name="contraseña2" onChange={this.onChange} value={contraseña2} />
                        </div>
                    </div>

                    <div className="botones">
                        <button className="boton" type="submit">Registarse</button>
                    </div>

                    <p>¿Ya tienes cuenta? <span onClick={() => this.props.history.push('/login')}>Inicia sesion</span></p>

                </form>
            </div>
        )
    }
}

export default withRouter(Register);