import React from 'react';
import arrow from '../../assets/img/arrow.svg';
import {useNavigate} from "react-router-dom";

const Info = ({title, image, description, setCartOpened, setIsOrderComplete}) => {
	const navigate = useNavigate();
	
	
	const onClickOrder = () => {
		setCartOpened(false)
		navigate("/orders");
		setTimeout(() => {
			setIsOrderComplete(false)
		}, 1000)
	
	}
	
	return (
		<div className="cartEmpty d-flex align-center justify-center flex-column flex">
			<img className="mb-20" width="120px" src={image} alt="Empty"/>
			<h2>{title}</h2>
			<p className="opacity-6">{description}</p>
			<button onClick={onClickOrder} className="greenButton">
				Посмотреть свои заказы
			</button>
		</div>
	);
};

export default Info;