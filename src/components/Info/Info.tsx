import React from 'react';
import {useNavigate} from "react-router-dom";
import './info.scss'
import {setCartOpened} from "../../store/Slices/cartSlice";
import {useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";
import {RootState, useAppDispatch} from "../../store/store";

type InfoProps = {
	title: string, image: string, description: string, setIsOrderComplete: any
}

const Info:React.FC<InfoProps> = ({title, image, description, setIsOrderComplete}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { statusCart } = useSelector((state:RootState) => state.cart);
	
	const onClickOrder = () => {
		dispatch(setCartOpened(false))
	
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