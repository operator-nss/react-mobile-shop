import React from 'react';
import './notfound.scss'
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className='notFound'>
            <h2>Ничего не найдено :(</h2>
            <h4>К сожалению такой страницы нет</h4>
            <Link to='/'>
                <button className='blueButton notFound__button'>вернуться на главную</button>
            </Link>
        </div>
    );
};

export default NotFound;