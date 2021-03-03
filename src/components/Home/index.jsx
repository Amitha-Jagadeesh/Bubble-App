import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './index.module.css';

const {
    homeContainer
} = Styles

const Home = () => {
    return(
        <div className={homeContainer}>
            <h1>Welcome to Bubble App</h1>
            <h2><Link to = {{
                pathname: '/login'
            }}>Login</Link> to continue</h2>
        </div>
    )
}

export default Home;