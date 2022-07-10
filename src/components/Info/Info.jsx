import React from 'react';
import {useNavigate} from "react-router-dom";
import './info.scss'
import {setCartOpened} from "../../store/Slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";

const Info = ({title, image, description, setIsOrderComplete}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { statusCart } = useSelector(state => state.cart);
	
	const onClickOrder = () => {
		dispatch(setCartOpened())
	
		navigate("/orders");
		setTimeout(() => {
			setIsOrderComplete(false)
			document.documentElement.classList.remove('lock');
		}, 1000)
	
	}
	
	return (
		<div className="info ">
			{
				statusCart === 'cart loading' ? <Preloader /> : <><img className="info__image " src={image} alt="Empty"/>
					<h2 className=''>{title}</h2>
					<p className="info__text ">{description}</p>
					<button onClick={onClickOrder} className="blueButton ">
						Посмотреть свои заказы
					</button></>
			}
			
		</div>
	);
};

export default Info;