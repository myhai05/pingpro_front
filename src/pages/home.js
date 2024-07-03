import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>PINGPRO</h1>
            <div>
                <Link to="/login">Se connecter</Link>
            </div>
            <div>
                <Link to="/register">S'inscrire</Link>
            </div>
            <div>
                <Link to="/request-pass">Mot de passe oublie</Link>
            </div>
        </div>
    );
};

export default Home;