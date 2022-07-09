import React from 'react';
import arrow from '../../assets/img/arrow.svg';
import {useNavigate} from "react-router-dom";
import './info.scss'

const Info = ({title, image, description, setCartOpened, setIsOrderComplete}) => {
	const navigate = useNavigate();
	
	
	const onClickOrder = () => {
		setCartOpened(false)
	
		navigate("/orders");
		setTimeout(() => {
			setIsOrderComplete(false)
			document.documentElement.classList.remove('lock');
		}, 1000)
	
	}
	
	return (
		<div className="info ">
			<img className="info__image " src={image} alt="Empty"/>
			<h2 className=''>{title}</h2>
			<p className="info__text ">{description}</p>
			<button onClick={onClickOrder} className="blueButton ">
				Посмотреть свои заказы
			</button>
		</div>
	);
};

export default Info;