import React from 'react';
import './carta.styles.scss';

const Carta = ({ titulo, children, tipo }) => {
    return (
        <div className="carta">
            <h2>{titulo}</h2>

            {children}

        </div>
    )
}

export default Carta;