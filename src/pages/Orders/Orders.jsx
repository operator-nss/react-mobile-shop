import React, {useEffect, useRef} from 'react';
import axios from 'axios';
import Card from "../../components/Card/Card";
import './orders.scss';
import ordersImage from '../../assets/img/orders.png'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Orders = ({orderId, setOrderId, orders, setOrders}) => {
	
	const [isLoading, setIsLoading] = React.useState(true);
	const loadingOrders = useRef(false);
	
	useEffect(() => {
		if(!loadingOrders.current) {
			(async () => {
				try {
					const {data} = await axios.get('https://62c0780cd40d6ec55cd18676.mockapi.io/orders');
					setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
					setIsLoading(false);
				} catch (error) {
					alert('Ошибка при запросе заказов');
					console.error(error);
				}
			})();
		}
		loadingOrders.current = true
	
	}, []);
	
	const clearOrders = async () => {
		console.log(orderId)
		try {
			setIsLoading(true);
			for (let i = 1; i <= orderId; i++) {
				await axios.delete('https://62c0780cd40d6ec55cd18676.mockapi.io/orders/' + i);
				await delay(1000);
			}
			setOrders([]);
			setOrderId(null)
		} catch (error) {
			alert('Ошибка при очистки заказов');
		}
		setIsLoading(false);
	};
	
	return (
		<div className="orders">
			<div className="orders__label">
				<h1 className="orders__title">Мои заказы</h1>
				{orders.length > 0 && <button className='orders__button blueButton' onClick={clearOrders}>Очистить заказы</button>}
			</div>
			
			<div className="orders__items">
				
				{orders.length > 0 ? (
					(isLoading ? [...Array(8)] : orders).map((item, index) => (
						<Card key={index} loading={isLoading} {...item} />
					))
				) : (
					<img className="orders__image" src={ordersImage} alt="out of orders"/>
				)}
				

			</div>
		</div>
	);
};

export default Orders;