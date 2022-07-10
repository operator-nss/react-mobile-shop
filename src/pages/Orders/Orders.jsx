import React, {useEffect, useRef} from 'react';
import axios from 'axios';
import Card from "../../components/Card/Card";
import './orders.scss';
import ordersImage from '../../assets/img/orders.png'
import {useDispatch, useSelector} from "react-redux";
import {setOrderId, setOrders, setStatusOrder} from "../../store/Slices/ordersSlice";
import Preloader from "../../components/Preloader/Preloader";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Orders = () => {
	
	const loadingOrders = useRef(false);
	const {orders, orderId, statusOrder} = useSelector(state => state.order);
	const dispatch = useDispatch();
	
	
	useEffect(() => {
		if(!loadingOrders.current) {
			dispatch(setStatusOrder('order pending'));
			(async () => {
				try {
					const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/orders');
					dispatch(setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], [])));
					dispatch(setStatusOrder('success'));
				} catch (error) {
					alert('Ошибка при запросе заказов');
					console.error(error);
				}
			})();
		}
		loadingOrders.current = true
	
	}, []);
	
	const clearOrders = async () => {
		dispatch(setStatusOrder('order pending'));
		try {
			dispatch(setStatusOrder('order pending'));
			for (let i = 1; i <= orderId; i++) {
				await axios.delete('https://62c0780cd40d6ec55cd18676.mockapi.io/orders/' + i);
				await delay(1000);
			}
			dispatch(setOrders([]));
			dispatch(setOrderId(null))
			dispatch(setStatusOrder('success'));
		} catch (error) {
			alert('Ошибка при очистки заказов');
		}
		dispatch(setStatusOrder('order success'));
	};
	
	return (
		<div className="orders">
			<div className="orders__label">
				<h1 className="orders__title">Мои заказы</h1>
				{orders.length > 0 && <button disabled={statusOrder === 'order pending'} className='orders__button blueButton' onClick={clearOrders}>Очистить заказы</button>}
			</div>
			
			<div className="orders__items">
				
				{orders.length > 0 ? (
					statusOrder === 'order pending' ? <Preloader /> : orders.map((item, index) => (
						<Card key={index} {...item} />
					))
				) : (
					<div className='orders__out'>
					<img className="orders__image" src={ordersImage} alt="out of orders"/>
					<h2>К сожалению вы еще не делали заказ</h2>
					</div>
				)}
				
			</div>
		</div>
	);
};

export default Orders;